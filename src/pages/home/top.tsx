import { Link, useLocation, useParams } from "solid-app-router";
import { createEffect, createResource, For, ResourceReturn, Show } from "solid-js";
import { BEST_POSTS_URL, NEW_POSTS_URL, TOP_POSTS_URL } from "../../common";
import Headline from "./headline";

const fetchPostIds = async (url) => (await fetch(url)).json();


export default function Top() {
    let posts;
    const location = useLocation();

    switch (location.pathname) {
        case '/':
            [ posts ] = createResource(TOP_POSTS_URL, fetchPostIds);
            break;

        case '/best':
            [ posts ] = createResource(BEST_POSTS_URL, fetchPostIds);
            break;

        case '/new':
            [ posts ] = createResource(NEW_POSTS_URL, fetchPostIds);
            break;
    }

    return (
        <>
            <div class="mb-4">
                <Link href="/" class={location.pathname === '/' ? 'tab active' : 'tab'}>Top</Link>
                <Link href="/best" class={location.pathname === '/best' ? 'tab active' : 'tab'}>Best</Link>
                <Link href="/new" class={location.pathname === '/new' ? 'tab active' : 'tab'}>New</Link>
            </div>

            <For each={posts()}>
                {(id, index) => (
                    <Show when={ 10 > index() }>
                        <Headline id={id} />
                    </Show>
                )}
            </For>
        </>
    );
}