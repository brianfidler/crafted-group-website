import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../sanity/env.js'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_TOKEN, // You'll need to add this to your .env.local
  useCdn: false,
})

// Home Page Content
const homePageData = {
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
    {
      number: '3x',
      label: 'Leads Generated'
    },
    {
      number: '200%',
      label: 'Revenue Growth'
    },
    {
      number: '20+',
      label: 'Years Experience'
    }
  ],
  servicesTitle: 'Strategic Marketing Leadership',
  servicesDescription: 'From strategy development to team leadership, I help businesses achieve predictable, sustainable growth.',
  testimonialsTitle: 'Client Success Stories',
  featuredTestimonials: [
    {
      _type: 'testimonial',
      quote: 'Brian transformed our marketing approach. We went from struggling with lead generation to having a predictable pipeline of qualified prospects.',
      author: 'Sarah Brown',
      company: 'TechStart',
      position: 'CEO',
      featured: true
    },
    {
      _type: 'testimonial',
      quote: 'The strategic framework Brian developed helped us scale from $500K to $2M ARR in 18 months. His expertise is invaluable.',
      author: 'Mike Johnson',
      company: 'GrowthCorp',
      position: 'Founder',
      featured: true
    },
    {
      _type: 'testimonial',
      quote: 'Working with Brian was like having a seasoned marketing executive on our team. His guidance elevated our entire marketing function.',
      author: 'Lisa Wang',
      company: 'InnovateNow',
      position: 'CMO',
      featured: true
    }
  ],
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
}

// About Page Content
const aboutPageData = {
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
}

// Services Page Content
const servicesPageData = {
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
          text: 'I provide comprehensive marketing leadership and strategy services designed to accelerate your business growth. Whether you need strategic guidance, team leadership, or hands-on execution, I adapt my approach to your specific needs and goals.'
        }
      ]
    }
  ],
  services: [
    {
      name: 'Fractional CMO Leadership',
      slug: { _type: 'slug', current: 'fractional-cmo-leadership' },
      shortDescription: 'Executive-level strategic guidance without the full-time investment',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Step into the role of your marketing leader, providing strategic direction, team management, and executive-level decision making on a part-time basis.'
            }
          ]
        }
      ],
      features: [
        'Strategic planning and roadmap development',
        'Team leadership and coaching',
        'Budget management and ROI optimization',
        'Stakeholder communication and reporting'
      ],
      featured: true
    },
    {
      name: 'Marketing Strategy & Execution',
      slug: { _type: 'slug', current: 'marketing-strategy-execution' },
      shortDescription: 'Data-driven frameworks tailored to business goals',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Develop comprehensive marketing strategies that align with your business objectives and execute campaigns across all relevant channels.'
            }
          ]
        }
      ],
      features: [
        'Market research and competitive analysis',
        'Channel strategy and campaign planning',
        'Content strategy and creation',
        'Performance tracking and optimization'
      ],
      featured: true
    },
    {
      name: 'Team Leadership & Coaching',
      slug: { _type: 'slug', current: 'team-leadership-coaching' },
      shortDescription: 'Coaching and aligning marketing teams with sales objectives',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Build and develop high-performing marketing teams while ensuring alignment with sales and overall business objectives.'
            }
          ]
        }
      ],
      features: [
        'Team building and recruitment',
        'Performance management and coaching',
        'Process optimization and workflow design',
        'Cross-functional collaboration'
      ],
      featured: true
    },
    {
      name: 'Funnel & Campaign Building',
      slug: { _type: 'slug', current: 'funnel-campaign-building' },
      shortDescription: 'High-converting campaigns across digital channels',
      fullDescription: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Design and implement high-converting marketing funnels and campaigns that drive qualified leads and revenue growth.'
            }
          ]
        }
      ],
      features: [
        'Lead generation funnel design',
        'Email marketing and automation',
        'Social media advertising',
        'Conversion rate optimization'
      ],
      featured: true
    }
  ],
  processTitle: 'How We Work Together',
  processSteps: [
    {
      stepNumber: 1,
      title: 'Discovery & Assessment',
      description: 'We start with a comprehensive analysis of your current marketing state, goals, and challenges.'
    },
    {
      stepNumber: 2,
      title: 'Strategy Development',
      description: 'Based on our findings, I develop a customized marketing strategy aligned with your business objectives.'
    },
    {
      stepNumber: 3,
      title: 'Implementation & Execution',
      description: 'We implement the strategy, whether through direct execution or coaching your existing team.'
    },
    {
      stepNumber: 4,
      title: 'Optimization & Growth',
      description: 'Continuous monitoring, analysis, and optimization to ensure sustainable growth and ROI.'
    }
  ],
  callToAction: {
    title: 'Ready to accelerate your growth?',
    description: 'Let\'s discuss how fractional CMO leadership can transform your marketing.',
    buttonText: 'Book a Strategy Session',
    buttonLink: '/contact',
    style: 'primary'
  },
  seo: {
    metaTitle: 'Fractional CMO Services - Strategic Marketing Leadership',
    metaDescription: 'Executive marketing leadership and strategy services. From fractional CMO to team coaching, accelerate your business growth with proven frameworks.'
  }
}

// Pricing Page Content
const pricingPageData = {
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
          text: 'Fractional CMO services provide executive-level marketing leadership at a fraction of the cost of a full-time CMO. Choose the engagement model that best fits your current needs and growth stage.'
        }
      ]
    }
  ],
  pricingTiers: [
    {
      name: 'Starter',
      price: '$2,500',
      period: 'per month',
      description: 'Perfect for early-stage companies building their marketing foundation',
      features: [
        'Strategic planning and roadmap',
        'Monthly strategy sessions',
        'Email support',
        'Basic reporting and analytics'
      ],
      highlighted: false,
      ctaText: 'Get Started',
      ctaLink: '/contact'
    },
    {
      name: 'Growth',
      price: '$5,000',
      period: 'per month',
      description: 'Ideal for growing companies ready to scale their marketing efforts',
      features: [
        'Everything in Starter, plus:',
        'Weekly strategy calls',
        'Team coaching and leadership',
        'Campaign execution support',
        'Advanced analytics and reporting',
        'Priority support'
      ],
      highlighted: true,
      ctaText: 'Most Popular',
      ctaLink: '/contact'
    },
    {
      name: 'Enterprise',
      price: '$8,000',
      period: 'per month',
      description: 'Comprehensive marketing leadership for established companies',
      features: [
        'Everything in Growth, plus:',
        'Full-time availability',
        'Team building and recruitment',
        'Budget management',
        'Stakeholder reporting',
        'Custom strategy development'
      ],
      highlighted: false,
      ctaText: 'Contact Us',
      ctaLink: '/contact'
    }
  ],
  valueTitle: 'Why Fractional CMO?',
  valueContent: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'A full-time CMO typically costs $150,000-$300,000 annually, plus benefits and equity. Fractional CMO services provide the same strategic value at 20-40% of the cost, with the flexibility to scale up or down based on your needs.'
        }
      ]
    }
  ],
  faqs: [
    {
      question: 'How quickly can we see results?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Most clients see measurable improvements within 30-60 days, with significant growth typically achieved within 3-6 months.'
            }
          ]
        }
      ]
    },
    {
      question: 'What if we need to scale up or down?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Our flexible engagement models allow you to adjust your level of support as your business needs change.'
            }
          ]
        }
      ]
    },
    {
      question: 'Do you work with companies outside your industry?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Yes, I have experience across multiple industries including SaaS, e-commerce, professional services, and more.'
            }
          ]
        }
      ]
    }
  ],
  callToAction: {
    title: 'Ready to get started?',
    description: 'Schedule a free strategy call to discuss your needs and find the right engagement model.',
    buttonText: 'Get Started Today',
    buttonLink: '/contact',
    style: 'primary'
  },
  seo: {
    metaTitle: 'Fractional CMO Pricing - Transparent Pricing Plans',
    metaDescription: 'Flexible fractional CMO pricing plans starting at $2,500/month. Executive marketing leadership without the full-time cost. Schedule a free strategy call.'
  }
}

// Case Studies Page Content
const caseStudiesPageData = {
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
          text: 'These case studies demonstrate the transformative impact of strategic marketing leadership. Each story represents a unique challenge, tailored solution, and measurable results.'
        }
      ]
    }
  ],
  caseStudies: [
    {
      title: 'TechStart: From 0 to 500 Qualified Leads',
      slug: { _type: 'slug', current: 'techstart-lead-generation' },
      client: 'TechStart',
      industry: 'SaaS',
      challenge: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'TechStart had a great product but struggled with lead generation. They were spending heavily on ads with minimal results and had no predictable pipeline.'
            }
          ]
        }
      ],
      solution: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Implemented a comprehensive inbound marketing strategy with content marketing, SEO optimization, and lead nurturing campaigns.'
            }
          ]
        }
      ],
      results: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Generated 500+ qualified leads in 6 months, increased conversion rates by 300%, and reduced customer acquisition cost by 60%.'
            }
          ]
        }
      ],
      beforeStats: [
        { number: '0', label: 'Qualified Leads/Month' },
        { number: '2%', label: 'Conversion Rate' },
        { number: '$500', label: 'Customer Acquisition Cost' }
      ],
      afterStats: [
        { number: '500+', label: 'Qualified Leads/Month' },
        { number: '6%', label: 'Conversion Rate' },
        { number: '$200', label: 'Customer Acquisition Cost' }
      ],
      featured: true,
      tags: ['Lead Generation', 'SaaS', 'Content Marketing']
    },
    {
      title: 'GrowthCorp: $500K to $2M ARR in 18 Months',
      slug: { _type: 'slug', current: 'growthcorp-revenue-scaling' },
      client: 'GrowthCorp',
      industry: 'E-commerce',
      challenge: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'GrowthCorp had plateaued at $500K ARR and needed a strategic approach to scale their marketing and sales efforts.'
            }
          ]
        }
      ],
      solution: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Developed a comprehensive growth strategy including market expansion, customer segmentation, and sales-marketing alignment.'
            }
          ]
        }
      ],
      results: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Achieved $2M ARR in 18 months through strategic market expansion and optimized customer acquisition channels.'
            }
          ]
        }
      ],
      beforeStats: [
        { number: '$500K', label: 'Annual Recurring Revenue' },
        { number: '3', label: 'Marketing Channels' },
        { number: '15%', label: 'Customer Retention Rate' }
      ],
      afterStats: [
        { number: '$2M', label: 'Annual Recurring Revenue' },
        { number: '8', label: 'Marketing Channels' },
        { number: '85%', label: 'Customer Retention Rate' }
      ],
      featured: true,
      tags: ['Revenue Growth', 'E-commerce', 'Market Expansion']
    }
  ],
  successMetrics: {
    title: 'Overall Impact',
    stats: [
      { number: '300%', label: 'Average Lead Increase' },
      { number: '200%', label: 'Average Revenue Growth' },
      { number: '60%', label: 'Average Cost Reduction' },
      { number: '18', label: 'Average Months to Results' }
    ]
  },
  processOverview: {
    title: 'Our Proven Process',
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Every successful transformation follows our systematic approach: assessment, strategy development, implementation, and continuous optimization.'
          }
        ]
      }
    ]
  },
  callToAction: {
    title: 'Get Results Like These',
    description: 'Ready to transform your marketing and achieve similar results?',
    buttonText: 'Get a Strategy Like This',
    buttonLink: '/contact',
    style: 'primary'
  },
  seo: {
    metaTitle: 'Client Success Stories - Fractional CMO Case Studies',
    metaDescription: 'Real case studies showing how fractional CMO leadership drives results. See how we helped clients achieve 300% lead increases and 200% revenue growth.'
  }
}

// Contact Page Content
const contactPageData = {
  _type: 'contactPage',
  _id: 'contactPage',
  title: 'Contact Page',
  pageTitle: 'Let\'s Start a Conversation',
  pageSubtitle: 'Ready to transform your marketing?',
  introduction: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Whether you\'re looking to scale your marketing efforts, build a high-performing team, or develop a comprehensive growth strategy, I\'m here to help.'
        }
      ]
    }
  ],
  contactMethods: {
    email: 'brian@crafted.group',
    phone: '+1 (602) 555-0123',
    location: 'Phoenix, Arizona',
    linkedin: 'https://linkedin.com/in/brianfidler',
    twitter: 'https://twitter.com/brianfidler'
  },
  formSettings: {
    formTitle: 'Schedule Your Free Strategy Call',
    formDescription: 'Tell me about your business and marketing challenges. I\'ll get back to you within 24 hours.',
    submitButtonText: 'Send Message',
    successMessage: 'Thank you! I\'ll get back to you within 24 hours to schedule our strategy call.'
  },
  calendlySettings: {
    calendlyUrl: 'https://calendly.com/brianfidler/strategy-call',
    calendlyTitle: 'Book Your Free Strategy Call',
    calendlyDescription: 'Schedule a 30-minute call to discuss your marketing challenges and explore how fractional CMO leadership can accelerate your growth.'
  },
  responseInfo: {
    responseTime: 'Within 24 hours',
    availability: 'Monday-Friday, 9 AM - 5 PM MST',
    timezone: 'Mountain Standard Time (MST)'
  },
  faqs: [
    {
      question: 'What happens during the initial strategy call?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We\'ll discuss your current marketing challenges, business goals, and explore how fractional CMO services can help you achieve sustainable growth.'
            }
          ]
        }
      ]
    },
    {
      question: 'How quickly can we get started?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Most engagements begin within 1-2 weeks of our initial strategy call, depending on your timeline and requirements.'
            }
          ]
        }
      ]
    },
    {
      question: 'Do you work with companies outside Arizona?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Absolutely! I work with clients globally through video calls and digital collaboration tools.'
            }
          ]
        }
      ]
    }
  ],
  seo: {
    metaTitle: 'Contact Brian Fidler - Fractional CMO',
    metaDescription: 'Ready to transform your marketing? Schedule a free strategy call with Brian Fidler to discuss how fractional CMO leadership can accelerate your growth.'
  }
}

// Site Settings
const siteSettingsData = {
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

// Legal Pages
const legalPagesData = [
  {
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy' },
    pageType: 'privacy',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'This Privacy Policy describes how Crafted Group ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website or use our services.'
          }
        ]
      }
    ],
    lastUpdated: '2024-01-01',
    effectiveDate: '2024-01-01',
    seo: {
      metaTitle: 'Privacy Policy - Crafted Group',
      metaDescription: 'Learn how Crafted Group protects your privacy and handles your personal information.',
      noIndex: true
    }
  },
  {
    _type: 'legalPage',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms' },
    pageType: 'terms',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'These Terms of Service ("Terms") govern your use of the Crafted Group website and services. By accessing or using our services, you agree to be bound by these Terms.'
          }
        ]
      }
    ],
    lastUpdated: '2024-01-01',
    effectiveDate: '2024-01-01',
    seo: {
      metaTitle: 'Terms of Service - Crafted Group',
      metaDescription: 'Read the terms and conditions for using Crafted Group services.',
      noIndex: true
    }
  }
]

async function migrateContent() {
  try {
    console.log('Starting content migration...')
    
    // Create or update all content
    const contentToMigrate = [
      homePageData,
      aboutPageData,
      servicesPageData,
      pricingPageData,
      caseStudiesPageData,
      contactPageData,
      siteSettingsData,
      ...legalPagesData
    ]
    
    for (const content of contentToMigrate) {
      console.log(`Migrating ${content._type}...`)
      
      // Check if document exists
      const existing = await client.getDocument(content._id).catch(() => null)
      
      if (existing) {
        // Update existing document
        await client.createOrReplace(content)
        console.log(`Updated ${content._type}`)
      } else {
        // Create new document
        await client.create(content)
        console.log(`Created ${content._type}`)
      }
    }
    
    console.log('Content migration completed successfully!')
    console.log('\nNext steps:')
    console.log('1. Visit http://localhost:3000/studio to view and edit your content')
    console.log('2. Update your pages to fetch content from Sanity')
    console.log('3. Add your actual contact information and social media links')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateContent()
