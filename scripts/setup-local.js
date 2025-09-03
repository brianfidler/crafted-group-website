#!/usr/bin/env node

const { execSync } = require('child_process')
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

function exec(command, silent = false) {
  try {
    const result = execSync(command, { 
      stdio: silent ? 'pipe' : 'inherit',
      encoding: 'utf8'
    })
    return { success: true, output: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const steps = [
  {
    name: 'Check Node.js version',
    check: () => {
      const version = process.version
      const major = parseInt(version.split('.')[0].substring(1))
      if (major < 18) {
        return { success: false, message: `Node.js ${version} detected. Please upgrade to v18 or higher.` }
      }
      return { success: true, message: `Node.js ${version} ✓` }
    }
  },
  {
    name: 'Install dependencies',
    check: () => {
      if (!fs.existsSync('node_modules')) {
        console.log('📦 Installing dependencies...')
        const result = exec('npm install')
        if (!result.success) {
          return { success: false, message: 'Failed to install dependencies' }
        }
      }
      return { success: true, message: 'Dependencies installed ✓' }
    }
  },
  {
    name: 'Configure environment',
    check: async () => {
      if (!fs.existsSync('.env.local')) {
        console.log('\n📝 Setting up environment variables...')
        const configure = await question('Would you like to configure environment variables now? (y/n): ')
        if (configure.toLowerCase() === 'y') {
          exec('node scripts/env-validate.js')
        } else {
          return { success: false, message: 'Environment not configured. Run "npm run env:validate" later.' }
        }
      }
      return { success: true, message: 'Environment configured ✓' }
    }
  },
  {
    name: 'Check Sanity CLI',
    check: () => {
      const result = exec('npx sanity --version', true)
      if (!result.success) {
        console.log('📦 Installing Sanity CLI...')
        exec('npm install -g @sanity/cli')
      }
      return { success: true, message: 'Sanity CLI available ✓' }
    }
  },
  {
    name: 'Initialize Sanity (if needed)',
    check: async () => {
      if (!fs.existsSync('sanity/sanity.json') && !fs.existsSync('sanity.config.ts')) {
        console.log('\n🎨 Sanity not initialized.')
        const init = await question('Would you like to initialize Sanity now? (y/n): ')
        if (init.toLowerCase() === 'y') {
          console.log('Please follow the Sanity initialization prompts...')
          exec('npx sanity init')
        }
      }
      return { success: true, message: 'Sanity configured ✓' }
    }
  },
  {
    name: 'Create backups directory',
    check: () => {
      const backupsDir = path.join(process.cwd(), 'backups')
      if (!fs.existsSync(backupsDir)) {
        fs.mkdirSync(backupsDir, { recursive: true })
      }
      return { success: true, message: 'Backups directory ready ✓' }
    }
  },
  {
    name: 'Run health check',
    check: () => {
      console.log('\n🏥 Running health check...')
      const result = exec('node scripts/health-check.js', true)
      if (!result.success) {
        return { success: false, message: 'Health check failed. Run "npm run health:check" for details.' }
      }
      return { success: true, message: 'Health check passed ✓' }
    }
  }
]

async function setupLocal() {
  console.log('🚀 Crafted Group Website - Local Setup')
  console.log('======================================\n')
  
  console.log('This script will help you set up your local development environment.\n')
  
  const results = []
  
  for (const step of steps) {
    process.stdout.write(`${step.name}... `)
    const result = await step.check()
    
    if (result.success) {
      console.log(result.message)
    } else {
      console.log(`❌ ${result.message}`)
    }
    
    results.push({ ...step, ...result })
  }
  
  console.log('\n======================================')
  console.log('Setup Summary:')
  console.log('======================================\n')
  
  const failed = results.filter(r => !r.success)
  const succeeded = results.filter(r => r.success)
  
  console.log(`✅ Completed: ${succeeded.length}/${results.length}`)
  
  if (failed.length > 0) {
    console.log(`\n⚠️  Issues found:`)
    failed.forEach(step => {
      console.log(`   - ${step.name}: ${step.message}`)
    })
  }
  
  console.log('\n📚 Available commands:')
  console.log('----------------------')
  console.log('npm run dev          - Start development server')
  console.log('npm run build        - Build for production')
  console.log('npm run sanity:dev   - Start Sanity Studio')
  console.log('npm run health:check - Run health check')
  console.log('npm run backup:sanity - Backup Sanity content')
  console.log('npm run fix:all      - Fix content issues')
  console.log('npm run env:validate - Configure environment')
  
  if (failed.length === 0) {
    console.log('\n✨ Setup complete! Run "npm run dev" to start developing.')
  } else {
    console.log('\n⚠️  Please resolve the issues above before starting development.')
  }
  
  rl.close()
}

setupLocal().catch(error => {
  console.error('❌ Setup error:', error.message)
  rl.close()
  process.exit(1)
})