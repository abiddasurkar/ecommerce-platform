const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { join } = require('path');

// Your website URL
const baseUrl = 'https://abiddasurkar.github.io/ecommerce-platform';

// Pages to include in sitemap
const pages = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/#projects', changefreq: 'monthly', priority: 0.9 },
  { url: '/#ecommerce-demo', changefreq: 'monthly', priority: 0.9 },
  { url: '/#skills', changefreq: 'monthly', priority: 0.8 },
  { url: '/#contact', changefreq: 'yearly', priority: 0.7 }
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