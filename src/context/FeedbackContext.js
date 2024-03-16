import { createContext, useState } from "react";

export const FeedbackContext = createContext();

export const FeedbackContextProvider = ({ children }) => {

    const [selectedFeedbackType, setSelectedFeedbackType] = useState(null);

    

    return (
        <FeedbackContext.Provider value={{ selectedFeedbackType, setSelectedFeedbackType, }} >
            {children}
        </FeedbackContext.Provider>
    )
}