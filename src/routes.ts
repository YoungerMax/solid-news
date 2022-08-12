import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';
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
    path: '/ask',
    component: lazy(() => import('./pages/home/top')),
  },
  {
    path: '/show',
    component: lazy(() => import('./pages/home/top')),
  },
  {
    path: '/jobs',
    component: lazy(() => import('./pages/home/top')),
  },

  {
    path: '/settings',
    component: lazy(() => import('./pages/settings/settings'))
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
