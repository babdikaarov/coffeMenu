import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export function htmlMetaInject() {
  return {
    name: 'html-meta-inject',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        try {
          // Read metadata from CMS settings
          const metadataPath = resolve(process.cwd(), 'content/settings/metadata.json');
          
          if (!existsSync(metadataPath)) {
            console.warn('Metadata file not found, using defaults');
            return html;
          }

          const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
          
          // Generate meta tags
          let metaTags = '';
          
          // Basic meta tags
          if (metadata.site?.title) {
            html = html.replace(/<title>.*?<\/title>/, `<title>${metadata.site.title}</title>`);
          }
          
          if (metadata.site?.description) {
            metaTags += `    <meta name="description" content="${metadata.site.description}" />\n`;
          }
          
          if (metadata.site?.keywords?.length) {
            metaTags += `    <meta name="keywords" content="${metadata.site.keywords.join(', ')}" />\n`;
          }
          
          // Open Graph meta tags
          if (metadata.openGraph?.title || metadata.site?.title) {
            const ogTitle = metadata.openGraph?.title || metadata.site?.title;
            metaTags += `    <meta property="og:title" content="${ogTitle}" />\n`;
          }
          
          if (metadata.openGraph?.description || metadata.site?.description) {
            const ogDescription = metadata.openGraph?.description || metadata.site?.description;
            metaTags += `    <meta property="og:description" content="${ogDescription}" />\n`;
          }
          
          if (metadata.openGraph?.type) {
            metaTags += `    <meta property="og:type" content="${metadata.openGraph.type}" />\n`;
          }
          
          if (metadata.site?.url) {
            metaTags += `    <meta property="og:url" content="${metadata.site.url}" />\n`;
          }
          
          if (metadata.openGraph?.image || metadata.site?.image) {
            const ogImage = metadata.openGraph?.image || metadata.site?.image;
            if (ogImage) {
              const imageUrl = ogImage.startsWith('http') ? ogImage : `${metadata.site?.url || ''}${ogImage}`;
              metaTags += `    <meta property="og:image" content="${imageUrl}" />\n`;
            }
          }
          
          // Twitter meta tags
          if (metadata.twitter?.card) {
            metaTags += `    <meta name="twitter:card" content="${metadata.twitter.card}" />\n`;
          }
          
          if (metadata.twitter?.site) {
            metaTags += `    <meta name="twitter:site" content="${metadata.twitter.site}" />\n`;
          }
          
          if (metadata.twitter?.title || metadata.site?.title) {
            const twitterTitle = metadata.twitter?.title || metadata.site?.title;
            metaTags += `    <meta name="twitter:title" content="${twitterTitle}" />\n`;
          }
          
          if (metadata.twitter?.description || metadata.site?.description) {
            const twitterDescription = metadata.twitter?.description || metadata.site?.description;
            metaTags += `    <meta name="twitter:description" content="${twitterDescription}" />\n`;
          }
          
          if (metadata.twitter?.image || metadata.site?.image) {
            const twitterImage = metadata.twitter?.image || metadata.site?.image;
            if (twitterImage) {
              const imageUrl = twitterImage.startsWith('http') ? twitterImage : `${metadata.site?.url || ''}${twitterImage}`;
              metaTags += `    <meta name="twitter:image" content="${imageUrl}" />\n`;
            }
          }
          
          // Inject meta tags after the comment
          if (metaTags) {
            html = html.replace(
              '<!-- SEO meta tags will be injected here by Vite plugin -->', 
              `<!-- SEO meta tags will be injected here by Vite plugin -->\n${metaTags}`
            );
          }
          
          console.log('✓ Injected SEO metadata into HTML');
          return html;
          
        } catch (error) {
          console.warn('Failed to inject metadata:', error.message);
          return html;
        }
      }
    }
  };
}