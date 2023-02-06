import React, {useContext, createContext} from "react";

export const FeedContext = createContext(null);

export default function useFeedContext() {
    return useContext(FeedContext);
}

