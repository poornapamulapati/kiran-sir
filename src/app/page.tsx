import Link from 'next/link';
import { Clock, Eye, ChevronRight } from 'lucide-react';
import dbConnect from '@/lib/mongoose';
import Post from '@/models/Post';
import Category from '@/models/Category';
import Sidebar from '@/components/Sidebar';
import AnimatedHero from '@/components/AnimatedHero';
import AnimatedPostCard from '@/components/AnimatedPostCard';

export const revalidate = 60; // Revalidate every minute

async function getPosts() {
  await dbConnect();
  const posts = await Post.find().sort({ publishedAt: -1 }).limit(10).lean();
  return JSON.parse(JSON.stringify(posts));
}

async function getCategories() {
  await dbConnect();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function Home() {
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <AnimatedHero />
        
        <section className="space-y-10">
          <div className="mb-8 border-b border-border pb-4 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
          </div>
            {posts.map((post: any, index: number) => (
              <AnimatedPostCard key={post._id} index={index}>
                <article className="group grid md:grid-cols-4 gap-6 items-start">
                  {post.thumbnail && (
                  <div className="md:col-span-1 rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className={`flex flex-col justify-center ${post.thumbnail ? 'md:col-span-3' : 'md:col-span-4'}`}>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    {post.categories && post.categories.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-medium">{post.categories[0]}</span>
                      </>
                    )}
                  </div>
                  
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Read article <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </article>
              </AnimatedPostCard>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
                <p className="text-lg text-muted-foreground">No posts found.</p>
              </div>
            )}
        </section>
      </div>

      <Sidebar categories={categories} recentPosts={posts.slice(0, 5)} />
    </div>
  );
}
