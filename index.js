import { loadLanguage, getCurrentLanguage } from './utils/localization.js';

async function initializeApp() {
  // Load the default language
  await loadLanguage(getCurrentLanguage());

  // Now import components and initialize the router
  await import('./components/header-bar.js');
  await import('./components/employee-table.js');
  await import('./components/employee-form.js');
  await import('./pages/employee-list-page.js');
  await import('./router.js');
}

initializeApp();