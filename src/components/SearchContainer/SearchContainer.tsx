/**
 * SearchContainer Component
 * Purpose:
 * Wrapper and layout for the search functionality of the app.
 * Includes the SearchForm component along with additional context and instructions for the user.
 * Main interface where users conduct their search.
 * Usage:
 * Separates the layout and styling of the search section from the search functionality.
 **/

import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import "./SearchContainer.css";
import Header from "../Header/Header";

const SearchContainer = () => {
    return (
        <div className='holder'>
            <Header />
            <div className="main-content">
                <div className="search-container">
                    <h3>Search</h3>
                    <div className="search-description">
                        <p>Search for a book by title, author, or subject.</p>
                        <p>Use multiple fields to narrow your search.</p>
                    </div>
                </div>
                <SearchForm />
            </div>
        </div>
    );
}

export default SearchContainer;
