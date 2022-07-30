import { DownvoteIcon, UpvoteIcon } from "../ionicons";

export default function Score(props) {
    return (
        <div class="my-auto text-center">
            <UpvoteIcon />
            <p class="font-bold">{props.score}</p>
            <DownvoteIcon />
        </div>
    );
}