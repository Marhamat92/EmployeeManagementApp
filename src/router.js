import { Router } from '@vaadin/router';

const outlet = document.getElementById('outlet');
const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'employee-list-page' },
  { path: '/page/:pageNumber', component: 'employee-list-page' },
  { path: '/add-employee', component: 'employee-form' },
  { path: '/edit-employee/:id', component: 'employee-form' }
]);