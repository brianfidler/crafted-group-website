#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const fs = require('fs').promises
const path = require('path')

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

async function backupSanity() {
  try {
    console.log('🔄 Starting Sanity Backup')
    console.log('========================\n')
    
    // Create backups directory if it doesn't exist
    const backupsDir = path.join(process.cwd(), 'backups')
    await fs.mkdir(backupsDir, { recursive: true })
    
    // Fetch all documents
    console.log('📥 Fetching all documents...')
    const documents = await client.fetch('*[!(_id in path("_.**"))]')
    
    console.log(`✅ Found ${documents.length} documents`)
    
    // Create backup with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const backupFile = path.join(backupsDir, `sanity-backup-${timestamp}.json`)
    
    // Save backup
    const backup = {
      timestamp: new Date().toISOString(),
      projectId,
      dataset,
      documentCount: documents.length,
      documents
    }
    
    await fs.writeFile(backupFile, JSON.stringify(backup, null, 2))
    
    console.log(`\n✅ Backup saved to: ${backupFile}`)
    console.log(`📊 Total documents: ${documents.length}`)
    
    // Keep only last 5 backups
    const files = await fs.readdir(backupsDir)
    const backupFiles = files
      .filter(f => f.startsWith('sanity-backup-') && f.endsWith('.json'))
      .sort()
      .reverse()
    
    if (backupFiles.length > 5) {
      console.log('\n🗑️  Cleaning old backups (keeping last 5)...')
      for (const oldFile of backupFiles.slice(5)) {
        await fs.unlink(path.join(backupsDir, oldFile))
        console.log(`   Removed: ${oldFile}`)
      }
    }
    
    console.log('\n✨ Backup complete!')
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message)
    process.exit(1)
  }
}

backupSanity()