import ProvideFeedbackMain from "../../../features/FeedbackRatings/ProvideFeedbackMain";
import { FeedbackContextProvider } from "../../../context/FeedbackContext";

export default function FeedbackRatings() {
  return (
    <FeedbackContextProvider >
      <ProvideFeedbackMain />
    </FeedbackContextProvider>
  );
}