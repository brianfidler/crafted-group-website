import { groq } from 'next-sanity'

// Blog queries
export const postsQuery = groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "categories": categories[]->title,
  "author": author->name,
  "mainImage": mainImage.asset->url
}`

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  "categories": categories[]->{
    _id,
    title,
    slug
  },
  "author": author->{
    _id,
    name,
    slug,
    image,
    bio
  },
  "mainImage": mainImage.asset->url,
  readingTime,
  tags
}`

export const postSlugsQuery = groq`*[_type == "post" && publishedAt < now()] {
  slug
}`

export const categoryQuery = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  description,
  "posts": *[_type == "post" && references(^._id) && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "author": author->name,
    "mainImage": mainImage.asset->url
  }
}`

export const categorySlugsQuery = groq`*[_type == "category"] {
  slug
}`

// Blog queries (additional)
export const categoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color,
  "postCount": count(*[_type == "post" && references(^._id)])
}`

export const featuredPostsQuery = groq`*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readingTime,
  author->{
    name,
    slug,
    image
  },
  categories[]->{
    title,
    slug,
    color
  }
}`

export const postsByCategoryQuery = groq`*[_type == "post" && references(*[_type == "category" && slug.current == $category]._id) && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readingTime,
  author->{
    name,
    slug,
    image
  },
  categories[]->{
    title,
    slug,
    color
  },
  tags
}`

export const relatedPostsQuery = groq`*[_type == "post" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0 && defined(slug.current)] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readingTime,
  author->{
    name,
    slug,
    image
  },
  categories[]->{
    title,
    slug,
    color
  }
}`

// Page content queries
export const homePageQuery = groq`*[_type == "homePage"][0] {
  _id,
  title,
  heroHeadline,
  heroSubheading,
  heroDescription,
  "heroImage": heroImage.asset->url,
  heroCallToAction,
  stats,
  servicesTitle,
  servicesDescription,
  testimonialsTitle,
  finalCallToAction,
  seo
}`

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  _id,
  title,
  pageTitle,
  pageSubtitle,
  "heroImage": heroImage.asset->url,
  personalStory,
  experienceTitle,
  experienceContent,
  expertiseTitle,
  expertiseAreas,
  philosophyTitle,
  philosophy,
  locationInfo,
  callToAction,
  seo
}`

export const servicesPageQuery = groq`*[_type == "servicesPage"][0] {
  _id,
  title,
  pageTitle,
  pageSubtitle,
  "heroImage": heroImage.asset->url,
  introduction,
  howItWorksTitle,
  howItWorksDescription,
  processSteps,
  coreServicesTitle,
  coreServicesDescription,
  services,
  callToAction,
  seo
}`

export const pricingPageQuery = groq`*[_type == "pricingPage"][0] {
  _id,
  title,
  pageTitle,
  pageSubtitle,
  "heroImage": heroImage.asset->url,
  introduction,
  pricingTiers,
  valueProposition,
  comparisonPoints,
  faqs,
  callToAction,
  seo
}`

export const caseStudiesPageQuery = groq`*[_type == "caseStudiesPage"][0] {
  _id,
  title,
  pageTitle,
  pageSubtitle,
  "heroImage": heroImage.asset->url,
  introduction,
  caseStudies,
  callToAction,
  seo
}`

export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  _id,
  title,
  pageTitle,
  pageSubtitle,
  "heroImage": heroImage.asset->url,
  introduction,
  contactMethods,
  formSettings,
  calendlyIntegration,
  callToAction,
  seo
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  _id,
  title,
  description,
  contactInfo,
  socialMedia,
  integrations,
  globalCtas,
  footer,
  seoDefaults
}`

// Shared content queries
export const testimonialsQuery = groq`*[_type == "testimonial"] {
  _id,
  quote,
  author,
  company,
  position,
  "image": image.asset->url,
  featured
}`

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] {
  _id,
  quote,
  author,
  company,
  position,
  "image": image.asset->url
}`
