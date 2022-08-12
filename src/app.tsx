import { Component, onCleanup, onMount } from 'solid-js';
import { Link, useRoutes } from 'solid-app-router';

import { routes } from './routes';
import { SettingsIcon } from './ionicons';
import AppState from './state';

import favicon from "./img/favicon.png";


const App: Component = () => {
	const Route = useRoutes(routes);
	const [ appState, setAppState ] = AppState;

	onMount(() => {
		const settings = localStorage.getItem('settings');
		if (settings) setAppState('settings', JSON.parse(settings));
	});

	return (
		<>
			<main class="container sm:mx-auto sm:w-2/3 p-4 dark:bg-dark-800">
				<div class="mb-4 sm:my-10 flex items-center">
					<Link href="/" class="flex gap-2 sm:gap-6 items-center" style={{ 'text-decoration': 'none' }}>
						<img src='/favicon.png' class="w-8 sm:w-16 rounded" />
						<h1 class="text-xl sm:text-5xl font-bold sm:font-font-extrabold">Solid News</h1>
					</Link>

					<div class="ml-auto">
						<Link href="/settings">
							<SettingsIcon />
						</Link>
					</div>
				</div>

				<Route />
			</main>
		</>
	);
};

export default App;
