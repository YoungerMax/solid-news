import { children } from "solid-js";
import { ErrorIcon } from "../ionicons";

export default function Error(props) {
    const c = children(() => props.children);

    return (
        <div class="p-4 border-red-500 text-red-500 fill-red-500 rounded border-1 flex items-center gap-2">
            <ErrorIcon />
            {c()}
        </div>
    )
}
