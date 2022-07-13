import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';
import { TOP_POSTS_URL, BEST_POSTS_URL, NEW_POSTS_URL } from './common';
import Top from './pages/home/top';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Top,
  },
  {
    path: '/best',
    component: lazy(() => import('./pages/home/top')),
  },
  {
    path: '/new',
    component: lazy(() => import('./pages/home/top')),
  },

  {
    path: '/post/:id',
    component: lazy(() => import('./pages/post/post')),
  },
  {
    path: '/profile/:name',
    component: lazy(() => import('./pages/profile/profile')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
