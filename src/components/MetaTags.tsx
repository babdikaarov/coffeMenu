import { useEffect } from 'react';
import { useMetadataSettings } from '../hooks/useSettings';

export function MetaTags() {
  const { settings: metadata, loading } = useMetadataSettings();

  useEffect(() => {
    if (loading || !metadata) return;

    // Update document title
    if (metadata.site?.title) {
      document.title = metadata.site.title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Site metadata
    if (metadata.site?.description) {
      updateMetaTag('description', metadata.site.description);
    }
    
    if (metadata.site?.keywords?.length) {
      updateMetaTag('keywords', metadata.site.keywords.join(', '));
    }

    // Open Graph metadata
    if (metadata.openGraph?.title) {
      updateMetaTag('og:title', metadata.openGraph.title, true);
    } else if (metadata.site?.title) {
      updateMetaTag('og:title', metadata.site.title, true);
    }

    if (metadata.openGraph?.description) {
      updateMetaTag('og:description', metadata.openGraph.description, true);
    } else if (metadata.site?.description) {
      updateMetaTag('og:description', metadata.site.description, true);
    }

    if (metadata.openGraph?.image) {
      updateMetaTag('og:image', metadata.openGraph.image, true);
    } else if (metadata.site?.image) {
      updateMetaTag('og:image', metadata.site.image, true);
    }

    if (metadata.openGraph?.type) {
      updateMetaTag('og:type', metadata.openGraph.type, true);
    }

    if (metadata.site?.url) {
      updateMetaTag('og:url', metadata.site.url, true);
    }

    // Twitter metadata
    if (metadata.twitter?.title) {
      updateMetaTag('twitter:title', metadata.twitter.title);
    } else if (metadata.site?.title) {
      updateMetaTag('twitter:title', metadata.site.title);
    }

    if (metadata.twitter?.description) {
      updateMetaTag('twitter:description', metadata.twitter.description);
    } else if (metadata.site?.description) {
      updateMetaTag('twitter:description', metadata.site.description);
    }

    if (metadata.twitter?.image) {
      updateMetaTag('twitter:image', metadata.twitter.image);
    } else if (metadata.site?.image) {
      updateMetaTag('twitter:image', metadata.site.image);
    }

    if (metadata.twitter?.card) {
      updateMetaTag('twitter:card', metadata.twitter.card);
    }

    if (metadata.twitter?.site) {
      updateMetaTag('twitter:site', metadata.twitter.site);
    }

  }, [metadata, loading]);

  return null; // This component doesn't render anything visible
}