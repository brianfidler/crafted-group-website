#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const fs = require('fs').promises
const path = require('path')
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

async function restoreSanity() {
  try {
    console.log('🔄 Sanity Restore Tool')
    console.log('=====================\n')
    
    // List available backups
    const backupsDir = path.join(process.cwd(), 'backups')
    
    try {
      await fs.access(backupsDir)
    } catch {
      console.log('❌ No backups directory found')
      console.log('Run "npm run backup:sanity" first to create a backup')
      process.exit(1)
    }
    
    const files = await fs.readdir(backupsDir)
    const backupFiles = files
      .filter(f => f.startsWith('sanity-backup-') && f.endsWith('.json'))
      .sort()
      .reverse()
    
    if (backupFiles.length === 0) {
      console.log('❌ No backup files found')
      console.log('Run "npm run backup:sanity" first to create a backup')
      process.exit(1)
    }
    
    console.log('📦 Available backups:')
    backupFiles.forEach((file, index) => {
      const timestamp = file.replace('sanity-backup-', '').replace('.json', '')
      console.log(`  ${index + 1}. ${timestamp}`)
    })
    
    const choice = await question('\nSelect backup number to restore (or "q" to quit): ')
    
    if (choice.toLowerCase() === 'q') {
      console.log('Cancelled')
      rl.close()
      process.exit(0)
    }
    
    const index = parseInt(choice) - 1
    if (isNaN(index) || index < 0 || index >= backupFiles.length) {
      console.log('❌ Invalid selection')
      rl.close()
      process.exit(1)
    }
    
    const selectedFile = path.join(backupsDir, backupFiles[index])
    console.log(`\n📖 Loading backup: ${backupFiles[index]}`)
    
    const backupData = JSON.parse(await fs.readFile(selectedFile, 'utf8'))
    
    console.log(`\n📊 Backup details:`)
    console.log(`   Created: ${backupData.timestamp}`)
    console.log(`   Documents: ${backupData.documentCount}`)
    console.log(`   Dataset: ${backupData.dataset}`)
    
    console.log('\n⚠️  WARNING: This will replace ALL content in your Sanity dataset!')
    const confirm = await question('Type "RESTORE" to confirm: ')
    
    if (confirm !== 'RESTORE') {
      console.log('Cancelled')
      rl.close()
      process.exit(0)
    }
    
    console.log('\n🗑️  Deleting existing documents...')
    const existingDocs = await client.fetch('*[!(_id in path("_.**"))]')
    
    for (const doc of existingDocs) {
      await client.delete(doc._id)
    }
    console.log(`   Deleted ${existingDocs.length} documents`)
    
    console.log('\n📥 Restoring documents...')
    let restored = 0
    
    for (const doc of backupData.documents) {
      try {
        await client.createOrReplace(doc)
        restored++
        if (restored % 10 === 0) {
          process.stdout.write(`   Restored ${restored}/${backupData.documentCount}\r`)
        }
      } catch (error) {
        console.log(`\n⚠️  Failed to restore document ${doc._id}: ${error.message}`)
      }
    }
    
    console.log(`\n✅ Restored ${restored} documents successfully!`)
    rl.close()
    
  } catch (error) {
    console.error('❌ Restore failed:', error.message)
    rl.close()
    process.exit(1)
  }
}

restoreSanity()