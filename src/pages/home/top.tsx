import { Link, useLocation, useParams } from "solid-app-router";
import { createEffect, createResource, createSignal, For, ResourceReturn, Show, SuspenseList } from "solid-js";
import { ASK_POSTS_URL, BEST_POSTS_URL, JOB_POSTS_URL, NEW_POSTS_URL, SHOW_POSTS_URL, TOP_POSTS_URL } from "../../common";
import Loading from "../../components/loading";
import Headline from "./headline";
import { SmallText } from "../../components/typography";
import Button from "../../components/button";
import AppState from "../../state";

const fetchPostIds = async (url) => (await fetch(url)).json();


export default function Top() {
    const location = useLocation();
    const [ appState ] = AppState;
    const [ postCount, setPostCount ] = createSignal(appState.settings['number-of-posts-to-load']);
    
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
            <div class="mb-4 transition-top-in <sm:mx-auto">
                <Link href="/" class={location.pathname === '/' ? 'tab active' : 'tab'}>Top</Link>
                <Link href="/best" class={location.pathname === '/best' ? 'tab active' : 'tab'}>Best</Link>
                <Link href="/new" class={location.pathname === '/new' ? 'tab active' : 'tab'}>New</Link>
                <Link href="/ask" class={location.pathname === '/ask' ? 'tab active' : 'tab'}>Ask</Link>
                <Link href="/show" class={location.pathname === '/show' ? 'tab active' : 'tab'}>Show</Link>
                <Link href="/jobs" class={location.pathname === '/jobs' ? 'tab active' : 'tab'}>Jobs</Link>
            </div>

            <Show when={!posts.loading} fallback={
                <div class="py-12">
                    <Loading />
                </div>
            }>
                <For each={posts()}>
                    {(id, index) => (
                        <Show when={ postCount() > index() }>
                            <Headline id={id} />
                        </Show>
                    )}
                </For>

                <div class="flex">
                    <Show when={posts().length > postCount()} fallback={
                        <div class="my-10 mx-auto">
                            <SmallText>You've reached the end.</SmallText>
                        </div>
                    }>
                        <div class="my-10 mx-auto">
                            <Button onClick={ () => setPostCount(postCount() + appState.settings['number-of-posts-to-load']) }>Load more</Button>
                        </div>
                    </Show>
                </div>
            </Show>
        </>
    );
}