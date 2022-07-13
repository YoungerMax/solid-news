import { Link } from "solid-app-router";
import { createResource, Suspense, Show, SuspenseList } from "solid-js";
import { fetchItemData } from "../../common"; 
import Score from "../../components/score";

export default function Headline(props) {
    let [ post ] = createResource(props.id, fetchItemData);

    return (
        <Suspense>
            <Show when={post() !== undefined }>
                <div class="p-8 transition-top-in post">
                    <div class="flex gap-4">
                        <Score score={post().score} />

                        <div>
                            <p class="text-xs text-gray-500">{post().type.toUpperCase()}</p>
                            
                            {/* TODO: Check if this is a safe way to do this */}
                            <Link href={"/post/" + post().id} style={{ "text-decoration": "none" }}>
                                <h1 class="font-black text-2xl">{post().title}</h1>
                            </Link>

                            <p class="italic">by <Link href={"/profile/" + post().by}>{post().by}</Link> • {new Date(post().time * 1000).toLocaleString()}</p>

                            <Show when={ post().url }>
                                <Link target="_blank" href={post().url} class="flex gap-2">
                                    {post().url}
                                </Link>
                                <br />
                            </Show>
                        </div>
                    </div>
                </div>
            </Show>
        </Suspense>
    );
}