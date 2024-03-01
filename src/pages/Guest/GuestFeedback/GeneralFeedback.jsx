import { Outlet } from "react-router-dom";
import ProvideGeneralFeedback from "../../../features/FeedbackRatings/ProvideGeneralFeedback";
export default function GeneralFeedback() {
    return (
        <div>
            <h1>General Feedback</h1>
            <ProvideGeneralFeedback />
        </div>
    );
}