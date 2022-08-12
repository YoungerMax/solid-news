import { createEffect, createSignal } from "solid-js";
import { produce } from "solid-js/store";
import PageTitle from "../../components/pagetitle";
import AppState from "../../state";

function BooleanSetting(props) {
    return <input onInput={e => props.setValue(e.currentTarget.checked)} type="checkbox" checked={props.getValue()}  />
}

function NumberSetting(props) {
    return <input onInput={e => props.setValue(parseFloat(e.currentTarget.value))} type="number" value={props.getValue()} {...props} />
}

function Setting(props) {
    const [ appState, setAppState ] = AppState;
    const [ getValue, setValue ] = createSignal(appState.settings[props.key]);
    let comp = props.component({ getValue: getValue, setValue: setValue, ...props });

    createEffect(() => {
        setAppState('settings', produce(settings => {
            settings[props.key] = getValue();
        }));

        localStorage.setItem('settings', JSON.stringify(appState.settings));
    });

    return (
        <div class="bg-gray-100 rounded p-2 transition-btm-in flex">
            <div>
                <h1 class="text-xl font-bold">{props.name}</h1>
                <p>{props.desc}</p>
            </div>

            <div class="ml-auto">
                {comp}
            </div>
        </div>
    );
}

export default function Settings() {
    return (
        <div>
            <PageTitle title="Settings">Changes will be saved automatically</PageTitle>

            <section class="grid gap-2">
                <Setting key="show-dead-comments" name="Show dead comments" desc="Prevents dead comments from appearing" component={BooleanSetting} />

                <Setting key="show-deleted-comments" name="Show deleted comments" desc="Prevents deleted comments from appearing" component={BooleanSetting} />

                <Setting key="only-show-domains-for-links" name="Only show domains for links" desc="Instead of displaying the entire link in the post, the domain of the link will be shown" component={BooleanSetting} />

                <Setting key="show-post-type" name="Show post type" desc="Controls the visiblity of small text above the headline of each post" component={BooleanSetting} />

                <Setting key="number-of-posts-to-load" name="Number of posts to load" desc="Controls how many posts should be loaded each time more posts are loaded" component={NumberSetting} min={1} />
                
                <Setting key="number-of-comments-to-load" name="Number of comments to load" desc="Controls how many comments should be loaded each time more are loaded" component={NumberSetting} min={1} />

                <Setting key="number-of-child-comments-to-load" name="Number of child comments to load" desc="Controls how many child comments should be loaded each time more are loaded" component={NumberSetting} />
            </section>
        </div>
    );
}