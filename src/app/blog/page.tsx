import Link from "next/link";
import Image from "next/image";
import { client } from "../../../sanity/client";
import { postsQuery, featuredPostsQuery, categoriesQuery } from "../../../sanity/lib/queries";
import { urlForImage } from "../../../sanity/lib/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost, Category } from "../../../types/blog";

async function getPosts(): Promise<BlogPost[]> {
  return client.fetch(postsQuery);
}

async function getFeaturedPosts(): Promise<BlogPost[]> {
  return client.fetch(featuredPostsQuery);
}

async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const cardClass = featured 
    ? "group hover:shadow-lg transition-shadow duration-300" 
    : "group hover:shadow-lg transition-shadow duration-300";

  return (
    <Card className={cardClass}>
      {post.mainImage && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={urlForImage(post.mainImage)?.width(800).height(400).url() || ''}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {post.categories?.slice(0, 2).map((category) => (
            <span
              key={category._id}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {category.title}
            </span>
          ))}
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug.current}`}>
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            {post.author.image && (
              <Image
                src={urlForImage(post.author.image)?.width(32).height(32).url() || ''}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {post.readingTime && <span>{post.readingTime} min read</span>}
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function BlogPage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories(),
  ]);

  const nonFeaturedPosts = posts.filter(post => !post.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Marketing Insights & Strategy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Expert perspectives on growth, leadership, and strategic marketing
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical insights from 20+ years of marketing leadership, covering everything from 
            strategy development to team building and conversion optimization.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post._id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Explore by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category._id} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>
                    )}
                    {category.postCount !== undefined && (
                      <p className="text-xs text-muted-foreground mb-4">
                        {category.postCount} articles
                      </p>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/category/${category.slug.current}`}>
                        View Articles
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">All Articles</h2>
          {nonFeaturedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nonFeaturedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No articles yet</h3>
              <p className="text-muted-foreground mb-6">
                Stay tuned for insights on marketing strategy, team leadership, and growth tactics.
              </p>
              <Button asChild>
                <Link href="/contact">Get Marketing Insights via Consultation</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Marketing Insights
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get strategic marketing tips and growth insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-input rounded-md"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Join 500+ marketing professionals getting weekly insights
          </p>
        </div>
      </section>
    </div>
  );
}
