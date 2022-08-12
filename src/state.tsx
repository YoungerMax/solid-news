import { createStore } from "solid-js/store";

interface AppState {
    settings: object;
}

export default createStore<AppState>({
    settings: {
        "theme": "Light",
        "show-dead-comments": false,
        "show-deleted-comments": false,
        "only-show-domains-for-links": true,
        "show-post-type": false,
        "number-of-posts-to-load": 10,
        "number-of-comments-to-load": 10,
        "number-of-child-comments-to-load": 3
    }
});