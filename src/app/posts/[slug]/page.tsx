import { notFound } from 'next/navigation';
import { Clock, Eye, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '@/lib/mongoose';
import Post from '@/models/Post';
import ProseWrapper from '@/components/ProseWrapper';

export const revalidate = 60;

async function getPost(slug: string) {
  await dbConnect();
  // Fetch post without mutating during render
  const post = await Post.findOne({ slug }).lean();
  
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent((await params).slug);
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to blog
      </Link>
      
      <header className="mb-12 text-center">
        {post.categories && post.categories.length > 0 && (
          <div className="flex justify-center gap-2 mb-4">
            {post.categories.map((cat: string) => (
              <span key={cat} className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span>{post.views} views</span>
          </div>
        </div>
      </header>

      {post.thumbnail && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-border">
          <img src={post.thumbnail} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>
      )}

      <ProseWrapper htmlContent={post.content} />
      
      <hr className="my-12 border-border" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
