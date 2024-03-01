import ProvideGeneralFeedback from "../../../features/FeedbackRatings/ProvideGeneralFeedback";
import ProvideServiceSpecificFeedback from "../../../features/FeedbackRatings/ProvideServiceSpecificFeedback";

export default function FeedbackRatings() {
    return (
        <div>
            <ProvideGeneralFeedback />
            <ProvideServiceSpecificFeedback />
        </div>
    );
}