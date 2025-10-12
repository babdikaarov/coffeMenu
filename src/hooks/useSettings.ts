import { useState, useEffect } from 'react';
import type { 
  GeneralSettings, 
  PageSettings, 
  MetadataSettings,
  UseSettingsReturn, 
  UsePageContentReturn 
} from '../types';

// No default settings - pure CMS approach

// No default page settings - pure CMS approach

export function useGeneralSettings(): UseSettingsReturn<GeneralSettings | null> {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/content/settings/general.json');
        if (response.ok) {
          const generalSettings = await response.json();
          setSettings(generalSettings);
        }
      } catch (error) {
        console.warn('Could not load general settings from CMS:', error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading };
}

export function usePageSettings(): UseSettingsReturn<PageSettings | null> {
  const [settings, setSettings] = useState<PageSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/content/settings/pages.json');
        if (response.ok) {
          const pageSettings = await response.json();
          setSettings(pageSettings);
        }
      } catch (error) {
        console.warn('Could not load page settings from CMS:', error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading };
}

// Convenience hooks for specific content - no fallbacks
export function usePageContent<T>(pageName: keyof PageSettings): UsePageContentReturn<T | null> {
  const { settings, loading } = usePageSettings();
  return { 
    content: (settings?.[pageName] as T) || null, 
    loading 
  };
}

export function useUIMessages() {
  const { settings, loading } = usePageSettings();
  return { 
    messages: settings?.ui || null, 
    loading 
  };
}

export function useNavigationLabels() {
  const { settings, loading } = usePageSettings();
  return { 
    labels: settings?.navigation || null, 
    loading 
  };
}

export function useMetadataSettings(): UseSettingsReturn<MetadataSettings | null> {
  const [settings, setSettings] = useState<MetadataSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/content/settings/metadata.json');
        if (response.ok) {
          const metadataSettings = await response.json();
          setSettings(metadataSettings);
        }
      } catch (error) {
        console.warn('Could not load metadata settings from CMS:', error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading };
}