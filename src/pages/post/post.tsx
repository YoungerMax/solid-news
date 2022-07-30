import { Link, useParams } from "solid-app-router";
import { createEffect, createResource, createSignal, For, Show, Suspense } from "solid-js";
import { fetchItemData } from "../../common";
import Button from "../../components/button";
import Loading from "../../components/loading";
import PageTitle from "../../components/pagetitle";
import { DotSpaced, RichText, SubtitleText, MediumText, SmallText } from "../../components/typography";
import Comment from "./comment";
import PollPart from "./pollpart";
import Error from "../../components/error";


export default function Post(props) {
    const params = useParams();
    const [ post ] = createResource(params.id, fetchItemData);
    const [ postCount, setPostCount ] = createSignal(10);

    return (
        <>
            <Show when={ !post.loading } fallback={<Loading />}>
                <Show when={ post() } fallback={
                    <Error>This post does not exist.</Error>
                }>
                    <div>
                        <PageTitle title={post().title}>
                            <SubtitleText>
                                <DotSpaced>
                                    <p>
                                        by <Link href={"/profile/" + post().by}>
                                            {post().by}
                                        </Link>
                                    </p>

                                    <p>
                                        {new Date(post().time * 1000).toLocaleString()}
                                    </p>

                                    <p>
                                        {post().score} vote
                                        
                                        {/* Plural */}
                                        <Show when={ post().score !== 1 }>
                                            s
                                        </Show>
                                    </p>
                                </DotSpaced>
                            </SubtitleText>
                        </PageTitle>

                        <div class="mb-6 transition-btm-in">
                            <Show when={post().url}>
                                <Link target="_blank" href={post().url}>{post().url}</Link>
                                <br /><br />
                            </Show>

                            <Show when={post().text} fallback={
                                <MediumText>No description provided.</MediumText>
                            }>
                                <RichText text={post().text} />
                            </Show>
                        </div>

                        <Show when={ post().type === 'poll'}>
                            <div class="transition-btm-in">
                                <For each={post().parts}>
                                    {(id, index) => (
                                        <div class="my-2">
                                            <PollPart id={id} />
                                        </div>
                                    )}
                                </For>
                            </div>
                        </Show>
                        
                        <br /><hr />
                        
                        <div>
                            <Show when={post().kids}>
                                <Suspense>
                                    <For each={post().kids}>
                                        {(id, index) => (
                                            <Show when={ postCount() > index() }>
                                                <div class="my-4">
                                                    <Comment id={id} />
                                                </div>
                                            </Show>
                                        )}
                                    </For>
                                </Suspense>
                            </Show>
                        </div>
                        
                        <div class="flex transition-btm-in">
                            <Show when={post().kids && post().kids.length > postCount()} fallback={
                                <div class="my-10 mx-auto">
                                    <SmallText>You've reached the end.</SmallText>
                                </div>
                            }>
                                <div class="my-10 mx-auto">
                                    <Button onClick={ () => setPostCount(postCount() + 10) }>Load more</Button>
                                </div>
                            </Show>
                        </div>
                    </div>
                </Show>
            </Show>
        </>
    );
}