
import { getArticle, getAllArticles } from '../lib/articles';

async function test() {
  console.log('Testing getAllArticles...');
  const articles = await getAllArticles();
  console.log(`Found ${articles.length} articles.`);
  
  if (articles.length > 0) {
    const slug = articles[0].slug;
    console.log(`Testing getArticle for slug: ${slug}`);
    const article = await getArticle(slug);
    if (article) {
      console.log('Success! Article title:', article.title);
    } else {
      console.error('Failed to get article by slug');
    }
  } else {
    console.log('No articles found.');
  }
}

test().catch(console.error);


