import { Link } from "solid-app-router";
import { createResource, Suspense, Show, SuspenseList } from "solid-js";
import { fetchItemData } from "../../common"; 

export default function Headline(props) {
    let [ post ] = createResource(props.id, fetchItemData);

    return (
        <Suspense>
            <Show when={post() !== undefined }>
                <div class="p-8 transition-top-in post">
                    <div class="flex gap-4">
                        <div class="my-auto text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" style="width: 32px;" viewBox="0 0 512 512"><title>Upvote</title><path d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"/></svg>
                            <p class="font-bold">{post().score}</p>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" style="width: 32px;" viewBox="0 0 512 512"><title>Chatbox</title><path d="M144 464a16 16 0 01-16-16v-64h-24a72.08 72.08 0 01-72-72V120a72.08 72.08 0 0172-72h304a72.08 72.08 0 0172 72v192a72.08 72.08 0 01-72 72H245.74l-91.49 76.29A16.05 16.05 0 01144 464z"/></svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" style="width: 32px;" viewBox="0 0 512 512"><title>Downvote</title><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"/></svg>
                        </div>

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