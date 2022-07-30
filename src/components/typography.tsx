import { children, For } from "solid-js";
import { ResolvedChildren, ResolvedJSXElement } from "solid-js/types/reactive/signal";

export function SmallText(props) {
    const c = children(() => props.children);

    return (
        <p class="text-xs text-gray-500">{c()}</p>
    );
}

export function MediumText(props) {
    const c = children(() => props.children);

    return (
        <p class="text-base text-black italic font-thin">{c()}</p>
    );
}

export function RichText(props) {
    return (
        <div class="increased-line-spacing" innerHTML={props.text}></div>
    );
}

export function TitleText(props) {
    const c = children(() => props.children);

    return (
        <h1 class="font-bold text-2xl">{c()}</h1>
    );
}

export function SubtitleText(props) {
    const c = children(() => props.children);

    return (
        <h1 class="text-base italic font-normal text-black">{c()}</h1>
    );
}

export function DotSpaced(props) {
    let elements = [];

    for (let i = 0; props.children.length > i; i++) {
        elements.push(props.children[i]);

        if (props.children.length - 1 > i) {
            elements.push(<p>•</p>);
        }
    }

    return (
        <div class="flex items-center gap-1">
            <For each={elements}>
                {(item, index) => item}
            </For>
        </div>
    );
}