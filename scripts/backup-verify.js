#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const fs = require('fs').promises
const path = require('path')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

async function verifyBackups() {
  const results = {
    backupsFound: 0,
    validBackups: [],
    corruptedBackups: [],
    warnings: []
  }

  try {
    console.log('🔍 Backup Verification Tool')
    console.log('==========================\n')
    
    // Check if backups directory exists
    const backupsDir = path.join(process.cwd(), 'backups')
    
    try {
      await fs.access(backupsDir)
    } catch {
      console.log('❌ No backups directory found')
      console.log('   Run "npm run backup:sanity" to create your first backup')
      process.exit(1)
    }
    
    // List all backup files
    const files = await fs.readdir(backupsDir)
    const backupFiles = files
      .filter(f => f.startsWith('sanity-backup-') && f.endsWith('.json'))
      .sort()
      .reverse()
    
    results.backupsFound = backupFiles.length
    
    if (backupFiles.length === 0) {
      console.log('❌ No backup files found')
      console.log('   Run "npm run backup:sanity" to create a backup')
      process.exit(1)
    }
    
    console.log(`📦 Found ${backupFiles.length} backup(s)\n`)
    
    // Verify each backup
    for (const file of backupFiles) {
      const filePath = path.join(backupsDir, file)
      console.log(`Verifying: ${file}`)
      
      try {
        // Read and parse backup
        const content = await fs.readFile(filePath, 'utf8')
        const backup = JSON.parse(content)
        
        // Verify structure
        const issues = []
        
        // Check required fields
        if (!backup.timestamp) issues.push('Missing timestamp')
        if (!backup.projectId) issues.push('Missing projectId')
        if (!backup.dataset) issues.push('Missing dataset')
        if (!backup.documentCount && backup.documentCount !== 0) issues.push('Missing documentCount')
        if (!backup.documents || !Array.isArray(backup.documents)) {
          issues.push('Missing or invalid documents array')
        }
        
        // Verify document count matches
        if (backup.documents && backup.documentCount !== backup.documents.length) {
          issues.push(`Document count mismatch: expected ${backup.documentCount}, found ${backup.documents.length}`)
        }
        
        // Check for required document fields
        if (backup.documents && backup.documents.length > 0) {
          const invalidDocs = backup.documents.filter(doc => !doc._id || !doc._type)
          if (invalidDocs.length > 0) {
            issues.push(`${invalidDocs.length} documents missing _id or _type`)
          }
        }
        
        // Check file size (warn if over 10MB)
        const stats = await fs.stat(filePath)
        const sizeMB = stats.size / (1024 * 1024)
        if (sizeMB > 10) {
          results.warnings.push(`${file} is ${sizeMB.toFixed(2)}MB (large file)`)
        }
        
        // Check age (warn if over 30 days)
        const backupDate = new Date(backup.timestamp)
        const ageInDays = (Date.now() - backupDate) / (1000 * 60 * 60 * 24)
        if (ageInDays > 30) {
          results.warnings.push(`${file} is ${Math.floor(ageInDays)} days old`)
        }
        
        if (issues.length === 0) {
          console.log(`   ✅ Valid (${backup.documentCount} documents, ${sizeMB.toFixed(2)}MB)`)
          results.validBackups.push({
            file,
            timestamp: backup.timestamp,
            documentCount: backup.documentCount,
            size: sizeMB,
            ageInDays: Math.floor(ageInDays)
          })
        } else {
          console.log(`   ❌ Issues found:`)
          issues.forEach(issue => console.log(`      - ${issue}`))
          results.corruptedBackups.push({ file, issues })
        }
        
      } catch (error) {
        console.log(`   ❌ Failed to verify: ${error.message}`)
        results.corruptedBackups.push({ 
          file, 
          issues: [`Parse error: ${error.message}`] 
        })
      }
      
      console.log('')
    }
    
    // Summary
    console.log('📊 Verification Summary')
    console.log('=======================\n')
    console.log(`Total backups: ${results.backupsFound}`)
    console.log(`✅ Valid: ${results.validBackups.length}`)
    console.log(`❌ Corrupted: ${results.corruptedBackups.length}`)
    
    if (results.warnings.length > 0) {
      console.log(`\n⚠️  Warnings:`)
      results.warnings.forEach(warning => console.log(`   - ${warning}`))
    }
    
    // Recommendations
    if (results.validBackups.length > 0) {
      const newest = results.validBackups[0]
      const oldest = results.validBackups[results.validBackups.length - 1]
      
      console.log('\n📝 Recommendations:')
      
      if (newest.ageInDays > 7) {
        console.log(`   - Consider creating a fresh backup (newest is ${newest.ageInDays} days old)`)
      }
      
      if (results.backupsFound > 10) {
        console.log(`   - Consider cleaning old backups (you have ${results.backupsFound})`)
      }
      
      if (results.corruptedBackups.length > 0) {
        console.log(`   - Remove corrupted backups to free space`)
        results.corruptedBackups.forEach(b => {
          console.log(`     rm backups/${b.file}`)
        })
      }
    }
    
    // Exit code
    if (results.validBackups.length === 0) {
      console.log('\n❌ No valid backups available!')
      process.exit(1)
    } else if (results.corruptedBackups.length > 0) {
      console.log('\n⚠️  Some backups have issues but valid backups exist')
      process.exit(0)
    } else {
      console.log('\n✅ All backups verified successfully!')
      process.exit(0)
    }
    
  } catch (error) {
    console.error('❌ Verification error:', error.message)
    process.exit(1)
  }
}

// Check if running as test mode
const isTest = process.argv.includes('--test')

if (isTest) {
  console.log('🧪 Running in test mode...\n')
  // Create test backup for verification
  const testBackup = {
    timestamp: new Date().toISOString(),
    projectId: 'test-project',
    dataset: 'test',
    documentCount: 2,
    documents: [
      { _id: 'test1', _type: 'testDoc', content: 'test' },
      { _id: 'test2', _type: 'testDoc', content: 'test' }
    ]
  }
  
  const testDir = path.join(process.cwd(), 'backups')
  fs.mkdir(testDir, { recursive: true }).then(() => {
    const testFile = path.join(testDir, 'sanity-backup-test.json')
    return fs.writeFile(testFile, JSON.stringify(testBackup, null, 2))
  }).then(() => {
    verifyBackups()
  })
} else {
  verifyBackups()
}