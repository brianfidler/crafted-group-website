#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

const requiredEnvVars = {
  'NEXT_PUBLIC_SANITY_PROJECT_ID': {
    description: 'Your Sanity project ID',
    example: 'abc123xyz',
    getInstructions: '1. Go to https://sanity.io/manage\n2. Select your project\n3. Copy the Project ID'
  },
  'NEXT_PUBLIC_SANITY_DATASET': {
    description: 'Sanity dataset name',
    example: 'production',
    default: 'production'
  },
  'NEXT_PUBLIC_SANITY_API_VERSION': {
    description: 'Sanity API version',
    example: '2024-01-01',
    default: '2024-01-01'
  },
  'SANITY_API_TOKEN': {
    description: 'Sanity API token for write operations',
    example: 'skRw7BDsF...',
    getInstructions: '1. Go to https://sanity.io/manage\n2. Select your project\n3. Go to API → Tokens\n4. Create new token with "Editor" permissions',
    optional: true,
    sensitive: true
  }
}

async function validateEnvironment() {
  console.log('🔍 Environment Validation Tool')
  console.log('==============================\n')
  
  const envPath = path.join(process.cwd(), '.env.local')
  const templatePath = path.join(process.cwd(), 'env.template')
  
  // Load existing env if it exists
  let existingEnv = {}
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    content.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        existingEnv[key.trim()] = valueParts.join('=').trim()
      }
    })
    console.log('✅ Found existing .env.local file\n')
  } else {
    console.log('📝 No .env.local file found, will create one\n')
  }
  
  // Check each required variable
  const missing = []
  const configured = []
  
  for (const [key, config] of Object.entries(requiredEnvVars)) {
    if (existingEnv[key]) {
      configured.push(key)
      console.log(`✅ ${key}: Configured`)
    } else if (config.optional) {
      console.log(`ℹ️  ${key}: Not configured (optional)`)
    } else {
      missing.push(key)
      console.log(`❌ ${key}: Missing`)
    }
  }
  
  console.log('\n------------------------')
  console.log(`Configured: ${configured.length}/${Object.keys(requiredEnvVars).length}`)
  
  if (missing.length === 0 && configured.length === Object.keys(requiredEnvVars).filter(k => !requiredEnvVars[k].optional).length) {
    console.log('✅ All required environment variables are configured!')
    
    // Ask if they want to update optional ones
    const updateOptional = await question('\nWould you like to configure optional variables? (y/n): ')
    if (updateOptional.toLowerCase() !== 'y') {
      rl.close()
      return
    }
  }
  
  // Interactive setup for missing variables
  if (missing.length > 0) {
    console.log('\n🔧 Let\'s configure the missing variables:\n')
    
    for (const key of missing) {
      const config = requiredEnvVars[key]
      
      console.log(`\n📋 ${key}`)
      console.log(`   ${config.description}`)
      if (config.getInstructions) {
        console.log(`\n   How to get this value:`)
        console.log(`   ${config.getInstructions.split('\n').join('\n   ')}`)
      }
      if (config.example) {
        console.log(`   Example: ${config.example}`)
      }
      
      let value
      if (config.default) {
        value = await question(`   Enter value (press Enter for "${config.default}"): `)
        if (!value) value = config.default
      } else {
        do {
          value = await question(`   Enter value: `)
        } while (!value)
      }
      
      existingEnv[key] = value
    }
  }
  
  // Write the updated env file
  console.log('\n💾 Saving configuration...')
  
  const envContent = Object.entries(existingEnv)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
  
  fs.writeFileSync(envPath, envContent + '\n')
  console.log('✅ Saved to .env.local')
  
  // Create/update template file
  const templateContent = Object.entries(requiredEnvVars)
    .map(([key, config]) => {
      const value = config.sensitive ? 'your-token-here' : (config.example || config.default || '')
      return `# ${config.description}${config.optional ? ' (optional)' : ''}\n${key}=${value}`
    })
    .join('\n\n')
  
  fs.writeFileSync(templatePath, templateContent + '\n')
  console.log('✅ Updated env.template')
  
  // Final validation
  console.log('\n🎉 Environment configuration complete!')
  console.log('\nNext steps:')
  console.log('1. Run "npm run health:check" to verify everything is working')
  console.log('2. Run "npm run dev" to start the development server')
  
  rl.close()
}

validateEnvironment().catch(error => {
  console.error('❌ Error:', error.message)
  rl.close()
  process.exit(1)
})