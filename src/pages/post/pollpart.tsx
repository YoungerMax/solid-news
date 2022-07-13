import { createEffect, createResource, Show } from "solid-js";
import { fetchItemData } from "../../common";

export default function PollPart(props) {
    const [ part ] = createResource(props.id, fetchItemData);

    return (
        <Show when={part()}>
            <div class="p-4 border-black rounded border-1 flex">
                <div class="mr-auto">
                    <p>{part().text}</p>
                </div>

                <div class="ml-auto">
                    <p>{part().score}</p>
                </div>
            </div>
        </Show>
    );
}