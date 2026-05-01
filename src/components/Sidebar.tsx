import Link from 'next/link';

export default function Sidebar({ categories, recentPosts }: { categories: any[], recentPosts: any[] }) {
  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Search */}
      <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
        <h3 className="font-bold text-lg mb-4">Search</h3>
        <form action="/search" className="flex">
          <input
            type="text"
            name="q"
            placeholder="Search posts..."
            className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button type="submit" className="inline-flex items-center justify-center rounded-r-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Go
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
        <h3 className="font-bold text-lg mb-4">Recent Posts</h3>
        <ul className="space-y-3">
          {recentPosts?.map((post) => (
            <li key={post._id}>
              <Link href={`/posts/${post.slug}`} className="text-sm hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary text-secondary-foreground"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
