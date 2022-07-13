import { useParams } from "solid-app-router";
import { createResource, Show } from "solid-js";
import { fetchUserData } from "../../common";

export default function Profile() {
    const params = useParams();
    const [ user ] = createResource(params.name, fetchUserData);

    return (
        <>
            <Show when={user()}>
                <div class="flex gap-2 mb-6 items-center transition-btm-in">
                    <div class="max-w-8 max-h-8 cursor-pointer rounded-full hover:bg-gray-200 transition" onClick={ () => window.history.back() }>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Back</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                    </div>

                    <div>
                        <h3 class="font-bold text-2xl">{user().id}</h3>
                        <p class="italic mb-4">{user().karma} karma • joined {new Date(user().created * 1000).toLocaleString()}</p>
                    </div>
                </div>
                
                <div class="transition-btm-in">
                    <Show when={user().about} fallback={
                        <p class="font-light italic">No desciption provided.</p>
                    }>
                        <div innerHTML={user().about} class="increase-line-spacing"></div>
                    </Show>
                </div>
            </Show>
        </>
    );
}