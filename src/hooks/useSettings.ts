import { useState, useEffect } from "react";
import {
  loadGeneralSettings,
  loadPageSettings,
  loadMetadataSettings,
} from "../lib/settings-loader";
import type {
  GeneralSettings,
  PageSettings,
  MetadataSettings,
  UseSettingsReturn,
  UsePageContentReturn,
} from "../types";

// Helper to check if object is empty
const isEmptyObject = (obj: any) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

// General settings hook
export function useGeneralSettings(): UseSettingsReturn<GeneralSettings> {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const generalSettings =
          (await loadGeneralSettings()) as GeneralSettings | null;
        setSettings(isEmptyObject(generalSettings) ? null : generalSettings);
      } catch (error) {
        console.warn("Could not load general settings:", error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return { settings: settings!, loading };
}

// Page settings hook
export function usePageSettings(): UseSettingsReturn<PageSettings> {
  const [settings, setSettings] = useState<PageSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const pageSettings = (await loadPageSettings()) as PageSettings | null;
        setSettings(isEmptyObject(pageSettings) ? null : pageSettings);
      } catch (error) {
        console.warn("Could not load page settings:", error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return { settings: settings!, loading };
}

// Convenience hooks
export function usePageContent<T>(
  pageName: keyof PageSettings,
): UsePageContentReturn<T | null> {
  const { settings, loading } = usePageSettings();
  return {
    content: loading || !settings ? null : (settings[pageName] as T) || null,
    loading,
  };
}

export function useUIMessages() {
  const { settings, loading } = usePageSettings();
  return {
    messages: loading || !settings ? null : settings.ui || null,
    loading,
  };
}

export function useNavigationLabels() {
  const { settings, loading } = usePageSettings();
  return {
    labels: loading || !settings ? null : settings.navigation || null,
    loading,
  };
}

// Metadata settings hook
export function useMetadataSettings(): UseSettingsReturn<MetadataSettings> {
  const [settings, setSettings] = useState<MetadataSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const metadataSettings =
          (await loadMetadataSettings()) as MetadataSettings | null;
        setSettings(isEmptyObject(metadataSettings) ? null : metadataSettings);
      } catch (error) {
        console.warn("Could not load metadata settings:", error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return { settings: settings!, loading };
}
