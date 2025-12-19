import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../../../sanity/client";
import { categoryQuery, postsByCategoryQuery } from "../../../../../sanity/lib/queries";
import { urlForImage } from "../../../../../sanity/lib/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost, Category } from "../../../../../types/blog";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getCategory(slug: string): Promise<Category | null> {
  return client.fetch(categoryQuery, { slug });
}

async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  return client.fetch(postsByCategoryQuery, { category: categorySlug });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} - Marketing Insights`,
    description: category.description || `Articles about ${category.title}`,
  };
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground">{category.title}</span>
            </div>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {category.title}
          </h1>
          
          {category.description && (
            <p className="text-xl text-muted-foreground mb-8">
              {category.description}
            </p>
          )}

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">No articles in this category yet</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for insights on {category.title.toLowerCase()}.
              </p>
              <Button asChild>
                <Link href="/blog">Browse All Articles</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with {category.title} Insights
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest articles and strategic insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-input rounded-md"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
