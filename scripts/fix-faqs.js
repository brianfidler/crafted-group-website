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

async function fixFaqs() {
  try {
    console.log('🔧 Starting FAQ Data Fix')
    console.log('========================\n')
    
    // Fetch the pricing page
    const pricingPage = await client.fetch(`*[_type == "pricingPage"][0]`)
    
    if (!pricingPage) {
      console.log('❌ No pricing page found')
      return
    }
    
    console.log('📄 Found pricing page, checking FAQs...')
    
    // Check if FAQs exist and have the right structure
    if (pricingPage.faqs && Array.isArray(pricingPage.faqs)) {
      console.log(`Found ${pricingPage.faqs.length} FAQs`)
      
      // Ensure each FAQ has the correct structure
      const fixedFaqs = pricingPage.faqs.map((faq, index) => {
        if (typeof faq === 'string') {
          // If FAQ is just a string, convert it to proper structure
          console.log(`Converting FAQ ${index + 1} from string to object`)
          return {
            _key: `faq-${index}-${Date.now()}`,
            question: `FAQ ${index + 1}`,
            answer: faq
          }
        } else if (faq && typeof faq === 'object') {
          // Ensure it has the required fields
          return {
            _key: faq._key || `faq-${index}-${Date.now()}`,
            question: faq.question || `Question ${index + 1}`,
            answer: faq.answer || 'No answer provided'
          }
        }
        return faq
      })
      
      // Update the pricing page with fixed FAQs
      const updatedPage = {
        ...pricingPage,
        faqs: fixedFaqs
      }
      
      await client.createOrReplace(updatedPage)
      console.log('✅ Updated pricing page with fixed FAQs')
      
    } else {
      console.log('ℹ️  No FAQs found or FAQs are not in array format')
    }
    
    console.log('\n🎉 FAQ fixing completed!')
    
  } catch (error) {
    console.error('\n❌ FAQ fixing failed:', error.message)
  }
}

fixFaqs()
