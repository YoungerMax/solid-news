import { Link, useLocation, useParams } from "solid-app-router";
import { createEffect, createResource, createSignal, For, ResourceReturn, Show } from "solid-js";
import { ASK_POSTS_URL, BEST_POSTS_URL, JOB_POSTS_URL, NEW_POSTS_URL, SHOW_POSTS_URL, TOP_POSTS_URL } from "../../common";
import Headline from "./headline";

const fetchPostIds = async (url) => (await fetch(url)).json();


export default function Top() {
    const location = useLocation();
    const [ postCount, setPostCount ] = createSignal(10);
    
    const routeToUrl = {
        '/': TOP_POSTS_URL,
        '/best': BEST_POSTS_URL,
        '/new': NEW_POSTS_URL,
        '/ask': ASK_POSTS_URL,
        '/show': SHOW_POSTS_URL,
        '/jobs': JOB_POSTS_URL
    };

    const [ posts ] = createResource(routeToUrl[location.pathname], fetchPostIds);

    return (
        <>
            <div class="mb-4">
                <Link href="/" class={location.pathname === '/' ? 'tab active' : 'tab'}>Top</Link>
                <Link href="/best" class={location.pathname === '/best' ? 'tab active' : 'tab'}>Best</Link>
                <Link href="/new" class={location.pathname === '/new' ? 'tab active' : 'tab'}>New</Link>
                <Link href="/ask" class={location.pathname === '/ask' ? 'tab active' : 'tab'}>Ask</Link>
                <Link href="/show" class={location.pathname === '/show' ? 'tab active' : 'tab'}>Show</Link>
                <Link href="/jobs" class={location.pathname === '/jobs' ? 'tab active' : 'tab'}>Jobs</Link>
            </div>

            <Show when={!posts.loading} fallback={
                <p class="text-center text-xs text-gray-500 italic">Please wait a moment.</p>
            }>
                <For each={posts()}>
                    {(id, index) => (
                        <Show when={ postCount() > index() }>
                            <Headline id={id} />
                            <hr />
                        </Show>
                    )}
                </For>

                <div class="flex">
                    <Show when={posts().length > postCount()} fallback={
                        <p class="my-10 mx-auto text-xs text-gray-500 italic">You've reached the end.</p>
                    }>
                        <button class="my-10 mx-auto py-2 px-4 border-blue-400 border-2 rounded text-blue-400 hover:bg-blue-400 hover:text-light-50 transition" onClick={ () => setPostCount(postCount() + 10) }>Load more</button>
                    </Show>
                </div>
            </Show>
        </>
    );
}