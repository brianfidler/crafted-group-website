#!/usr/bin/env node

const { createClient } = require('@sanity/client')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.log('❌ Error: SANITY_API_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token,
})

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

async function fixBlogKeys() {
  try {
    console.log('🔧 Starting Fix Missing Keys for Blog Posts')
    console.log('============================================\n')
    
    // Fetch all blog posts
    const posts = await client.fetch(`*[_type == "post"]`)
    
    if (!posts || posts.length === 0) {
      console.log('❌ No blog posts found')
      return
    }
    
    console.log(`Found ${posts.length} blog posts to process\n`)
    
    let updatedCount = 0
    
    for (const post of posts) {
      console.log(`📄 Processing blog post: ${post.title}`)
      
      try {
        // Add keys to the body content recursively
        const updatedPost = {
          ...post,
          body: addKeysToArrays(post.body)
        }
        
        // Check if any changes were made
        const hasChanges = JSON.stringify(updatedPost) !== JSON.stringify(post)
        
        if (hasChanges) {
          // Update the post
          await client.createOrReplace(updatedPost)
          console.log(`✅ Updated blog post: ${post.title}`)
          updatedCount++
        } else {
          console.log(`ℹ️  No changes needed for: ${post.title}`)
        }
        
      } catch (error) {
        console.log(`❌ Failed to update ${post.title}: ${error.message}`)
      }
    }
    
    console.log('\n🎉 Blog post key fixing completed!')
    console.log(`✅ Updated ${updatedCount} blog posts`)
    
    console.log('\n🚀 Next steps:')
    console.log('1. Visit http://localhost:3000/blog to view your blog posts')
    console.log('2. The "Missing keys" error should now be resolved')
    console.log('3. Blog posts should render without React warnings')
    
  } catch (error) {
    console.error('\n❌ Blog post key fixing failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('- Make sure your Sanity token is correct')
    console.log('- Check that your project ID and dataset are correct')
    console.log('- Ensure you have Editor permissions on your Sanity project')
  }
}

fixBlogKeys()
