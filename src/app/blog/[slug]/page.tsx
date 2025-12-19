import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../../sanity/client";
import { postQuery, relatedPostsQuery } from "../../../../sanity/lib/queries";
import { urlForImage } from "../../../../sanity/lib/image";
import { CustomPortableText } from "@/components/blog/portable-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "../../../../types/blog";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(postQuery, { slug });
}

async function getRelatedPosts(postId: string, categoryIds: string[]): Promise<BlogPost[]> {
  return client.fetch(relatedPostsQuery, { postId, categoryIds });
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
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.mainImage
        ? [
            {
              url: urlForImage(post.mainImage)?.width(1200).height(630).url() || '',
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.mainImage
        ? [urlForImage(post.mainImage)?.width(1200).height(630).url() || '']
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const categoryIds = post.categories?.map(cat => cat._id) || [];
  const relatedPosts = categoryIds.length > 0 
    ? await getRelatedPosts(post._id, categoryIds)
    : [];

  return (
    <article className="flex flex-col">
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
              <span className="text-foreground">{post.title}</span>
            </div>
          </nav>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug?.current || category._id}`}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title and Meta */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author and Date */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center gap-4">
              {post.author.image && (
                <Image
                  src={urlForImage(post.author.image)?.width(48).height(48).url() || ''}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </div>
              </div>
            </div>
            
            {post.readingTime && (
              <div className="text-sm text-muted-foreground">
                {post.readingTime} min read
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="px-4 mb-12">
          <div className="container mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={urlForImage(post.mainImage)?.width(1200).height(600).url() || ''}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-4 mb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {post.body && <CustomPortableText content={post.body} />}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-12 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-4">
                {post.author.image && (
                  <Image
                    src={urlForImage(post.author.image)?.width(64).height(64).url() || ''}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">About {post.author.name}</h3>
                  <div className="prose prose-sm">
                    <CustomPortableText content={post.author.bio} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost._id} className="group hover:shadow-lg transition-shadow">
                  {relatedPost.mainImage && (
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={urlForImage(relatedPost.mainImage)?.width(400).height(200).url() || ''}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug?.current || relatedPost._id}`}>
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{relatedPost.author.name}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s discuss how strategic marketing leadership can accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Strategy Call</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
