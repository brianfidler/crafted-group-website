#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const readline = require('readline')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function getSanityToken() {
  // First try to get token from environment variable
  const envToken = process.env.SANITY_API_TOKEN
  
  if (envToken) {
    console.log('✅ Using Sanity API token from environment variable')
    return envToken
  }
  
  // Fallback to prompting user
  console.log('\n🔑 Sanity API Token Required')
  console.log('To get your token:')
  console.log('1. Go to https://www.sanity.io/manage')
  console.log('2. Select your project')
  console.log('3. Go to API → Tokens')
  console.log('4. Create a new token with "Editor" permissions')
  console.log('5. Copy the token\n')
  console.log('💡 Tip: Add SANITY_API_TOKEN to your .env.local file to avoid this prompt\n')
  
  const token = await question('Enter your Sanity API token: ')
  return token.trim()
}

// We'll create the client after getting the token
let client

// Function to add keys to arrays recursively
function addKeysToArrays(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return {
          ...addKeysToArrays(item),
          _key: item._key || `key-${index}-${Date.now()}`
        }
      }
      return item
    })
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = addKeysToArrays(value)
    }
    return result
  }
  return obj
}

async function fixMissingKeys() {
  try {
    console.log('🔧 Starting Fix Missing Keys for Sanity Content')
    console.log('================================================\n')
    
    if (!projectId) {
      console.log('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local')
      console.log('Please make sure your .env.local file contains your Sanity project ID')
      return
    }
    
    console.log(`📋 Project: ${projectId}`)
    console.log(`📋 Dataset: ${dataset}`)
    console.log(`📋 API Version: ${apiVersion}\n`)
    
    // Get the token
    const token = await getSanityToken()
    
    // Create client with token
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token,
    })
    
    console.log('\n📋 Fetching all documents to fix missing keys...\n')
    
    // Fetch all documents
    const documents = await client.fetch(`*[_type in ["homePage", "aboutPage", "servicesPage", "pricingPage", "caseStudiesPage", "contactPage", "siteSettings"]]`)
    
    console.log(`Found ${documents.length} documents to process\n`)
    
    let updatedCount = 0
    
    for (const doc of documents) {
      console.log(`📄 Processing ${doc._type} (${doc._id})...`)
      
      try {
        // Add keys to arrays recursively
        const updatedDoc = addKeysToArrays(doc)
        
        // Check if any changes were made
        const hasChanges = JSON.stringify(updatedDoc) !== JSON.stringify(doc)
        
        if (hasChanges) {
          // Update the document
          await client.createOrReplace(updatedDoc)
          console.log(`✅ Updated ${doc._type} with missing keys`)
          updatedCount++
        } else {
          console.log(`ℹ️  No changes needed for ${doc._type}`)
        }
        
      } catch (error) {
        console.log(`❌ Failed to update ${doc._type}: ${error.message}`)
      }
    }
    
    console.log('\n🎉 Key fixing completed!')
    console.log(`✅ Updated ${updatedCount} documents`)
    
    console.log('\n🚀 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to edit your content')
    console.log('2. The "Missing keys" error should now be resolved')
    console.log('3. You can now edit arrays and lists in Sanity Studio')
    
  } catch (error) {
    console.error('\n❌ Key fixing failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('- Make sure your Sanity token is correct')
    console.log('- Check that your project ID and dataset are correct')
    console.log('- Ensure you have Editor permissions on your Sanity project')
  } finally {
    rl.close()
  }
}

fixMissingKeys()
