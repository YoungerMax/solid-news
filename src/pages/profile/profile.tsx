import { useParams } from "solid-app-router";
import { createResource, Show } from "solid-js";
import { fetchUserData } from "../../common";
import Loading from "../../components/loading";
import PageTitle from "../../components/pagetitle";
import { DotSpaced, MediumText, RichText, SubtitleText, TitleText } from "../../components/typography";
import { BackIcon } from "../../ionicons";
import Error from "../../components/error";

export default function Profile() {
    const params = useParams();
    const [ user ] = createResource(params.name, fetchUserData);

    return (
        <>
            <Show when={!user.loading} fallback={<Loading />}>
                <Show when={user()} fallback={
                    <Error>This user does not exist.</Error>
                }>
                    <PageTitle title={user().id}>
                        <SubtitleText>
                            <DotSpaced>
                                <p>
                                    {user().karma} karma
                                </p>

                                <p>
                                    joined {new Date(user().created * 1000).toLocaleString()}
                                </p>
                            </DotSpaced>
                        </SubtitleText>
                    </PageTitle>
                    
                    <div class="transition-btm-in">
                        <Show when={user().about} fallback={
                            <MediumText>No description provided.</MediumText>
                        }>
                            <RichText text={user().about} />
                        </Show>
                    </div>
                </Show>
            </Show>
        </>
    );
}