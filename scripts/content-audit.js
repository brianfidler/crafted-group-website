#!/usr/bin/env node

const { createClient } = require('@sanity/client')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

const auditResults = {
  seo: {
    issues: [],
    warnings: [],
    score: 100
  },
  accessibility: {
    issues: [],
    warnings: [],
    score: 100
  },
  content: {
    issues: [],
    warnings: [],
    score: 100
  },
  performance: {
    issues: [],
    warnings: [],
    score: 100
  }
}

function checkSEO(doc, type) {
  const results = []
  
  // Check meta title
  if (doc.seo?.metaTitle) {
    const titleLength = doc.seo.metaTitle.length
    if (titleLength > 60) {
      results.push({
        level: 'warning',
        message: `Meta title too long (${titleLength}/60 chars) in ${type}: ${doc._id}`
      })
    } else if (titleLength < 30) {
      results.push({
        level: 'warning',
        message: `Meta title too short (${titleLength} chars) in ${type}: ${doc._id}`
      })
    }
  } else {
    results.push({
      level: 'error',
      message: `Missing meta title in ${type}: ${doc._id}`
    })
  }
  
  // Check meta description
  if (doc.seo?.metaDescription) {
    const descLength = doc.seo.metaDescription.length
    if (descLength > 160) {
      results.push({
        level: 'warning',
        message: `Meta description too long (${descLength}/160 chars) in ${type}: ${doc._id}`
      })
    } else if (descLength < 120) {
      results.push({
        level: 'warning',
        message: `Meta description too short (${descLength} chars) in ${type}: ${doc._id}`
      })
    }
  } else {
    results.push({
      level: 'error',
      message: `Missing meta description in ${type}: ${doc._id}`
    })
  }
  
  // Check for slug/URL
  if (type === 'post' || type === 'category') {
    if (!doc.slug?.current) {
      results.push({
        level: 'error',
        message: `Missing slug in ${type}: ${doc._id}`
      })
    } else if (doc.slug.current.length > 50) {
      results.push({
        level: 'warning',
        message: `Slug too long (${doc.slug.current.length} chars) in ${type}: ${doc._id}`
      })
    }
  }
  
  return results
}

function checkAccessibility(doc, type) {
  const results = []
  
  // Check images for alt text
  const checkImage = (image, context) => {
    if (image && !image.alt) {
      results.push({
        level: 'error',
        message: `Missing alt text for image in ${type}.${context}: ${doc._id}`
      })
    }
  }
  
  // Check various image fields
  if (doc.image) checkImage(doc.image, 'image')
  if (doc.heroImage) checkImage(doc.heroImage, 'heroImage')
  if (doc.featuredImage) checkImage(doc.featuredImage, 'featuredImage')
  if (doc.ogImage) checkImage(doc.ogImage, 'ogImage')
  
  // Check for heading hierarchy in content blocks
  if (doc.body && Array.isArray(doc.body)) {
    let lastHeadingLevel = 0
    doc.body.forEach((block, index) => {
      if (block.style && block.style.startsWith('h')) {
        const level = parseInt(block.style[1])
        if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
          results.push({
            level: 'warning',
            message: `Heading hierarchy skip in ${type} at block ${index}: ${doc._id}`
          })
        }
        lastHeadingLevel = level
      }
    })
  }
  
  // Check for link text
  if (doc.callToAction) {
    if (!doc.callToAction.buttonText || doc.callToAction.buttonText.toLowerCase() === 'click here') {
      results.push({
        level: 'warning',
        message: `Poor CTA button text in ${type}: ${doc._id}`
      })
    }
  }
  
  return results
}

function checkContentQuality(doc, type) {
  const results = []
  
  // Check for Lorem Ipsum
  const checkLoremIpsum = (text, field) => {
    if (text && typeof text === 'string') {
      if (text.toLowerCase().includes('lorem ipsum') || text.toLowerCase().includes('dolor sit amet')) {
        results.push({
          level: 'error',
          message: `Lorem Ipsum content found in ${type}.${field}: ${doc._id}`
        })
      }
    }
  }
  
  // Check various text fields
  Object.keys(doc).forEach(key => {
    if (typeof doc[key] === 'string') {
      checkLoremIpsum(doc[key], key)
      
      // Check for empty required fields
      if (doc[key].trim() === '' && !key.startsWith('_')) {
        results.push({
          level: 'warning',
          message: `Empty field ${type}.${key}: ${doc._id}`
        })
      }
    }
  })
  
  // Check content length for blog posts
  if (type === 'post' && doc.body) {
    const wordCount = doc.body
      .filter(block => block._type === 'block')
      .reduce((count, block) => {
        const text = block.children?.map(c => c.text).join(' ') || ''
        return count + text.split(/\s+/).length
      }, 0)
    
    if (wordCount < 300) {
      results.push({
        level: 'warning',
        message: `Short blog post (${wordCount} words) in ${type}: ${doc._id}`
      })
    }
  }
  
  // Check for duplicate content
  if (doc.title) {
    // This would need to be checked against other documents
    // Simplified for this implementation
  }
  
  return results
}

function checkPerformance(doc, type) {
  const results = []
  
  // Check image optimization
  const checkImageSize = (image, field) => {
    if (image?.asset?._ref) {
      // Extract dimensions from asset reference if available
      const parts = image.asset._ref.split('-')
      if (parts.length >= 3) {
        const dimensions = parts[parts.length - 2]
        const [width, height] = dimensions.split('x').map(Number)
        
        if (width > 2000 || height > 2000) {
          results.push({
            level: 'warning',
            message: `Large image (${width}x${height}) in ${type}.${field}: ${doc._id}`
          })
        }
      }
    }
  }
  
  if (doc.image) checkImageSize(doc.image, 'image')
  if (doc.heroImage) checkImageSize(doc.heroImage, 'heroImage')
  
  // Check for heavy content blocks
  if (doc.body && Array.isArray(doc.body)) {
    if (doc.body.length > 100) {
      results.push({
        level: 'warning',
        message: `Many content blocks (${doc.body.length}) in ${type}: ${doc._id}`
      })
    }
  }
  
  return results
}

async function runContentAudit() {
  console.log('📊 Content Audit Tool')
  console.log('====================\n')
  
  if (!projectId) {
    console.log('❌ Error: Sanity project not configured')
    process.exit(1)
  }
  
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token,
  })
  
  try {
    // Fetch all content
    console.log('📥 Fetching content...\n')
    
    const pages = await client.fetch(`*[_type in [
      "homePage", "aboutPage", "servicesPage", 
      "contactPage", "blogPage", "pricingPage"
    ]]`)
    
    const posts = await client.fetch(`*[_type == "post"]`)
    const categories = await client.fetch(`*[_type == "category"]`)
    
    const allContent = [
      ...pages.map(p => ({ ...p, contentType: 'page' })),
      ...posts.map(p => ({ ...p, contentType: 'post' })),
      ...categories.map(c => ({ ...c, contentType: 'category' }))
    ]
    
    console.log(`Found ${allContent.length} content items to audit\n`)
    
    // Run audits
    allContent.forEach(doc => {
      const seoResults = checkSEO(doc, doc._type)
      const a11yResults = checkAccessibility(doc, doc._type)
      const contentResults = checkContentQuality(doc, doc._type)
      const perfResults = checkPerformance(doc, doc._type)
      
      // Collect results
      seoResults.forEach(r => {
        if (r.level === 'error') {
          auditResults.seo.issues.push(r.message)
          auditResults.seo.score -= 10
        } else {
          auditResults.seo.warnings.push(r.message)
          auditResults.seo.score -= 3
        }
      })
      
      a11yResults.forEach(r => {
        if (r.level === 'error') {
          auditResults.accessibility.issues.push(r.message)
          auditResults.accessibility.score -= 10
        } else {
          auditResults.accessibility.warnings.push(r.message)
          auditResults.accessibility.score -= 3
        }
      })
      
      contentResults.forEach(r => {
        if (r.level === 'error') {
          auditResults.content.issues.push(r.message)
          auditResults.content.score -= 10
        } else {
          auditResults.content.warnings.push(r.message)
          auditResults.content.score -= 3
        }
      })
      
      perfResults.forEach(r => {
        if (r.level === 'error') {
          auditResults.performance.issues.push(r.message)
          auditResults.performance.score -= 10
        } else {
          auditResults.performance.warnings.push(r.message)
          auditResults.performance.score -= 3
        }
      })
    })
    
    // Normalize scores
    Object.keys(auditResults).forEach(key => {
      auditResults[key].score = Math.max(0, auditResults[key].score)
    })
    
    // Print results
    console.log('=' .repeat(50))
    console.log('📊 Audit Results')
    console.log('=' .repeat(50) + '\n')
    
    // SEO
    console.log(`🔍 SEO Score: ${auditResults.seo.score}/100`)
    if (auditResults.seo.issues.length > 0) {
      console.log('   Issues:')
      auditResults.seo.issues.slice(0, 5).forEach(i => console.log(`   - ${i}`))
      if (auditResults.seo.issues.length > 5) {
        console.log(`   ... and ${auditResults.seo.issues.length - 5} more`)
      }
    }
    if (auditResults.seo.warnings.length > 0) {
      console.log('   Warnings:')
      auditResults.seo.warnings.slice(0, 3).forEach(w => console.log(`   - ${w}`))
      if (auditResults.seo.warnings.length > 3) {
        console.log(`   ... and ${auditResults.seo.warnings.length - 3} more`)
      }
    }
    console.log()
    
    // Accessibility
    console.log(`♿ Accessibility Score: ${auditResults.accessibility.score}/100`)
    if (auditResults.accessibility.issues.length > 0) {
      console.log('   Issues:')
      auditResults.accessibility.issues.slice(0, 5).forEach(i => console.log(`   - ${i}`))
      if (auditResults.accessibility.issues.length > 5) {
        console.log(`   ... and ${auditResults.accessibility.issues.length - 5} more`)
      }
    }
    console.log()
    
    // Content Quality
    console.log(`📝 Content Quality Score: ${auditResults.content.score}/100`)
    if (auditResults.content.issues.length > 0) {
      console.log('   Issues:')
      auditResults.content.issues.slice(0, 5).forEach(i => console.log(`   - ${i}`))
      if (auditResults.content.issues.length > 5) {
        console.log(`   ... and ${auditResults.content.issues.length - 5} more`)
      }
    }
    console.log()
    
    // Performance
    console.log(`⚡ Performance Score: ${auditResults.performance.score}/100`)
    if (auditResults.performance.warnings.length > 0) {
      console.log('   Warnings:')
      auditResults.performance.warnings.slice(0, 3).forEach(w => console.log(`   - ${w}`))
    }
    console.log()
    
    // Overall score
    const overallScore = Math.round(
      (auditResults.seo.score + 
       auditResults.accessibility.score + 
       auditResults.content.score + 
       auditResults.performance.score) / 4
    )
    
    console.log('=' .repeat(50))
    console.log(`🏆 Overall Score: ${overallScore}/100`)
    console.log('=' .repeat(50) + '\n')
    
    // Recommendations
    console.log('📝 Recommendations:')
    if (auditResults.seo.score < 80) {
      console.log('   1. Add missing meta titles and descriptions')
      console.log('   2. Optimize title and description lengths')
    }
    if (auditResults.accessibility.score < 80) {
      console.log('   3. Add alt text to all images')
      console.log('   4. Fix heading hierarchy issues')
    }
    if (auditResults.content.score < 80) {
      console.log('   5. Replace placeholder Lorem Ipsum content')
      console.log('   6. Expand short blog posts (aim for 500+ words)')
    }
    if (auditResults.performance.score < 80) {
      console.log('   7. Optimize large images (max 2000px width)')
      console.log('   8. Consider lazy loading for heavy content')
    }
    
    if (overallScore < 60) {
      console.log('\n❌ Critical issues found - address before deployment')
      process.exit(1)
    } else if (overallScore < 80) {
      console.log('\n⚠️  Several improvements needed')
      process.exit(0)
    } else {
      console.log('\n✅ Content audit passed!')
      process.exit(0)
    }
    
  } catch (error) {
    console.error('❌ Audit error:', error.message)
    process.exit(1)
  }
}

runContentAudit()