import type { Component } from 'solid-js';
import { Link, useRoutes, useLocation } from 'solid-app-router';

import { routes } from './routes';
import faviconUrl from "./img/favicon.png";

const App: Component = () => {
	const Route = useRoutes(routes);

	return (
		<>
			<main class="container mx-auto w-2/3">
				<Link href="/" style={{ "text-decoration": "none" }}>
					<div class="my-16 flex items-center gap-6">
						<img src={faviconUrl} width="64" class="rounded" />
						<h1 class="text-5xl font-extrabold">Solid News</h1>
					</div>
				</Link>

				<Route />
			</main>
		</>
	);
};

export default App;
