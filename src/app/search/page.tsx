import Link from 'next/link';
import { Clock, ChevronRight, Search as SearchIcon } from 'lucide-react';
import dbConnect from '@/lib/mongoose';
import Post from '@/models/Post';

export const revalidate = 60;

async function searchPosts(query: string) {
  if (!query) return [];
  await dbConnect();
  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { content: { $regex: query, $options: 'i' } }
    ]
  }).sort({ publishedAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

// Next.js page components can be async, but they take a promise for searchParams in App Router for Next.js 15
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = (await searchParams).q || '';
  const posts = await searchPosts(q);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
          <SearchIcon size={36} /> Search Results
        </h1>
        {q ? (
          <p className="text-lg text-muted-foreground">
            Found {posts.length} {posts.length === 1 ? 'result' : 'results'} for <span className="font-semibold text-foreground">"{q}"</span>
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">Please enter a search query.</p>
        )}
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
