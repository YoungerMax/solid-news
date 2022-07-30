import { createEffect, createResource, Show } from "solid-js";
import { fetchItemData } from "../../common";
import Loading from "../../components/loading";

export default function PollPart(props) {
    const [ part ] = createResource(props.id, fetchItemData);

    return (
        <div class="p-4 border-black rounded border-1 flex">
            <Show when={!part.loading} fallback={<Loading />}>
                <div class="mr-auto">
                    <p>{part().text}</p>
                </div>

                <div class="ml-auto">
                    <p>{part().score}</p>
                </div>
            </Show>
        </div>
    );
}