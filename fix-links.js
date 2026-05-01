const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const PostSchema = new mongoose.Schema({ content: String, slug: String });
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function fixLinks() {
  await mongoose.connect(MONGODB_URI);
  const posts = await Post.find({});
  
  let updatedCount = 0;
  for (const post of posts) {
    if (!post.content) continue;
    
    let newContent = post.content;
    
    // Replace Blogger post links
    // Often they look like: href="https://sskiran1.blogspot.com/2026/04/smith-chart-construction-and.html"
    // Or sometimes escaped: href="https:\/\/sskiran1.blogspot.com\/2026\/04\/smith-chart-construction-and.html"
    newContent = newContent.replace(/href=["']https?:\/\/(?:www\.)?sskiran1\.blogspot\.com\/\d{4}\/\d{2}\/([^"']+?)\.html["']/g, 'href="/posts/$1"');
    newContent = newContent.replace(/href=\\?["']https?:\\?\/\\?\/(?:www\.)?sskiran1\.blogspot\.com\\?\/\d{4}\\?\/\d{2}\\?\/([^"']+?)\.html\\?["']/g, 'href="/posts/$1"');
    
    // Replace Blogger page links
    newContent = newContent.replace(/href=["']https?:\/\/(?:www\.)?sskiran1\.blogspot\.com\/p\/([^"']+?)\.html["']/g, 'href="/category/$1"');
    newContent = newContent.replace(/href=\\?["']https?:\\?\/\\?\/(?:www\.)?sskiran1\.blogspot\.com\\?\/p\\?\/([^"']+?)\.html\\?["']/g, 'href="/category/$1"');
    
    if (newContent !== post.content) {
      post.content = newContent;
      await post.save();
      updatedCount++;
    }
  }
  
  console.log(`Updated links in ${updatedCount} posts.`);
  process.exit(0);
}

fixLinks().catch(console.error);
