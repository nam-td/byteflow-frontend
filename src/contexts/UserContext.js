import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [trackedUsername, setTrackedUsername] = useState("");
    return (
        <UserContext.Provider value={{userInfo, setUserInfo, trackedUsername, setTrackedUsername}}>
            {children}
        </UserContext.Provider>
    )
}

