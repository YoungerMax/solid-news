import { Link, useParams } from "solid-app-router";
import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { fetchItemData } from "../../common";
import Comment from "./comment";


export default function Post(props) {
    const params = useParams();
    const [ post ] = createResource(params.id, fetchItemData);
    const [ postCount, setPostCount ] = createSignal(10);

    return (
        <>
            <Show when={ !post.loading }>
                <div>
                    <div class="flex gap-2 mb-6 items-center transition-btm-in">
                        <div class="max-w-8 max-h-8 cursor-pointer rounded-full hover:bg-gray-200 transition" onClick={ () => window.history.back() }>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Back</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                        </div>

                        <div>
                            <h3 class="font-bold text-2xl">{post().title}</h3>
                            <p class="italic">by <Link href={"/profile/" + post().by}>{post().by}</Link></p>
                        </div>
                    </div>

                    <div class="transition-btm-in">
                        <Show when={post().url}>
                            <Link target="_blank" href={post().url}>{post().url}</Link>
                        </Show>

                        <Show when={post().text} fallback={
                            <p class="font-light italic">No desciption provided.</p>
                        }>
                            <div innerHTML={post().text} class="increase-line-spacing"></div>
                        </Show>
                    </div>
                    
                    <br /><hr />

                    <Suspense>
                        <For each={post().kids}>
                            {(id, index) => (
                                <Show when={ postCount() > index() }>
                                    <div class="my-8">
                                        <Comment id={id} />
                                    </div>

                                    <hr />
                                </Show>
                            )}
                        </For>
                    </Suspense>

                    <div class="flex">
                        <button class="my-10 mx-auto py-2 px-4 border-blue-400 border-2 rounded text-blue-400 hover:bg-blue-400 hover:text-light-50 transition" onClick={ () => setPostCount(postCount() + 10) }>Load more</button>
                    </div>
                </div>
            </Show>
        </>
    );
}