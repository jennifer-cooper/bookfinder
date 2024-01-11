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
