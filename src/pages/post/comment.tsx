import { Link } from "solid-app-router";
import { createResource, For, Match, Show, Switch, Suspense, createSignal } from "solid-js";
import { fetchItemData } from "../../common";
import Loading from "../../components/loading";
import { RichText, SmallText } from "../../components/typography";
import Button from "../../components/button";
import AppState from '../../state';

export default function Comment(props) {
    const [ comment ] = createResource(props.id, fetchItemData);
    const [ appState ] = AppState;
    const [ childCount, setChildCount ] = createSignal(appState.settings['number-of-child-comments-to-load']);

    return (
        <>
            <Show when={ !comment.loading } fallback={
                <div class="py-12">
                    <Loading />
                </div>
            }>
                <Show when={
                    comment().dead && appState.settings['show-dead-comments'] ||
                    comment().deleted && appState.settings['show-deleted-comments'] ||
                    !comment().dead && !comment().deleted
                }>
                    <div class="transition-btm-in">
                        <Switch fallback={
                            <>
                                <RichText text={comment().text} />
                                <SmallText>by <Link href={"/profile/" + comment().by}>{comment().by}</Link></SmallText>
                            </>
                        }>
                            <Match when={ comment().deleted }>
                                <SmallText>This comment was deleted.</SmallText>
                            </Match>

                            <Match when={ comment().dead }>
                                <SmallText>This comment is dead.</SmallText>
                            </Match>
                        </Switch>

                        <div class="mt-4 pl-6 border-l-gray-200 border-l-2">
                            <Suspense>
                                <For each={ comment().kids }>
                                    {(id, index) => (
                                        <Show when={ childCount() > index() }>
                                            <Comment id={id} />
                                        </Show>
                                    )}
                                </For>
                            </Suspense>

                            <div class="flex transition-btm-in">
                                <Show when={comment().kids && comment().kids.length > childCount()}>                    
                                    <div class="my-2">
                                        <Button onClick={ () => setChildCount(childCount() + appState.settings['number-of-child-comments-to-load']) }>Load more</Button>
                                    </div>
                                </Show>
                            </div>
                        </div>
                    </div>
                </Show>
            </Show>
        </>
    );
}