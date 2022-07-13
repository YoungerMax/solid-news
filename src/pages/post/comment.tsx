import { Link } from "solid-app-router";
import { createResource, Show } from "solid-js";
import { fetchItemData } from "../../common";

export default function Comment(props) {
    const [ comment ] = createResource(props.id, fetchItemData);

    return (
        <>
            <Show when={ !comment.loading }>
                <div class="transition-btm-in">
                    <div innerHTML={comment().text} class="increase-line-spacing"></div>
                    <p class="text-xs text-gray-500">by <Link href={"/profile/" + comment().by}>{comment().by}</Link></p>
                </div>
            </Show>
        </>
    );
}