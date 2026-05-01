import Link from 'next/link';
import dbConnect from '@/lib/mongoose';
import Category from '@/models/Category';
import Post from '@/models/Post';

export const revalidate = 60;

async function getCategories() {
  await dbConnect();
  // Get categories and count of posts for each
  const categories = await Category.find().sort({ name: 1 }).lean();
  
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const count = await Post.countDocuments({ categories: cat.name });
      return { ...cat, count };
    })
  );
  
  return JSON.parse(JSON.stringify(categoriesWithCount));
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat: any) => (
          <Link key={cat._id} href={`/category/${cat.slug}`}>
            <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow hover:border-primary/50 group">
              <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{cat.name}</h2>
              <p className="text-muted-foreground mt-2">{cat.count} {cat.count === 1 ? 'post' : 'posts'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
