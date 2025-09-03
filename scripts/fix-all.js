#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const readline = require('readline')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.log('❌ Error: SANITY_API_TOKEN not found in .env.local')
  console.log('Please add SANITY_API_TOKEN to your .env.local file')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function fixKeys(dryRun = false) {
  console.log('\n🔧 Fixing duplicate _key values...')
  
  const documents = await client.fetch(`*[_type in ["homePage", "aboutPage", "servicesPage", "contactPage", "blogPage"]]`)
  let fixCount = 0
  
  for (const doc of documents) {
    let hasChanges = false
    const updatedDoc = { ...doc }
    
    // Fix stats array
    if (updatedDoc.stats && Array.isArray(updatedDoc.stats)) {
      const keyMap = new Map()
      updatedDoc.stats = updatedDoc.stats.map((stat, index) => {
        const baseKey = `stat-${index}`
        let key = baseKey
        let counter = 1
        
        while (keyMap.has(key)) {
          key = `${baseKey}-${counter}`
          counter++
        }
        
        keyMap.set(key, true)
        
        if (stat._key !== key) {
          hasChanges = true
          return { ...stat, _key: key }
        }
        return stat
      })
    }
    
    // Fix services array
    if (updatedDoc.services && Array.isArray(updatedDoc.services)) {
      updatedDoc.services = updatedDoc.services.map((service, index) => {
        const key = `service-${index}`
        if (service._key !== key) {
          hasChanges = true
          return { ...service, _key: key }
        }
        return service
      })
    }
    
    if (hasChanges) {
      fixCount++
      if (dryRun) {
        console.log(`   Would fix: ${doc._type} (${doc._id})`)
      } else {
        await client.patch(doc._id).set(updatedDoc).commit()
        console.log(`   Fixed: ${doc._type} (${doc._id})`)
      }
    }
  }
  
  return fixCount
}

async function fixFAQs(dryRun = false) {
  console.log('\n🔧 Fixing FAQ structures...')
  
  const pages = await client.fetch(`*[_type in ["servicesPage", "aboutPage"]]`)
  let fixCount = 0
  
  for (const page of pages) {
    if (page.faqs && Array.isArray(page.faqs)) {
      const updatedFaqs = page.faqs.map((faq, index) => ({
        _type: 'faq',
        _key: `faq-${index}`,
        question: faq.question || '',
        answer: faq.answer || ''
      }))
      
      if (!dryRun) {
        await client
          .patch(page._id)
          .set({ faqs: updatedFaqs })
          .commit()
        console.log(`   Fixed FAQs in: ${page._type} (${page._id})`)
      } else {
        console.log(`   Would fix FAQs in: ${page._type} (${page._id})`)
      }
      fixCount++
    }
  }
  
  return fixCount
}

async function fixBlogKeys(dryRun = false) {
  console.log('\n🔧 Fixing blog post keys...')
  
  const posts = await client.fetch(`*[_type == "post"]`)
  let fixCount = 0
  
  for (const post of posts) {
    let hasChanges = false
    const updatedPost = { ...post }
    
    // Fix body content keys
    if (updatedPost.body && Array.isArray(updatedPost.body)) {
      updatedPost.body = updatedPost.body.map((block, index) => {
        const key = `block-${index}`
        if (block._key !== key) {
          hasChanges = true
          return { ...block, _key: key }
        }
        return block
      })
    }
    
    if (hasChanges) {
      fixCount++
      if (dryRun) {
        console.log(`   Would fix: ${post.title} (${post._id})`)
      } else {
        await client.patch(post._id).set(updatedPost).commit()
        console.log(`   Fixed: ${post.title} (${post._id})`)
      }
    }
  }
  
  return fixCount
}

async function validateContent() {
  console.log('\n🔍 Validating content structure...')
  
  const issues = []
  
  // Check for required pages
  const requiredPages = ['homePage', 'aboutPage', 'servicesPage', 'contactPage', 'blogPage']
  for (const pageType of requiredPages) {
    const page = await client.fetch(`*[_type == "${pageType}"][0]`)
    if (!page) {
      issues.push(`Missing ${pageType}`)
    }
  }
  
  // Check for duplicate keys
  const documents = await client.fetch(`*[_type in ["homePage", "aboutPage", "servicesPage", "contactPage", "blogPage"]]`)
  
  for (const doc of documents) {
    if (doc.stats && Array.isArray(doc.stats)) {
      const keys = doc.stats.map(s => s._key)
      const uniqueKeys = new Set(keys)
      if (keys.length !== uniqueKeys.size) {
        issues.push(`Duplicate keys in ${doc._type}.stats`)
      }
    }
    
    if (doc.services && Array.isArray(doc.services)) {
      const keys = doc.services.map(s => s._key)
      const uniqueKeys = new Set(keys)
      if (keys.length !== uniqueKeys.size) {
        issues.push(`Duplicate keys in ${doc._type}.services`)
      }
    }
  }
  
  return issues
}

async function main() {
  try {
    console.log('🛠️  Sanity Content Fix Tool')
    console.log('===========================\n')
    
    console.log('Select operation:')
    console.log('1. Fix all issues')
    console.log('2. Fix keys only')
    console.log('3. Fix FAQs only')
    console.log('4. Fix blog keys only')
    console.log('5. Validate content')
    console.log('6. Dry run (preview changes)')
    
    const choice = await question('\nEnter choice (1-6): ')
    
    const dryRun = choice === '6'
    
    if (dryRun) {
      console.log('\n🔍 DRY RUN MODE - No changes will be made\n')
    }
    
    let totalFixes = 0
    
    switch (choice) {
      case '1':
      case '6':
        totalFixes += await fixKeys(dryRun)
        totalFixes += await fixFAQs(dryRun)
        totalFixes += await fixBlogKeys(dryRun)
        break
      case '2':
        totalFixes = await fixKeys(false)
        break
      case '3':
        totalFixes = await fixFAQs(false)
        break
      case '4':
        totalFixes = await fixBlogKeys(false)
        break
      case '5':
        const issues = await validateContent()
        if (issues.length > 0) {
          console.log('\n⚠️  Issues found:')
          issues.forEach(issue => console.log(`   - ${issue}`))
        } else {
          console.log('\n✅ No issues found!')
        }
        rl.close()
        return
      default:
        console.log('Invalid choice')
        rl.close()
        process.exit(1)
    }
    
    // Validate after fixes
    const issues = await validateContent()
    
    if (dryRun) {
      console.log(`\n📊 Would fix ${totalFixes} document(s)`)
    } else {
      console.log(`\n✅ Fixed ${totalFixes} document(s)`)
    }
    
    if (issues.length > 0) {
      console.log('\n⚠️  Remaining issues:')
      issues.forEach(issue => console.log(`   - ${issue}`))
    } else {
      console.log('✨ All content validated successfully!')
    }
    
    rl.close()
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    rl.close()
    process.exit(1)
  }
}

main()