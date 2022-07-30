import { BackIcon } from "../ionicons";
import { TitleText } from "./typography";

export default function PageTitle(props) {
    return (
        <div class="flex gap-2 mb-6 items-center transition-btm-in">
            <div class="max-w-8 max-h-8 cursor-pointer rounded-full hover:bg-gray-200 transition" onClick={ () => window.history.back() }>
                <BackIcon />
            </div>

            <div>
                <TitleText>{props.title}</TitleText>
                {props.children}
            </div>
        </div>
    )
}