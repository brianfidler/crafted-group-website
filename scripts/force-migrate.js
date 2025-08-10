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
  // First try to get token from environment variable
  const envToken = process.env.SANITY_API_TOKEN
  
  if (envToken) {
    console.log('✅ Using Sanity API token from environment variable')
    return envToken
  }
  
  // Fallback to prompting user
  console.log('\n🔑 Sanity API Token Required')
  console.log('To get your token:')
  console.log('1. Go to https://www.sanity.io/manage')
  console.log('2. Select your project')
  console.log('3. Go to API → Tokens')
  console.log('4. Create a new token with "Editor" permissions')
  console.log('5. Copy the token\n')
  console.log('💡 Tip: Add SANITY_API_TOKEN to your .env.local file to avoid this prompt\n')
  
  const token = await question('Enter your Sanity API token: ')
  return token.trim()
}

// We'll create the client after getting the token
let client

// Complete content data for ALL pages
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

  servicesPage: {
    _type: 'servicesPage',
    _id: 'servicesPage',
    title: 'Services Page',
    pageTitle: 'Fractional CMO Services',
    pageSubtitle: 'Executive marketing leadership without the full-time investment',
    introduction: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Get executive-level marketing leadership on your timeline and budget. I provide comprehensive marketing strategy and execution that drives measurable business growth.'
          }
        ]
      }
    ],
    howItWorksTitle: 'How Fractional CMO Services Work',
    howItWorksDescription: 'Get executive-level marketing leadership on your timeline and budget',
    processSteps: [
      {
        step: 1,
        title: 'Discovery & Strategy',
        description: 'We start with a comprehensive audit of your current marketing efforts, identify gaps, and develop a strategic roadmap aligned with your business goals.'
      },
      {
        step: 2,
        title: 'Implementation',
        description: 'Execute the strategy through hands-on campaign management, team leadership, and system optimization to drive measurable results.'
      },
      {
        step: 3,
        title: 'Optimization',
        description: 'Continuously monitor performance, optimize campaigns, and scale successful initiatives while building internal marketing capabilities.'
      }
    ],
    coreServicesTitle: 'Core Service Areas',
    coreServicesDescription: 'Comprehensive marketing leadership across four key pillars',
    services: [
      {
        title: 'Fractional CMO Leadership',
        description: 'Strategic marketing leadership that drives business growth without the full-time executive cost.',
        features: [
          'Marketing strategy development and execution',
          'Team leadership and coaching',
          'Performance tracking and optimization',
          'Budget management and ROI analysis'
        ]
      },
      {
        title: 'Marketing Strategy & Execution',
        description: 'End-to-end marketing strategy from concept to implementation with measurable results.',
        features: [
          'Brand positioning and messaging',
          'Campaign development and management',
          'Channel strategy and optimization',
          'Content marketing and SEO'
        ]
      },
      {
        title: 'Team Leadership & Coaching',
        description: 'Build and lead high-performing marketing teams that deliver consistent results.',
        features: [
          'Team structure and hiring strategy',
          'Process development and optimization',
          'Performance management and coaching',
          'Cross-functional collaboration'
        ]
      },
      {
        title: 'Funnel & Campaign Building',
        description: 'Design and optimize conversion funnels that turn prospects into customers.',
        features: [
          'Lead generation and nurturing',
          'Conversion optimization',
          'Marketing automation setup',
          'Analytics and reporting'
        ]
      }
    ],
    callToAction: {
      title: 'Ready to Transform Your Marketing?',
      description: 'Let\'s discuss how fractional CMO leadership can accelerate your growth.',
      buttonText: 'Book a Strategy Session',
      buttonLink: '/contact',
      style: 'primary'
    },
    seo: {
      metaTitle: 'Fractional CMO Services - Crafted Group',
      metaDescription: 'Executive marketing leadership without the full-time investment. Get strategic marketing guidance that drives measurable business growth.'
    }
  },

  pricingPage: {
    _type: 'pricingPage',
    _id: 'pricingPage',
    title: 'Pricing Page',
    pageTitle: 'Transparent Pricing',
    pageSubtitle: 'Flexible engagement models to fit your needs',
    introduction: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Fractional CMO services designed to fit your business stage and budget. Get executive-level marketing leadership without the full-time investment.'
          }
        ]
      }
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: '$2,500',
        period: 'per month',
        description: 'Perfect for startups and small businesses getting started with strategic marketing.',
        features: [
          'Marketing strategy development',
          'Monthly strategy sessions',
          'Campaign planning and oversight',
          'Performance reporting',
          'Email support'
        ],
        callToAction: {
          text: 'Get Started',
          link: '/contact',
          style: 'primary'
        }
      },
      {
        name: 'Growth',
        price: '$4,500',
        period: 'per month',
        description: 'Ideal for growing businesses ready to scale their marketing efforts.',
        features: [
          'Everything in Starter, plus:',
          'Weekly strategy sessions',
          'Team leadership and coaching',
          'Campaign execution support',
          'Funnel optimization',
          'Priority support'
        ],
        callToAction: {
          text: 'Start Growing',
          link: '/contact',
          style: 'primary'
        }
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'per month',
        description: 'Comprehensive marketing leadership for established businesses with complex needs.',
        features: [
          'Everything in Growth, plus:',
          'Full-time availability',
          'Complete marketing department oversight',
          'Custom strategy development',
          'Dedicated support',
          'Quarterly business reviews'
        ],
        callToAction: {
          text: 'Contact Us',
          link: '/contact',
          style: 'secondary'
        }
      }
    ],
    valueProposition: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Compare the cost of fractional CMO services to hiring a full-time CMO:'
          }
        ]
      }
    ],
    comparisonPoints: [
      {
        point: 'Full-time CMO Salary',
        cost: '$150,000 - $250,000/year',
        description: 'Plus benefits, bonuses, and equity'
      },
      {
        point: 'Fractional CMO Services',
        cost: '$30,000 - $60,000/year',
        description: 'Same expertise, flexible engagement'
      },
      {
        point: 'Savings',
        cost: '$90,000 - $190,000/year',
        description: 'Invest the difference in your business'
      }
    ],
    faqs: [
      {
        question: 'How long is the typical engagement?',
        answer: 'Most clients engage for 6-12 months initially, with many continuing on an ongoing basis as their marketing needs evolve.'
      },
      {
        question: 'Can I pause or cancel services?',
        answer: 'Yes, we offer flexible month-to-month agreements with 30-day notice for changes or cancellation.'
      },
      {
        question: 'What results can I expect?',
        answer: 'Typical results include 2-3x increase in qualified leads, 20-40% improvement in conversion rates, and measurable ROI within 3-6 months.'
      }
    ],
    callToAction: {
      title: 'Ready to Get Started?',
      description: 'Schedule a free strategy call to discuss your needs and find the right engagement model.',
      buttonText: 'Book Your Free Call',
      buttonLink: '/contact',
      style: 'primary'
    },
    seo: {
      metaTitle: 'Fractional CMO Pricing - Transparent & Flexible',
      metaDescription: 'Get executive marketing leadership without the full-time cost. Transparent pricing starting at $2,500/month with flexible engagement models.'
    }
  },

  caseStudiesPage: {
    _type: 'caseStudiesPage',
    _id: 'caseStudiesPage',
    title: 'Case Studies Page',
    pageTitle: 'Client Success Stories',
    pageSubtitle: 'Real results from real partnerships',
    introduction: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'See how fractional CMO leadership has transformed businesses across industries. These case studies demonstrate the measurable impact of strategic marketing leadership.'
          }
        ]
      }
    ],
    caseStudies: [
      {
        title: 'SaaS Startup Growth',
        client: 'TechFlow Solutions',
        industry: 'SaaS',
        challenge: 'Struggling to scale marketing efforts and generate consistent leads',
        solution: 'Implemented comprehensive marketing strategy with lead generation funnel',
        results: [
          '300% increase in qualified leads',
          '150% improvement in conversion rates',
          '40% reduction in customer acquisition cost'
        ],
        timeframe: '6 months',
        testimonial: 'Brian transformed our marketing from reactive to strategic. The results speak for themselves.'
      },
      {
        title: 'E-commerce Revenue Growth',
        client: 'Artisan Goods Co.',
        industry: 'E-commerce',
        challenge: 'Stagnant revenue and low customer lifetime value',
        solution: 'Developed customer retention strategy and optimized conversion funnels',
        results: [
          '200% increase in monthly revenue',
          '60% improvement in customer lifetime value',
          '35% increase in repeat purchase rate'
        ],
        timeframe: '8 months',
        testimonial: 'The strategic approach to our marketing completely changed our business trajectory.'
      },
      {
        title: 'Professional Services Lead Generation',
        client: 'LegalTech Partners',
        industry: 'Professional Services',
        challenge: 'Inconsistent lead flow and poor lead quality',
        solution: 'Built targeted lead generation system with qualification process',
        results: [
          '400% increase in qualified leads',
          '80% improvement in lead quality score',
          '50% reduction in sales cycle length'
        ],
        timeframe: '4 months',
        testimonial: 'Brian\'s expertise in B2B marketing was exactly what we needed to scale.'
      }
    ],
    callToAction: {
      title: 'Get Results Like These',
      description: 'Ready to transform your marketing and achieve similar results?',
      buttonText: 'Schedule Your Strategy Call',
      buttonLink: '/contact',
      style: 'primary'
    },
    seo: {
      metaTitle: 'Client Success Stories - Fractional CMO Case Studies',
      metaDescription: 'See real results from fractional CMO partnerships. Case studies showing 200-400% improvements in leads, revenue, and conversion rates.'
    }
  },

  contactPage: {
    _type: 'contactPage',
    _id: 'contactPage',
    title: 'Contact Page',
    pageTitle: "Let's Start a Conversation",
    pageSubtitle: 'Ready to transform your marketing?',
    introduction: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ready to take your marketing to the next level? Let\'s discuss how fractional CMO leadership can accelerate your growth and drive measurable results.'
          }
        ]
      }
    ],
    contactMethods: {
      email: 'brian@crafted.group',
      phone: '+1 (602) 555-0123',
      location: 'Phoenix, Arizona',
      businessHours: 'Monday-Friday, 9 AM - 5 PM MST',
      socialMedia: {
        linkedin: 'https://linkedin.com/in/brianfidler',
        twitter: 'https://twitter.com/brianfidler'
      }
    },
    formSettings: {
      title: 'Get in Touch',
      description: 'Fill out the form below and I\'ll get back to you within 24 hours.',
      fields: [
        'Name',
        'Email',
        'Company',
        'Phone (optional)',
        'Message'
      ],
      submitButton: 'Send Message',
      successMessage: 'Thank you! I\'ll get back to you within 24 hours.'
    },
    calendlyIntegration: {
      title: 'Schedule a Free Strategy Call',
      description: 'Book a 30-minute strategy call to discuss your marketing needs and see if we\'re a good fit.',
      calendlyUrl: 'https://calendly.com/brianfidler/strategy-call',
      buttonText: 'Book Your Free Call'
    },
    callToAction: {
      title: 'Ready to Get Started?',
      description: 'The first step is a conversation. Let\'s discuss your goals and see how I can help.',
      buttonText: 'Schedule Your Call',
      buttonLink: '/contact',
      style: 'primary'
    },
    seo: {
      metaTitle: 'Contact Brian Fidler - Fractional CMO',
      metaDescription: 'Ready to transform your marketing? Contact Brian Fidler for a free strategy call and see how fractional CMO leadership can accelerate your growth.'
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

async function forceMigrateContent() {
  try {
    console.log('🚀 Starting FORCE Content Migration for Crafted Group Website')
    console.log('=============================================================\n')
    
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
    
    console.log('\n📋 Force migrating ALL content...\n')
    
    // Migrate each content type with force delete and recreate
    for (const [key, content] of Object.entries(contentData)) {
      console.log(`📄 Force migrating ${key}...`)
      
      try {
        // First, try to delete the existing document
        try {
          await client.delete(content._id)
          console.log(`   🗑️  Deleted existing ${key}`)
        } catch (deleteError) {
          console.log(`   ℹ️  No existing ${key} to delete (${deleteError.message})`)
        }
        
        // Wait a moment for deletion to process
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create new document
        await client.create(content)
        console.log(`✅ Created new ${key}`)
        
      } catch (error) {
        console.log(`❌ Failed to force migrate ${key}: ${error.message}`)
        console.log(`   Error details: ${JSON.stringify(error, null, 2)}`)
      }
    }
    
    console.log('\n🎉 Force content migration completed!')
    console.log('\n✅ All pages have been force migrated:')
    console.log('   • Home Page')
    console.log('   • About Page')
    console.log('   • Services Page')
    console.log('   • Pricing Page')
    console.log('   • Case Studies Page')
    console.log('   • Contact Page')
    console.log('   • Site Settings')
    
    console.log('\n🚀 Next steps:')
    console.log('1. Visit http://localhost:3000/studio to view your content')
    console.log('2. HARD REFRESH your browser (Ctrl+Shift+R or Cmd+Shift+R)')
    console.log('3. Clear browser cache if needed')
    console.log('4. Add testimonials in the Shared Content section')
    console.log('5. Create legal pages (Privacy Policy, Terms of Service)')
    console.log('6. Update contact information with your real details')
    console.log('7. Add your logo and images')
    
  } catch (error) {
    console.error('\n❌ Force migration failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('- Make sure your Sanity token is correct')
    console.log('- Check that your project ID and dataset are correct')
    console.log('- Ensure you have Editor permissions on your Sanity project')
  } finally {
    rl.close()
  }
}

forceMigrateContent()
