#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const fetch = require('node-fetch')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

const linkResults = {
  totalLinks: 0,
  checkedLinks: 0,
  brokenLinks: [],
  redirects: [],
  warnings: [],
  internalLinks: [],
  externalLinks: []
}

// Extract links from different content types
function extractLinks(doc) {
  const links = []
  
  // Check direct link fields
  const linkFields = [
    'buttonLink', 'link', 'url', 'href', 
    'websiteUrl', 'linkedIn', 'twitter', 'github'
  ]
  
  linkFields.forEach(field => {
    if (doc[field] && typeof doc[field] === 'string') {
      links.push({
        url: doc[field],
        source: `${doc._type}:${doc._id}`,
        field: field
      })
    }
  })
  
  // Check nested objects
  if (doc.callToAction?.buttonLink) {
    links.push({
      url: doc.callToAction.buttonLink,
      source: `${doc._type}:${doc._id}`,
      field: 'callToAction.buttonLink'
    })
  }
  
  if (doc.heroCallToAction?.buttonLink) {
    links.push({
      url: doc.heroCallToAction.buttonLink,
      source: `${doc._type}:${doc._id}`,
      field: 'heroCallToAction.buttonLink'
    })
  }
  
  if (doc.finalCallToAction?.buttonLink) {
    links.push({
      url: doc.finalCallToAction.buttonLink,
      source: `${doc._type}:${doc._id}`,
      field: 'finalCallToAction.buttonLink'
    })
  }
  
  // Check portable text blocks for links
  if (doc.body && Array.isArray(doc.body)) {
    doc.body.forEach((block, blockIndex) => {
      if (block.markDefs && Array.isArray(block.markDefs)) {
        block.markDefs.forEach(mark => {
          if (mark._type === 'link' && mark.href) {
            links.push({
              url: mark.href,
              source: `${doc._type}:${doc._id}`,
              field: `body[${blockIndex}]`
            })
          }
        })
      }
    })
  }
  
  // Check service/pricing arrays
  if (doc.services && Array.isArray(doc.services)) {
    doc.services.forEach((service, index) => {
      if (service.link) {
        links.push({
          url: service.link,
          source: `${doc._type}:${doc._id}`,
          field: `services[${index}].link`
        })
      }
    })
  }
  
  return links
}

// Check if URL is internal or external
function isInternalLink(url) {
  if (!url) return false
  return url.startsWith('/') || url.startsWith('#') || 
         url.includes('localhost') || url.includes('crafted-group')
}

// Validate a single link
async function checkLink(link) {
  const { url, source, field } = link
  
  // Skip empty or invalid URLs
  if (!url || url === '#') {
    return { status: 'skip', reason: 'Empty or placeholder URL' }
  }
  
  // Handle internal links
  if (url.startsWith('/')) {
    // Check if route exists in Next.js app
    const validRoutes = [
      '/', '/about', '/services', '/pricing', 
      '/contact', '/blog', '/case-studies', '/studio'
    ]
    
    const route = url.split('?')[0].split('#')[0]
    
    if (validRoutes.includes(route) || route.startsWith('/blog/')) {
      return { status: 'ok', type: 'internal' }
    } else {
      return { 
        status: 'broken', 
        type: 'internal',
        error: `Route does not exist: ${route}` 
      }
    }
  }
  
  // Handle anchor links
  if (url.startsWith('#')) {
    return { status: 'ok', type: 'anchor' }
  }
  
  // Handle external links
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      // Use HEAD request to check if URL exists
      const response = await fetch(url, {
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
        }
      })
      
      if (response.ok) {
        return { status: 'ok', type: 'external', statusCode: response.status }
      } else if (response.status >= 300 && response.status < 400) {
        return { 
          status: 'redirect', 
          type: 'external',
          statusCode: response.status,
          location: response.headers.get('location')
        }
      } else {
        return { 
          status: 'broken', 
          type: 'external',
          statusCode: response.status,
          error: `HTTP ${response.status}`
        }
      }
    } catch (error) {
      // Try GET request as fallback
      try {
        const response = await fetch(url, {
          method: 'GET',
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
          }
        })
        
        if (response.ok) {
          return { status: 'ok', type: 'external', statusCode: response.status }
        } else {
          return { 
            status: 'broken', 
            type: 'external',
            error: error.message
          }
        }
      } catch (fallbackError) {
        return { 
          status: 'broken', 
          type: 'external',
          error: fallbackError.message 
        }
      }
    }
  }
  
  // Handle relative URLs without protocol
  if (url.includes('.')) {
    return await checkLink({ 
      ...link, 
      url: `https://${url}` 
    })
  }
  
  return { status: 'unknown', error: 'Unrecognized URL format' }
}

async function runLinkCheck() {
  console.log('🔗 Link Checker Tool')
  console.log('===================\n')
  
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
    console.log('📥 Fetching content...')
    const allDocs = await client.fetch(`*[!(_id in path("_.**"))]`)
    console.log(`Found ${allDocs.length} documents\n`)
    
    // Extract all links
    console.log('🔍 Extracting links...')
    const allLinks = []
    
    allDocs.forEach(doc => {
      const docLinks = extractLinks(doc)
      allLinks.push(...docLinks)
    })
    
    linkResults.totalLinks = allLinks.length
    console.log(`Found ${allLinks.length} links to check\n`)
    
    // Remove duplicates
    const uniqueUrls = new Map()
    allLinks.forEach(link => {
      if (!uniqueUrls.has(link.url)) {
        uniqueUrls.set(link.url, [])
      }
      uniqueUrls.get(link.url).push({
        source: link.source,
        field: link.field
      })
    })
    
    console.log(`Checking ${uniqueUrls.size} unique URLs...\n`)
    
    // Check each unique URL
    let checked = 0
    for (const [url, sources] of uniqueUrls.entries()) {
      checked++
      process.stdout.write(`Progress: ${checked}/${uniqueUrls.size}\r`)
      
      const result = await checkLink({ url, source: sources[0].source, field: sources[0].field })
      linkResults.checkedLinks++
      
      if (result.status === 'broken') {
        linkResults.brokenLinks.push({
          url,
          error: result.error,
          sources: sources
        })
      } else if (result.status === 'redirect') {
        linkResults.redirects.push({
          url,
          statusCode: result.statusCode,
          location: result.location,
          sources: sources
        })
      } else if (result.type === 'internal') {
        linkResults.internalLinks.push(url)
      } else if (result.type === 'external') {
        linkResults.externalLinks.push(url)
      }
      
      // Rate limiting for external requests
      if (result.type === 'external') {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    console.log('\n')
    
    // Print results
    console.log('=' .repeat(50))
    console.log('📊 Link Check Results')
    console.log('=' .repeat(50) + '\n')
    
    console.log(`Total links found: ${linkResults.totalLinks}`)
    console.log(`Unique URLs checked: ${uniqueUrls.size}`)
    console.log(`Internal links: ${linkResults.internalLinks.length}`)
    console.log(`External links: ${linkResults.externalLinks.length}`)
    console.log()
    
    if (linkResults.brokenLinks.length > 0) {
      console.log(`❌ Broken Links (${linkResults.brokenLinks.length})`)
      console.log('=' .repeat(30))
      linkResults.brokenLinks.forEach(broken => {
        console.log(`\nURL: ${broken.url}`)
        console.log(`Error: ${broken.error}`)
        console.log('Found in:')
        broken.sources.forEach(source => {
          console.log(`  - ${source.source} (field: ${source.field})`)
        })
      })
      console.log()
    }
    
    if (linkResults.redirects.length > 0) {
      console.log(`⚠️  Redirects (${linkResults.redirects.length})`)
      console.log('=' .repeat(30))
      linkResults.redirects.slice(0, 5).forEach(redirect => {
        console.log(`\nURL: ${redirect.url}`)
        console.log(`Status: ${redirect.statusCode}`)
        if (redirect.location) {
          console.log(`Redirects to: ${redirect.location}`)
        }
      })
      if (linkResults.redirects.length > 5) {
        console.log(`\n... and ${linkResults.redirects.length - 5} more redirects`)
      }
      console.log()
    }
    
    // Summary and recommendations
    console.log('=' .repeat(50))
    console.log('📝 Recommendations')
    console.log('=' .repeat(50) + '\n')
    
    if (linkResults.brokenLinks.length > 0) {
      console.log('1. Fix or remove broken links immediately')
      console.log('2. Update content in Sanity Studio')
      console.log('3. Consider setting up redirects for moved content')
    }
    
    if (linkResults.redirects.length > 0) {
      console.log('4. Update links to avoid unnecessary redirects')
      console.log('5. Use final destination URLs directly')
    }
    
    if (linkResults.externalLinks.length > 20) {
      console.log('6. Consider adding rel="noopener noreferrer" to external links')
      console.log('7. Monitor external links regularly for changes')
    }
    
    // Exit code
    if (linkResults.brokenLinks.length > 0) {
      console.log('\n❌ Broken links found!')
      process.exit(1)
    } else if (linkResults.redirects.length > 10) {
      console.log('\n⚠️  Many redirects found - consider updating')
      process.exit(0)
    } else {
      console.log('\n✅ All links are valid!')
      process.exit(0)
    }
    
  } catch (error) {
    console.error('\n❌ Link check error:', error.message)
    
    // Check if node-fetch is missing
    if (error.message.includes("Cannot find module 'node-fetch'")) {
      console.log('\nℹ️  Installing required dependency...')
      require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' })
      console.log('Please run the command again.')
    }
    
    process.exit(1)
  }
}

// Check if fetch is available
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch')
  } catch {
    console.log('ℹ️  Installing node-fetch...')
    require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' })
    console.log('Please run the command again.')
    process.exit(0)
  }
}

runLinkCheck()