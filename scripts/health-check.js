#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const fetch = require('node-fetch')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

const checks = {
  environment: { status: 'pending', message: '' },
  sanityConnection: { status: 'pending', message: '' },
  content: { status: 'pending', message: '' },
  nextApp: { status: 'pending', message: '' },
  dependencies: { status: 'pending', message: '' }
}

async function checkEnvironment() {
  console.log('🔍 Checking environment variables...')
  
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'NEXT_PUBLIC_SANITY_API_VERSION'
  ]
  
  const missing = []
  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }
  
  if (missing.length > 0) {
    checks.environment.status = 'error'
    checks.environment.message = `Missing: ${missing.join(', ')}`
  } else {
    checks.environment.status = 'success'
    checks.environment.message = 'All required variables present'
  }
  
  if (!token) {
    checks.environment.status = 'warning'
    checks.environment.message += ' (SANITY_API_TOKEN missing - read-only mode)'
  }
}

async function checkSanityConnection() {
  console.log('🔍 Checking Sanity connection...')
  
  if (!projectId) {
    checks.sanityConnection.status = 'error'
    checks.sanityConnection.message = 'No project ID configured'
    return
  }
  
  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token,
    })
    
    const result = await client.fetch('count(*)')
    checks.sanityConnection.status = 'success'
    checks.sanityConnection.message = `Connected (${result} documents)`
  } catch (error) {
    checks.sanityConnection.status = 'error'
    checks.sanityConnection.message = error.message
  }
}

async function checkContent() {
  console.log('🔍 Checking content structure...')
  
  if (!projectId) {
    checks.content.status = 'skip'
    checks.content.message = 'Skipped (no connection)'
    return
  }
  
  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token,
    })
    
    const requiredPages = ['homePage', 'aboutPage', 'servicesPage', 'contactPage', 'blogPage']
    const missing = []
    
    for (const pageType of requiredPages) {
      const page = await client.fetch(`*[_type == "${pageType}"][0]`)
      if (!page) {
        missing.push(pageType)
      }
    }
    
    if (missing.length > 0) {
      checks.content.status = 'warning'
      checks.content.message = `Missing pages: ${missing.join(', ')}`
    } else {
      const postCount = await client.fetch('count(*[_type == "post"])')
      checks.content.status = 'success'
      checks.content.message = `All pages present, ${postCount} blog posts`
    }
  } catch (error) {
    checks.content.status = 'error'
    checks.content.message = error.message
  }
}

async function checkNextApp() {
  console.log('🔍 Checking Next.js application...')
  
  try {
    const response = await fetch('http://localhost:3000')
    if (response.ok) {
      checks.nextApp.status = 'success'
      checks.nextApp.message = 'Running on port 3000'
    } else {
      checks.nextApp.status = 'warning'
      checks.nextApp.message = `Running but returned ${response.status}`
    }
  } catch (error) {
    // Try port 3001
    try {
      const response = await fetch('http://localhost:3001')
      if (response.ok) {
        checks.nextApp.status = 'success'
        checks.nextApp.message = 'Running on port 3001'
      } else {
        checks.nextApp.status = 'warning'
        checks.nextApp.message = `Running on 3001 but returned ${response.status}`
      }
    } catch {
      checks.nextApp.status = 'info'
      checks.nextApp.message = 'Not running (run "npm run dev" to start)'
    }
  }
}

async function checkDependencies() {
  console.log('🔍 Checking dependencies...')
  
  const { execSync } = require('child_process')
  
  try {
    execSync('npm ls --depth=0', { stdio: 'pipe' })
    checks.dependencies.status = 'success'
    checks.dependencies.message = 'All dependencies installed'
  } catch (error) {
    const output = error.stdout?.toString() || ''
    if (output.includes('missing')) {
      checks.dependencies.status = 'error'
      checks.dependencies.message = 'Missing dependencies (run "npm install")'
    } else if (output.includes('UNMET')) {
      checks.dependencies.status = 'warning'
      checks.dependencies.message = 'Unmet peer dependencies'
    } else {
      checks.dependencies.status = 'warning'
      checks.dependencies.message = 'Some issues detected'
    }
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'success': return '✅'
    case 'warning': return '⚠️'
    case 'error': return '❌'
    case 'info': return 'ℹ️'
    case 'skip': return '⏭️'
    default: return '⏳'
  }
}

async function runHealthCheck() {
  console.log('🏥 Crafted Group Website Health Check')
  console.log('=====================================\n')
  
  await checkEnvironment()
  await checkSanityConnection()
  await checkContent()
  await checkNextApp()
  await checkDependencies()
  
  console.log('\n📊 Health Check Results:')
  console.log('------------------------\n')
  
  let hasErrors = false
  let hasWarnings = false
  
  for (const [check, result] of Object.entries(checks)) {
    const icon = getStatusIcon(result.status)
    const checkName = check.replace(/([A-Z])/g, ' $1').trim()
    console.log(`${icon} ${checkName.charAt(0).toUpperCase() + checkName.slice(1)}`)
    console.log(`   ${result.message}\n`)
    
    if (result.status === 'error') hasErrors = true
    if (result.status === 'warning') hasWarnings = true
  }
  
  console.log('------------------------')
  
  if (hasErrors) {
    console.log('❌ Health check failed - errors found')
    process.exit(1)
  } else if (hasWarnings) {
    console.log('⚠️  Health check passed with warnings')
  } else {
    console.log('✅ Health check passed - all systems operational!')
  }
}

// Handle missing node-fetch
if (!fetch) {
  checks.nextApp.status = 'skip'
  checks.nextApp.message = 'Check skipped (install node-fetch for full check)'
}

runHealthCheck().catch(error => {
  console.error('❌ Health check error:', error.message)
  process.exit(1)
})