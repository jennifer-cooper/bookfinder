import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
    return (
        <div className='holder'>
            <header className='header-banner'>
                <h3>Open Library</h3>
            </header>
            <div className="main-content"> {/* Begin main content area */}
                <div className="search-container">
                    <h3>Search</h3>
                    <div className="search-description">
                        <p>Search for a book by title, author, or subject.</p>
                        <p>Use multiple fields to narrow your search.</p>
                    </div>
                </div>
                <SearchForm />
            </div> {/* End main content area */}
        </div>
    );
}

export default Header;