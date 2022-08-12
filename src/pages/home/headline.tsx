import { Link } from "solid-app-router";
import { createResource, Suspense, Show, SuspenseList, createEffect } from "solid-js";
import { fetchItemData } from "../../common"; 
import Loading from "../../components/loading";
import Score from "../../components/score";
import { DotSpaced, MediumText, SmallText, SubtitleText } from "../../components/typography";
import AppState from "../../state";

export default function Headline(props) {
    const [ appState ] = AppState;
    let [ post ] = createResource(props.id, fetchItemData);

    return (
        <Show when={!post.loading} fallback={
            <div class="px-8 py-12">
                <Loading />
            </div>
        }>
            <div class="p-8 transition-top-in post flex items-center">
                <div class="hidden sm:block">
                    <Score score={post().score} url={post().url} />
                </div>

                <div class="pl-4">
                    <Show when={appState.settings['show-post-type']}>
                        <SmallText>
                            {post().type.toUpperCase()}
                        </SmallText>
                    </Show>

                    {/* TODO: Check if this is a safe way to do this */}
                    <Link href={"/post/" + post().id} style={{ "text-decoration": "none" }}>
                        <h1 class="font-bold text-2xl">{post().title}</h1>
                    </Link>

                    <SubtitleText>
                        <DotSpaced>
                            <p>
                                by <Link href={"/profile/" + post().by}>{post().by}</Link>
                            </p>

                            <p>
                                {new Date(post().time * 1000).toLocaleString()}
                            </p>
                        </DotSpaced>
                    </SubtitleText>

                    <Show when={ post().url }>
                        <Link target="_blank" href={post().url} class="flex gap-2">
                            <Show when={appState.settings['only-show-domains-for-links']} fallback={post().url}>
                                {new URL(post().url).host}
                            </Show>
                        </Link>
                    </Show>
                </div>
            </div>
        </Show>
    );
}