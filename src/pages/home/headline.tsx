import { Link } from "solid-app-router";
import { createResource, Suspense, Show, SuspenseList } from "solid-js";
import { fetchItemData } from "../../common"; 
import Score from "../../components/score";
import { DotSpaced, MediumText, SmallText, SubtitleText } from "../../components/typography";

export default function Headline(props) {
    let [ post ] = createResource(props.id, fetchItemData);

    return (
        <Suspense>
            <Show when={post() !== undefined && post !== null }>
                <div class="p-8 transition-top-in post">
                    <div class="flex gap-4">
                        <Score score={post().score} />

                        <div>
                            <SmallText>
                                {post().type.toUpperCase()}
                            </SmallText>
                            
                            {/* TODO: Check if this is a safe way to do this */}
                            <Link href={"/post/" + post().id} style={{ "text-decoration": "none" }}>
                                <h1 class="font-bold text-2xl">{post().title}</h1>
                            </Link>

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
                                </DotSpaced>
                            </SubtitleText>

                            <Show when={ post().url }>
                                <Link target="_blank" href={post().url} class="flex gap-2">
                                    {post().url}
                                </Link>
                                <br />
                            </Show>
                        </div>
                    </div>
                </div>
            </Show>
        </Suspense>
    );
}