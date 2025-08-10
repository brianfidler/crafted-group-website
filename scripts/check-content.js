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
  console.log('\n🔑 Sanity API Token Required')
  console.log('To get your token:')
  console.log('1. Go to https://www.sanity.io/manage')
  console.log('2. Select your project')
  console.log('3. Go to API → Tokens')
  console.log('4. Create a new token with "Editor" permissions')
  console.log('5. Copy the token\n')
  
  const token = await question('Enter your Sanity API token: ')
  return token.trim()
}

async function checkContent() {
  try {
    console.log('🔍 Checking Content in Sanity CMS')
    console.log('================================\n')
    
    if (!projectId) {
      console.log('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local')
      return
    }
    
    console.log(`📋 Project: ${projectId}`)
    console.log(`📋 Dataset: ${dataset}`)
    console.log(`📋 API Version: ${apiVersion}\n`)
    
    // Get the token
    const token = await getSanityToken()
    
    // Create client with token
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token,
    })
    
    console.log('\n📋 Checking content...\n')
    
    // Check each page
    const pages = ['homePage', 'aboutPage', 'servicesPage', 'pricingPage', 'caseStudiesPage', 'contactPage', 'siteSettings']
    
    for (const pageId of pages) {
      console.log(`📄 Checking ${pageId}...`)
      
      try {
        const content = await client.getDocument(pageId)
        if (content) {
          console.log(`✅ ${pageId} exists`)
          console.log(`   Title: ${content.title || 'No title'}`)
          console.log(`   Type: ${content._type}`)
          console.log(`   Last updated: ${content._updatedAt}`)
          
          // Show some key fields for about page
          if (pageId === 'aboutPage') {
            console.log(`   Page Title: ${content.pageTitle || 'No page title'}`)
            console.log(`   Page Subtitle: ${content.pageSubtitle || 'No subtitle'}`)
            if (content.personalStory && content.personalStory.length > 0) {
              const firstBlock = content.personalStory[0]
              if (firstBlock.children && firstBlock.children[0]) {
                console.log(`   First story block: ${firstBlock.children[0].text.substring(0, 50)}...`)
              }
            }
          }
        } else {
          console.log(`❌ ${pageId} not found`)
        }
      } catch (error) {
        console.log(`❌ Error checking ${pageId}: ${error.message}`)
      }
      
      console.log('') // Empty line for readability
    }
    
    console.log('🎉 Content check completed!')
    
  } catch (error) {
    console.error('\n❌ Check failed:', error.message)
  } finally {
    rl.close()
  }
}

checkContent()
