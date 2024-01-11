import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchResults: any[];
    setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalResults: number;
    setTotalResults: React.Dispatch<React.SetStateAction<number>>;
}

// Provide a default value for the context
export const SearchContext = createContext<SearchContextType>({
    searchResults: [],
    setSearchResults: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    totalResults: 0,
    setTotalResults: () => {}
});

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, currentPage, setCurrentPage, totalResults, setTotalResults }}>
            {children}
        </SearchContext.Provider>
    );
};
