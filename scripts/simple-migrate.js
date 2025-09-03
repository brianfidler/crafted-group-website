#!/usr/bin/env node

const { createClient } = require('@sanity/client')
const readline = require('readline')

// Get environment variables
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function getSanityToken() {
  console.log('\n🔑 Sanity API Token Required')
  console.log('To get your token:')
  console.log('1. Go to https://www.sanity.io/manage')
  console.log('2. Select your project')
  console.log('3. Go to API → Tokens')
  console.log('4. Create a new token with "Editor" permissions')
  console.log('5. Copy the token\n')
  
  const token = await question('Enter your Sanity API token: ')
  return token.trim()
}

// We'll create the client after getting the token
let client

// Simple content data
const contentData = {
  homePage: {
    _type: 'homePage',
    _id: 'homePage',
    title: 'Home Page',
    heroHeadline: 'Elevate Your Growth with Fractional CMO Leadership',
    heroSubheading: 'Executive marketing strategy without the full-time cost.',
    heroDescription: 'Helping startups and growing businesses achieve sustainable, revenue-driven growth.',
    heroCallToAction: {
      title: 'Schedule a Free Strategy Call',
      buttonText: 'Schedule a Free Strategy Call',
      buttonLink: '/contact',
      style: 'primary'
    },
    stats: [
      { number: '3x', label: 'Leads Generated' },
      { number: '200%', label: 'Revenue Growth' },
      { number: '20+', label: 'Years Experience' }
    ],
    servicesTitle: 'Strategic Marketing Leadership',
    servicesDescription: 'From strategy development to team leadership, I help businesses achieve predictable, sustainable growth.',
    testimonialsTitle: 'Client Success Stories',
    finalCallToAction: {
      title: 'Ready to Transform Your Marketing?',
      description: "Let's discuss how fractional CMO leadership can accelerate your growth.",
      buttonText: 'Book Your Free Strategy Call',
      buttonLink: '/contact',
      style: 'primary'
    },
    seo: {
      metaTitle: 'Crafted Group - Fractional CMO Services',
      metaDescription: 'Executive marketing strategy without the full-time cost. Helping startups and growing businesses achieve sustainable, revenue-driven growth.'
    }
  },
  
  aboutPage: {
    _type: 'aboutPage',
    _id: 'aboutPage',
    title: 'About Page',
    pageTitle: 'About Brian Fidler',
    pageSubtitle: 'Fractional CMO & Marketing Strategist',
    personalStory: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'With over 20 years of expertise in digital marketing, web development, and creative strategy, I help startups and growing businesses achieve sustainable, revenue-driven growth.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'My journey began in Phoenix with Brian Fidler Interactive, where I crafted marketing-focused websites and digital campaigns for diverse clients. Over time, I\'ve led end-to-end marketing strategy and execution—from brand positioning and social media consulting to SEO, content marketing, and team leadership. This hands-on experience across industries like SaaS, e-commerce, and professional services uniquely equips me to step into leadership roles that deliver measurable, long-term results.'
          }
        ]
      }
    ],
    experienceTitle: 'Executive Marketing Leadership',
    experienceContent: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'As your Fractional CMO, I offer:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Strategy: Building high-impact marketing frameworks tailored to business goals'
          }
        ]
      },
      {
        _type: 'block',
        style: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Execution: Managing campaigns across digital, social, and email channels'
          }
        ]
      },
      {
        _type: 'block',
        style: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Leadership: Coaching internal teams and aligning marketing with sales'
          }
        ]
      },
      {
        _type: 'block',
        style: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Optimization: Data-driven performance tracking and KPI-based decision-making'
          }
        ]
      }
    ],
    expertiseTitle: 'Areas of Expertise',
    expertiseAreas: [
      {
        area: 'Digital Marketing Strategy',
        description: 'Comprehensive marketing frameworks for growth-stage companies'
      },
      {
        area: 'Team Leadership',
        description: 'Building and coaching high-performing marketing teams'
      },
      {
        area: 'Revenue Operations',
        description: 'Aligning marketing with sales for predictable growth'
      },
      {
        area: 'Brand Development',
        description: 'Strategic positioning and brand identity development'
      }
    ],
    philosophyTitle: 'My Philosophy',
    philosophy: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'My career has been driven by a passion for turning marketing uncertainty into predictable growth—and helping founders and executives regain focus on their core business. I believe in practical, action-oriented leadership that works.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'I\'m based in Phoenix, Arizona, and collaborate globally with businesses seeking executive marketing guidance without the full-time CMO investment.'
          }
        ]
      }
    ],
    locationInfo: 'Based in Phoenix, Arizona, serving clients globally',
    callToAction: {
      title: "Let's work together",
      buttonText: 'Schedule a Strategy Call',
      buttonLink: '/contact',
      style: 'primary'
    },
    seo: {
      metaTitle: 'About Brian Fidler - Fractional CMO',
      metaDescription: 'Learn about Brian Fidler\'s 20+ years of marketing expertise and how he helps businesses achieve sustainable growth through fractional CMO services.'
    }
  },
  
  siteSettings: {
    _type: 'siteSettings',
    _id: 'siteSettings',
    title: 'Crafted Group',
    description: 'Executive marketing strategy without the full-time cost. Helping startups and growing businesses achieve sustainable, revenue-driven growth.',
    contactInfo: {
      email: 'brian@crafted.group',
      phone: '+1 (602) 555-0123',
      address: 'Phoenix, Arizona',
      businessHours: 'Monday-Friday, 9 AM - 5 PM MST'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/in/brianfidler',
      twitter: 'https://twitter.com/brianfidler'
    },
    integrations: {
      calendlyUrl: 'https://calendly.com/brianfidler/strategy-call',
      activeCampaignFormId: 'your-form-id-here'
    },
    globalCtas: {
      primaryCta: {
        title: 'Schedule a Free Strategy Call',
        buttonText: 'Book Your Call',
        buttonLink: '/contact',
        style: 'primary'
      },
      secondaryCta: {
        title: 'Learn More About Our Services',
        buttonText: 'View Services',
        buttonLink: '/services',
        style: 'secondary'
      },
      exitIntentCta: {
        title: 'Want a Free Marketing Template?',
        description: 'Get our proven marketing strategy template before you go.',
        buttonText: 'Download Template',
        buttonLink: '/lead-magnet',
        style: 'outline'
      }
    },
    footer: {
      copyrightText: '© 2024 Crafted Group. All rights reserved.',
      additionalLinks: [
        { title: 'Privacy Policy', url: '/privacy' },
        { title: 'Terms of Service', url: '/terms' }
      ],
      newsletterSignup: {
        title: 'Join 500+ founders getting strategic growth tips',
        description: 'Weekly insights on marketing strategy and business growth.',
        placeholder: 'Enter your email',
        buttonText: 'Subscribe'
      }
    },
    seoDefaults: {
      defaultMetaTitle: 'Crafted Group - Fractional CMO Services',
      defaultMetaDescription: 'Executive marketing strategy without the full-time cost. Helping startups and growing businesses achieve sustainable, revenue-driven growth.',
      twitterHandle: '@brianfidler'
    }
  }
}

async function migrateContent() {
  try {
    console.log('🚀 Starting Content Migration for Crafted Group Website')
    console.log('=====================================================\n')
    
    if (!projectId) {
      console.log('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local')
      console.log('Please make sure your .env.local file contains your Sanity project ID')
      return
    }
    
    console.log(`📋 Project: ${projectId}`)
    console.log(`📋 Dataset: ${dataset}`)
    console.log(`📋 API Version: ${apiVersion}\n`)
    
    // Get the token
    const token = await getSanityToken()
    
    // Create client with token
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token,
    })
    
    console.log('\n📋 Migrating content...\n')
    
    // Migrate each content type
    for (const [key, content] of Object.entries(contentData)) {
      console.log(`📄 Migrating ${key}...`)
      
      try {
        // Use createOrReplace which handles both create and update
        await client.createOrReplace(content)
        console.log(`✅ Created/Updated ${key}`)
      } catch (error) {
        console.log(`❌ Failed to migrate ${key}: ${error.message}`)
        console.log(`   Error details: ${JSON.stringify(error, null, 2)}`)
      }
    }
    
    console.log('\n🎉 Content migration completed!')
    console.log('\nNext steps:')
    console.log('1. Visit http://localhost:3000/studio to view your content')
    console.log('2. Add the remaining pages (Services, Pricing, Case Studies, Contact)')
    console.log('3. Create testimonials and legal pages')
    console.log('4. Update contact information with your real details')
    console.log('5. Add your logo and images')
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('- Make sure your Sanity token is correct')
    console.log('- Check that your project ID and dataset are correct')
    console.log('- Ensure you have Editor permissions on your Sanity project')
  } finally {
    rl.close()
  }
}

migrateContent()
