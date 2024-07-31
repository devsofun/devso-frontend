import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/results', component: SearchResults }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
