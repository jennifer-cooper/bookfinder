/**
 * SearchContext and SearchProvider
 * Purpose:
 * SearchContext and SearchProvider are used to manage and provide the global state related to the search functionality.
 * SearchContext:
 * React Context that holds the global state for search results, current page, total results, and search terms.
 * Provides a way for components to access and modify this state without passing props through multiple levels.
 * SearchProvider:
 * React Context Provider that wraps around the app where the search context is needed.
 * It initializes the state and provides the context value to its children components.
 * Props (SearchProviderProps):
 * children (ReactNode): The child components that will have access to the SearchContext.
 * State (SearchContextType):
 * searchResults (any[]): The array of search results retrieved from the search query.
 * setSearchResults (function): Function to update the search results.
 * currentPage (number): The current page number in the search results pagination.
 * setCurrentPage (function): Function to update the current page number.
 * totalResults (number): The total number of search results found.
 * setTotalResults (function): Function to update the total number of search results.
 * searchTerms (SearchTerms): The search terms used in the query, including title, author, and subject.
 * setSearchTerms (function): Function to update the search terms.
 *
 * Usage:
 * Wrap the SearchProvider around components that need access to the search context.
 * Use the useContext hook with SearchContext to access and update the search-related state in child components.
 **/


import React, { createContext, useState, ReactNode } from 'react';

interface SearchTerms {
    title: string;
    author: string;
    subject: string;
}

interface SearchContextType {
    searchResults: any[];
    setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalResults: number;
    setTotalResults: React.Dispatch<React.SetStateAction<number>>;
    searchTerms: SearchTerms;
    setSearchTerms: React.Dispatch<React.SetStateAction<SearchTerms>>;
}

// Provide default values for the context
export const SearchContext = createContext<SearchContextType>({
    searchResults: [],
    setSearchResults: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    totalResults: 0,
    setTotalResults: () => {},
    searchTerms: { title: '', author: '', subject: '' },
    setSearchTerms: () => {}
});

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [searchTerms, setSearchTerms] = useState<SearchTerms>({ title: '', author: '', subject: '' });

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, currentPage, setCurrentPage, totalResults, setTotalResults, searchTerms, setSearchTerms }}>
            {children}
        </SearchContext.Provider>
    );
};
