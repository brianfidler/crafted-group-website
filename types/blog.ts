import type { Image, PortableTextBlock } from 'sanity'

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: Image
  bio?: PortableTextBlock[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color: 'primary' | 'secondary' | 'accent' | 'muted'
  postCount?: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage?: Image
  publishedAt: string
  readingTime?: number
  featured?: boolean
  body?: PortableTextBlock[]
  author: Author
  categories?: Category[]
  tags?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface BlogListProps {
  posts: BlogPost[]
  categories?: Category[]
  currentCategory?: string
}

export interface BlogPostProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
}
