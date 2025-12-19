#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

const validationResults = {
  schemas: [],
  documents: [],
  relationships: [],
  errors: [],
  warnings: []
}

async function validateSchemas() {
  console.log('🔍 Schema Validation Tool')
  console.log('=========================\n')
  
  if (!projectId) {
    console.log('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found')
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
    // 1. Load schema definitions
    console.log('📋 Loading schema definitions...')
    const schemaPath = path.join(process.cwd(), 'sanity', 'schemaTypes')
    const schemaFiles = []
    
    function loadSchemas(dir) {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
          loadSchemas(filePath)
        } else if (file.endsWith('.ts') || file.endsWith('.js')) {
          schemaFiles.push(filePath)
        }
      })
    }
    
    loadSchemas(schemaPath)
    console.log(`   Found ${schemaFiles.length} schema files\n`)
    
    // 2. Extract schema types from files
    const schemaTypes = new Set()
    const requiredFields = new Map()
    
    schemaFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8')
      
      // Extract type definitions
      const typeMatch = content.match(/_type:\s*['"]([^'"]+)['"]/g)
      if (typeMatch) {
        typeMatch.forEach(match => {
          const type = match.match(/['"]([^'"]+)['"]/)[1]
          schemaTypes.add(type)
        })
      }
      
      // Extract required fields
      const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/g)
      if (nameMatch) {
        nameMatch.forEach(match => {
          const name = match.match(/['"]([^'"]+)['"]/)[1]
          
          // Look for validation rules
          if (content.includes(`name: '${name}'`) || content.includes(`name: "${name}"`)) {
            const isRequired = content.includes('Rule.required()') || content.includes('.required()')
            if (isRequired) {
              const typeContext = content.substring(0, content.indexOf(name)).lastIndexOf('_type:')
              if (typeContext > -1) {
                const typeEnd = content.indexOf('\n', typeContext)
                const typeLine = content.substring(typeContext, typeEnd)
                const typeMatch = typeLine.match(/['"]([^'"]+)['"]/)[1]
                
                if (!requiredFields.has(typeMatch)) {
                  requiredFields.set(typeMatch, [])
                }
                requiredFields.get(typeMatch).push(name)
              }
            }
          }
        })
      }
    })
    
    console.log(`📝 Schema Types Found: ${schemaTypes.size}`)
    schemaTypes.forEach(type => {
      console.log(`   - ${type}`)
      validationResults.schemas.push(type)
    })
    
    // 3. Validate documents in database
    console.log('\n🔍 Validating documents in database...')
    
    for (const schemaType of schemaTypes) {
      const docs = await client.fetch(`*[_type == "${schemaType}"]`)
      console.log(`\n   ${schemaType}: ${docs.length} document(s)`)
      
      if (docs.length === 0) {
        validationResults.warnings.push(`No documents found for type: ${schemaType}`)
      }
      
      // Validate required fields
      const required = requiredFields.get(schemaType) || []
      
      docs.forEach(doc => {
        validationResults.documents.push({
          type: schemaType,
          id: doc._id,
          valid: true
        })
        
        // Check required fields
        required.forEach(field => {
          if (!doc[field]) {
            validationResults.errors.push(
              `Missing required field '${field}' in ${schemaType} document: ${doc._id}`
            )
            validationResults.documents[validationResults.documents.length - 1].valid = false
          }
        })
        
        // Check for common issues
        if (doc._type !== schemaType) {
          validationResults.errors.push(
            `Type mismatch in document ${doc._id}: expected ${schemaType}, got ${doc._type}`
          )
        }
        
        // Check for duplicate keys in arrays
        Object.keys(doc).forEach(key => {
          if (Array.isArray(doc[key])) {
            const keys = doc[key].filter(item => item._key).map(item => item._key)
            const uniqueKeys = new Set(keys)
            if (keys.length !== uniqueKeys.size) {
              validationResults.warnings.push(
                `Duplicate _key values in ${schemaType}.${key} (document: ${doc._id})`
              )
            }
          }
        })
      })
    }
    
    // 4. Validate relationships
    console.log('\n🔗 Validating relationships...')
    
    // Check post -> author relationships
    const posts = await client.fetch(`*[_type == "post"]{
      _id,
      title,
      "author": author->_id,
      "categories": categories[]->_id
    }`)
    
    const authors = await client.fetch(`*[_type == "author"]{_id}`)
    const authorIds = new Set(authors.map(a => a._id))
    
    const categories = await client.fetch(`*[_type == "category"]{_id}`)
    const categoryIds = new Set(categories.map(c => c._id))
    
    posts.forEach(post => {
      if (post.author && !authorIds.has(post.author)) {
        validationResults.errors.push(
          `Broken reference: Post "${post.title}" references non-existent author ${post.author}`
        )
      }
      
      if (post.categories) {
        post.categories.forEach(catId => {
          if (!categoryIds.has(catId)) {
            validationResults.errors.push(
              `Broken reference: Post "${post.title}" references non-existent category ${catId}`
            )
          }
        })
      }
    })
    
    // 5. Check for orphaned documents
    console.log('\n🗑️  Checking for orphaned documents...')
    
    // Check for authors with no posts
    for (const author of authors) {
      const postCount = await client.fetch(
        `count(*[_type == "post" && references($authorId)])`,
        { authorId: author._id }
      )
      if (postCount === 0) {
        validationResults.warnings.push(
          `Orphaned author: ${author._id} has no associated posts`
        )
      }
    }
    
    // 6. Validate singleton documents
    console.log('\n📄 Validating singleton pages...')
    
    const singletons = ['homePage', 'aboutPage', 'servicesPage', 'contactPage', 'blogPage']
    
    for (const singleton of singletons) {
      const count = await client.fetch(`count(*[_type == "${singleton}"])`)
      if (count === 0) {
        validationResults.errors.push(`Missing singleton document: ${singleton}`)
      } else if (count > 1) {
        validationResults.errors.push(
          `Multiple instances of singleton: ${singleton} (found ${count})`
        )
      } else {
        console.log(`   ✅ ${singleton}`)
      }
    }
    
    // Print summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 Validation Summary')
    console.log('=' .repeat(50) + '\n')
    
    console.log(`Schemas validated: ${validationResults.schemas.length}`)
    console.log(`Documents checked: ${validationResults.documents.length}`)
    console.log(`❌ Errors: ${validationResults.errors.length}`)
    console.log(`⚠️  Warnings: ${validationResults.warnings.length}`)
    
    if (validationResults.errors.length > 0) {
      console.log('\n❌ Errors found:')
      validationResults.errors.forEach(error => {
        console.log(`   - ${error}`)
      })
    }
    
    if (validationResults.warnings.length > 0) {
      console.log('\n⚠️  Warnings:')
      validationResults.warnings.forEach(warning => {
        console.log(`   - ${warning}`)
      })
    }
    
    // Recommendations
    if (validationResults.errors.length > 0 || validationResults.warnings.length > 0) {
      console.log('\n📝 Recommendations:')
      if (validationResults.errors.length > 0) {
        console.log('   1. Run "npm run fix:all" to fix common issues')
        console.log('   2. Check Sanity Studio for broken references')
        console.log('   3. Ensure all required fields are populated')
      }
      if (validationResults.warnings.length > 0) {
        console.log('   - Review orphaned documents and remove if unnecessary')
        console.log('   - Consider running "npm run migrate:content" for missing content')
      }
    }
    
    // Exit code
    if (validationResults.errors.length > 0) {
      console.log('\n❌ Schema validation failed!')
      process.exit(1)
    } else if (validationResults.warnings.length > 0) {
      console.log('\n⚠️  Schema validation passed with warnings')
      process.exit(0)
    } else {
      console.log('\n✅ All schemas validated successfully!')
      process.exit(0)
    }
    
  } catch (error) {
    console.error('❌ Validation error:', error.message)
    process.exit(1)
  }
}

validateSchemas()