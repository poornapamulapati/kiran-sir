const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

// Simple Post schema for seeding without Next.js dependencies
const PostSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,
    excerpt: String,
    thumbnail: String,
    categories: [String],
    publishedAt: Date,
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

function createSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function extractExcerpt(htmlContent) {
  const textContent = htmlContent.replace(/<[^>]+>/g, ' ');
  return textContent.substring(0, 150).trim() + '...';
}

async function extractThumbnail(htmlContent) {
  const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  const match = imgRegex.exec(htmlContent);
  return match ? match[1] : '';
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Fetch blogger feed
    const BLOG_URL = 'https://sskiran1.blogspot.com/feeds/posts/default?alt=json&max-results=500';
    console.log(`Fetching posts from ${BLOG_URL}...`);
    const res = await fetch(BLOG_URL);
    const data = await res.json();

    const entries = data.feed.entry || [];
    console.log(`Found ${entries.length} posts.`);

    const uniqueCategories = new Set();
    const postsToInsert = [];

    for (const entry of entries) {
      const title = entry.title.$t;
      const content = entry.content ? entry.content.$t : '';
      const publishedAt = new Date(entry.published.$t);
      
      const cats = entry.category ? entry.category.map((c) => c.term) : [];
      cats.forEach((c) => uniqueCategories.add(c));

      const slug = createSlug(title) || `post-${Date.now()}`;
      const excerpt = await extractExcerpt(content);
      const thumbnail = await extractThumbnail(content);

      postsToInsert.push({
        title,
        slug,
        content,
        excerpt,
        thumbnail,
        categories: cats,
        publishedAt,
      });
    }

    // Insert Categories
    const categoriesToInsert = Array.from(uniqueCategories).map((name) => ({
      name,
      slug: createSlug(name),
    }));

    if (categoriesToInsert.length > 0) {
      await Category.insertMany(categoriesToInsert);
      console.log(`Inserted ${categoriesToInsert.length} categories.`);
    }

    // Insert Posts
    if (postsToInsert.length > 0) {
      await Post.insertMany(postsToInsert);
      console.log(`Inserted ${postsToInsert.length} posts.`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
