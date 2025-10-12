// Settings content loader for Decap CMS integration

import type { GeneralSettings, PageSettings, MetadataSettings } from "../types";

// Load general settings
export function loadGeneralSettings(): GeneralSettings | {} {
  try {
    const settingsFiles = import.meta.glob("/content/settings/general.json", {
      eager: true,
      import: "default",
    }) as Record<string, GeneralSettings>;

    return settingsFiles["/content/settings/general.json"] || {};
  } catch (error) {
    console.warn("Could not load general settings from CMS:", error);
    return {};
  }
}

// Load page settings
export function loadPageSettings(): PageSettings | {} {
  try {
    const settingsFiles = import.meta.glob("/content/settings/pages.json", {
      eager: true,
      import: "default",
    }) as Record<string, PageSettings>;

    return settingsFiles["/content/settings/pages.json"] || {};
  } catch (error) {
    console.warn("Could not load page settings from CMS:", error);
    return {};
  }
}

// Load metadata settings
export function loadMetadataSettings(): MetadataSettings | {} {
  try {
    const settingsFiles = import.meta.glob("/content/settings/metadata.json", {
      eager: true,
      import: "default",
    }) as Record<string, MetadataSettings>;

    return settingsFiles["/content/settings/metadata.json"] || {};
  } catch (error) {
    console.warn("Could not load metadata settings from CMS:", error);
    return {};
  }
}

// Helper function to get specific page content
export function getPageContent<T extends keyof PageSettings>(pageName: T) {
  const pageSettings = loadPageSettings() as PageSettings;
  return pageSettings[pageName] || {};
}

// Helper function to get UI messages
export function getUIMessages() {
  const pageSettings = loadPageSettings() as PageSettings;
  return pageSettings.ui || {};
}
