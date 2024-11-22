let currentLanguage = 'en';
let translations = {};

export async function loadLanguage(lang) {
  const response = await fetch(`./locales/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load language file: ${lang}`);
  }
  translations = await response.json();
  currentLanguage = lang;
  document.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
}

export function t(key) {
  return translations[key] || key;
}

export function getCurrentLanguage() {
  return currentLanguage;
}