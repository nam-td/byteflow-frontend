import { useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchContext = createContext({});

export const SearchContextProvider = ({children}) => {
    const [searchRedirect, setSearchRedirect] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({});
    return (
        <SearchContext.Provider 
        value={{
            searchRedirect,
            setSearchRedirect,
            searchParams,
            setSearchParams,
            query,
            setQuery
            }}>
            {children}
        </SearchContext.Provider>
    )
}

