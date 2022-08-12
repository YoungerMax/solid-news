import { DownvoteIcon, ShareIcon, UpvoteIcon } from "../ionicons";

export default function Score(props) {
    return (
        <div class="w-8 text-center">
            <UpvoteIcon />
            <p class="font-bold">{props.score}</p>

            <ShareIcon class="cursor-pointer" />
        </div>
    );
}