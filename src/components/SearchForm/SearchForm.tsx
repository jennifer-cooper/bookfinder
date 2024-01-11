// SearchForm.tsx
import React, { useState } from 'react';
import './SearchForm.css';
import BookCard from '../BookCard/BookCard'; // Make sure the path is correct


const SearchForm = () => {
    // state vars
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    const [books, setBooks] = useState<any[]>([]); // Use any[] or create a type/interface for book
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);



    // on button click
    const handleSearch = async (page = 1) => {
        // Update the current page
        setCurrentPage(page);

        // Array to hold the search terms
        let searchTerms = [];

        // Add the search terms based on user input
        if (title) searchTerms.push(`title:${encodeURIComponent(title)}`);
        if (author) searchTerms.push(`author:${encodeURIComponent(author)}`);
        if (subject) searchTerms.push(`subject:${encodeURIComponent(subject)}`);

        // Construct the final search term by joining the individual terms with '+'
        let searchTerm = searchTerms.join('+');

        // If there is at least one search term, perform the search
        if (searchTerm) {
            let query = `https://openlibrary.org/search.json?q=${searchTerm}&fields=key,title,author_name,edition_count&limit=10&page=${page}`;

            try {
                const response = await fetch(query);
                const data = await response.json();
                setBooks(data.docs); // Assuming you have a state variable called 'books'
                setTotalResults(data.numFound); // Set the total number of results

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error appropriately
            }
        }
    };

    // Event handler for the Search button click
    const onSearchButtonClick = () => {
        handleSearch(); // Calls handleSearch with the default page
    };

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
                Showing {books.length} of {totalResults} results
            </div>
            {/* Results container for displaying search results */}
            <div className="results-container">
                {books.map((book) => (
                    <BookCard
                        key={book.key}
                        title={book.title}
                        author={Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Unknown Author'}
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handleSearch(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handleSearch(currentPage + 1)}>
                    Next
                </button>
            </div>
        </>
    );
}
    export default SearchForm;
