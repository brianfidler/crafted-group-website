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

async function createBlogPost() {
  try {
    console.log('📝 Creating Blog Post with Lorem Ipsum Content')
    console.log('==============================================\n')
    
    // First, get the About page to extract the hero image
    const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]`)
    
    if (!aboutPage || !aboutPage.heroImage) {
      console.log('❌ No hero image found on About page')
      console.log('Please add a hero image to your About page first')
      return
    }
    
    console.log('✅ Found hero image from About page')
    
    // Create a sample author first
    const authorDoc = {
      _type: 'author',
      _id: 'author-brian-fidler',
      name: 'Brian Fidler',
      slug: {
        _type: 'slug',
        current: 'brian-fidler'
      },
      bio: 'Fractional CMO and Marketing Strategist with over 20 years of experience helping businesses achieve predictable, sustainable growth.',
      image: aboutPage.heroImage // Use the same image as About page hero
    }
    
    // Create or replace the author
    await client.createOrReplace(authorDoc)
    console.log('✅ Created/Updated author: Brian Fidler')
    
    // Create a sample category
    const categoryDoc = {
      _type: 'category',
      _id: 'category-marketing-strategy',
      title: 'Marketing Strategy',
      slug: {
        _type: 'slug',
        current: 'marketing-strategy'
      },
      description: 'Strategic insights and frameworks for modern marketing leadership',
      color: '#3B82F6'
    }
    
    // Create or replace the category
    await client.createOrReplace(categoryDoc)
    console.log('✅ Created/Updated category: Marketing Strategy')
    
    // Create the blog post
    const blogPost = {
      _type: 'post',
      _id: 'post-fractional-cmo-guide',
      title: 'The Complete Guide to Fractional CMO Services: What Every Business Leader Needs to Know',
      slug: {
        _type: 'slug',
        current: 'complete-guide-fractional-cmo-services'
      },
      publishedAt: new Date().toISOString(),
      excerpt: 'Discover how fractional CMO services can transform your marketing strategy without the full-time investment. Learn the benefits, implementation process, and what to expect from this innovative leadership model.',
      mainImage: aboutPage.heroImage, // Use the same image as About page hero
      author: {
        _type: 'reference',
        _ref: 'author-brian-fidler'
      },
      categories: [
        {
          _type: 'reference',
          _ref: 'category-marketing-strategy'
        }
      ],
      featured: true,
      readingTime: '8 min read',
      tags: ['fractional-cmo', 'marketing-strategy', 'leadership', 'growth'],
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Introduction: The Rise of Fractional Leadership'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'What is a Fractional CMO?'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A fractional CMO (Chief Marketing Officer) provides executive-level marketing leadership on a part-time or project basis. This model allows businesses to access senior marketing expertise without the full-time salary commitment, making it an ideal solution for growing companies that need strategic guidance but aren\'t ready for a full-time executive hire.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Key Benefits of Fractional CMO Services'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The fractional CMO model offers several compelling advantages for businesses of all sizes:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Cost-effective access to executive-level expertise'
            }
          ]
        },
        {
          _type: 'block',
          style: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Flexible engagement models that scale with your needs'
            }
          ]
        },
        {
          _type: 'block',
          style: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Fresh perspective and industry best practices'
            }
          ]
        },
        {
          _type: 'block',
          style: 'bullet',
          children: [
            {
              _type: 'span',
              text: 'Strategic planning and execution without the overhead'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'When to Consider a Fractional CMO'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Implementation Process'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The successful implementation of fractional CMO services typically follows a structured approach:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'number',
          children: [
            {
              _type: 'span',
              text: 'Initial assessment and strategy development'
            }
          ]
        },
        {
          _type: 'block',
          style: 'number',
          children: [
            {
              _type: 'span',
              text: 'Team alignment and process optimization'
            }
          ]
        },
        {
          _type: 'block',
          style: 'number',
          children: [
            {
              _type: 'span',
              text: 'Execution and performance monitoring'
            }
          ]
        },
        {
          _type: 'block',
          style: 'number',
          children: [
            {
              _type: 'span',
              text: 'Ongoing optimization and scaling'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Measuring Success'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Conclusion'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Fractional CMO services represent a modern solution to the challenges of marketing leadership in today\'s dynamic business environment. By providing access to executive expertise without the full-time commitment, businesses can accelerate their growth while maintaining flexibility and cost-effectiveness.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          ]
        }
      ]
    }
    
    // Create or replace the blog post
    await client.createOrReplace(blogPost)
    console.log('✅ Created blog post: "The Complete Guide to Fractional CMO Services"')
    
    console.log('\n🎉 Blog post creation completed!')
    console.log('\n📋 What was created:')
    console.log('- Author: Brian Fidler')
    console.log('- Category: Marketing Strategy')
    console.log('- Blog Post: The Complete Guide to Fractional CMO Services')
    console.log('- Featured image: Same as About page hero image')
    console.log('\n🚀 Next steps:')
    console.log('1. Visit http://localhost:3000/blog to see your new blog post')
    console.log('2. Visit http://localhost:3000/studio to edit the content')
    console.log('3. The blog post is marked as "featured" and will appear prominently')
    
  } catch (error) {
    console.error('\n❌ Blog post creation failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('- Make sure your Sanity token is correct')
    console.log('- Check that your project ID and dataset are correct')
    console.log('- Ensure you have Editor permissions on your Sanity project')
    console.log('- Make sure you have a hero image on your About page')
  }
}

createBlogPost()
