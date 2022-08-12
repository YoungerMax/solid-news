/* @refresh reload */
import 'windi.css';
import './styles.css';

import { render } from 'solid-js/web';
import { hashIntegration, Router } from 'solid-app-router';
import App from './app';

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement,
);
