import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import dbConnect from '@/lib/mongoose';
import Category from '@/models/Category';
import Post from '@/models/Post';

export const revalidate = 60;

async function getCategoryAndPosts(slug: string) {
  await dbConnect();
  const category = await Category.findOne({ slug }).lean();
  if (!category) return { category: null, posts: [] };

  const posts = await Post.find({ categories: category.name }).sort({ publishedAt: -1 }).lean();
  return { 
    category: JSON.parse(JSON.stringify(category)), 
    posts: JSON.parse(JSON.stringify(posts)) 
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent((await params).slug);
  const { category, posts } = await getCategoryAndPosts(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <p className="text-muted-foreground mb-2 uppercase tracking-wider text-sm font-semibold">Category</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{category.name}</h1>
        <p className="text-lg text-muted-foreground">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </div>

      <div className="space-y-8">
        {posts.map((post: any) => (
          <article key={post._id} className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock size={16} />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Read more <ChevronRight size={16} className="ml-1" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
