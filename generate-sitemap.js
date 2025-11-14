const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { join } = require('path');

const baseUrl = 'https://abiddasurkar.github.io/ecommerce-platform';

const pages = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/#products', changefreq: 'weekly', priority: 0.9 },
  { url: '/#admin', changefreq: 'monthly', priority: 0.8 },
  { url: '/#auth', changefreq: 'monthly', priority: 0.7 }
];

async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({ hostname: baseUrl });
    
    const writeStream = createWriteStream(join(__dirname, 'build', 'sitemap.xml'));
    sitemap.pipe(writeStream);
    
    pages.forEach(page => {
      sitemap.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString()
      });
    });
    
    sitemap.end();
    
    await streamToPromise(sitemap);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();