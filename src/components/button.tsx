import { children } from "solid-js";

export default function Button(props) {
    const c = children(() => props.children);

    return (
        <button class="py-2 px-4 border-blue-600 border-2 rounded text-blue-600 hover:bg-blue-600 hover:text-light-50 transition" { ...props }>
            {c()}
        </button>
    );
}
