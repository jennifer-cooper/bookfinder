import React, { useState, useContext } from 'react';
import './SearchForm.css';
import BookCard from '../BookCard/BookCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SearchContext } from '../../SearchContext';

const SearchForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    const {
        searchResults,
        setSearchResults,
        currentPage,
        setCurrentPage,
        totalResults,
        setTotalResults
    } = useContext(SearchContext);

    const RESULTS_PER_PAGE = 10;

    // Function to handle page change
    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalResults / RESULTS_PER_PAGE)) {
            handleSearch(newPage);
        }
    };


    const handleSearch = async (page = 1) => {
        setCurrentPage(page);
        let searchTerms = [];
        if (title) searchTerms.push(`title:${encodeURIComponent(title)}`);
        if (author) searchTerms.push(`author:${encodeURIComponent(author)}`);
        if (subject) searchTerms.push(`subject:${encodeURIComponent(subject)}`);

        let searchTerm = searchTerms.join('+');
        if (searchTerm) {
            let query = `https://openlibrary.org/search.json?q=${searchTerm}&fields=key,title,author_name,edition_count&limit=10&page=${page}`;
            try {
                const response = await fetch(query);
                const data = await response.json();
                setSearchResults(data.docs);
                setTotalResults(data.numFound);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const onSearchButtonClick = () => {
        handleSearch();
    };

    const startIdx = (currentPage - 1) * RESULTS_PER_PAGE + 1;
    const endIdx = Math.min(currentPage * RESULTS_PER_PAGE, totalResults);



    return (
        <>
            <div className="search-fields-container">
                <div className="inputs-and-button-container"> {/* Wrapper div */}
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Search by title"
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Search by author"
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="subject">Subject</label>
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Search by subject"
                        />
                    </div>
                    <div className="search-button-container">
                        <button className="search-button" onClick={onSearchButtonClick}>Search</button>
                    </div>
                </div>
                {/* End of wrapper div */}
            </div>
            <div className="results-info">
                Showing {startIdx} to {endIdx} of {totalResults} results
            </div>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ArrowBackIosIcon />
                </button>
                <button
                    className="pagination-button"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={totalResults <= currentPage * RESULTS_PER_PAGE}
                >
                    <ArrowForwardIosIcon /> {/* Correct icon for the next page */}
                </button>
            </div>
            {/* Results container for displaying search results */}
            <div className="results-container">
                {searchResults.map((book) => (
                    <BookCard
                        key={book.key}
                        bookKey={book.key.split('/').pop()}
                        title={book.title}
                        author={Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Unknown Author'}
                        editionCount={book.edition_count}
                    />
                ))}
            </div>
        </>
    );
};

export default SearchForm;