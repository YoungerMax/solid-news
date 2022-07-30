import { Link } from "solid-app-router";
import { createResource, Match, Show, Switch } from "solid-js";
import { fetchItemData } from "../../common";
import Loading from "../../components/loading";
import { RichText, SmallText } from "../../components/typography";

export default function Comment(props) {
    const [ comment ] = createResource(props.id, fetchItemData);

    return (
        <>
            <Show when={ !comment.loading } fallback={
                <div class="py-12">
                    <Loading />
                </div>
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
                </div>
            </Show>
        </>
    );
}