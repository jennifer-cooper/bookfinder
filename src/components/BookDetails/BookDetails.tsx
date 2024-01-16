/**
 * BookDetails Component
 * Purpose:
 * Displays detailed information about a specific book based on selected ID (key taken from the initial SearchQuery).
 * Shows the book's title, author(s), an expandable description, subjects, and edition cards.
 * Props:
 * id (string): The unique identifier for the book. Used to fetch book details and editions.
 * State:
 * bookDetails (object|null): Stores the detailed information about the book.
 * editions (array): Stores the editions of the book.
 * currentPage (number): The current page number in the editions pagination.
 * totalResults (number): Total number of editions available for this book.
 * showFullDescription (boolean): Flag to toggle between showing the full description or a brief one.
 * Hooks:
 * useEffect: Fetches the book details and editions from the Open Library API based on the provided book ID.
 * useState: Manages the states mentioned above.
 * Handlers:
 * getPreviewText: Extracts and returns the first 350 characters of the book's description.
 * toggleFullDescription: Toggles the state to show or hide the full book description.
 * changePage: Function to change the current page in the editions pagination.
 **/

import React, { useState, useEffect } from 'react';
import "./BookDetails.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom';
import EditionCard from "../EditionCard/EditionCard";
import PaginationEdition from "../PaginationEdition/PaginationEdition";


interface BookDetailsData {
    title: string;
    authors: { author: { key: string } }[];
    description: string;
    subjects: string[];
}

interface AuthorObject {
    author: {
        key: string;
    };
}
interface BookDetailsProps {
    id: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ id }) => {
    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState<BookDetailsData | null>(null);
    const [editions, setEditions] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const RESULTS_PER_PAGE = 10;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [authorNames, setAuthorNames] = useState<string[]>([]);


    const getPreviewText = (description?: string | { type: string; value: string }) => {
        let text = '';

        if (typeof description === 'string') {
            text = description;
        } else if (description && typeof description === 'object' && 'value' in description) {
            text = description.value;
        }

        if (text.length > 350) {
            return text.slice(0, 350) + '...';
        }

        return text || 'No description listed';
    };



    const toggleFullDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    useEffect(() => {
        const fetchBookDetails = async () => {
            if (id) {
                // Fetch book details
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);
                const data = await response.json();
                setBookDetails(data);

                // Check if authors data is available
                if (data.authors && data.authors.length > 0) {
                    // Fetch author names
                    const fetchedAuthorNames = await Promise.all(
                        data.authors.map(async (authorObj: AuthorObject) => {
                            const authorResponse = await fetch(`https://openlibrary.org${authorObj.author.key}.json`);
                            const authorData = await authorResponse.json();
                            return authorData.name;
                        })
                    );
                    setAuthorNames(fetchedAuthorNames); // Update state with fetched author names
                }

                // Fetch editions
                const editionsResponse = await fetch(`https://openlibrary.org/works/${id}/editions.json`);
                const editionsData = await editionsResponse.json();
                setEditions(editionsData.entries);
                setTotalResults(editionsData.entries.length);
            }
        };

        fetchBookDetails();
    }, [id]);

    const changePage = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Calculate displayed editions based on the current page
    const displayedEditions = editions.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
    );

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const subjectPills = bookDetails.subjects?.length > 0
        ? bookDetails.subjects.slice(0, 3).map((subject, index) => (
            <span key={index} className="subject-pill">{subject}</span>
        ))
        : [<span key="default" className="subject-pill">No Subjects Listed</span>];



    return (
        <div className='book-detail'>
            <div className='backbutton-title'>
                <button className="back-button" onClick={handleBackButtonClick}>
                    <ArrowBackIosIcon style={{ fontSize: '12px' }} />
                    Back
                </button>
                <h3>{bookDetails.title}</h3>
            </div>
            <p>
                by {authorNames.join(', ') || 'No authors listed'}
            </p>
            <p>
                {showFullDescription ? bookDetails?.description : getPreviewText(bookDetails?.description)}
                {bookDetails?.description && getPreviewText(bookDetails?.description).length > 350 && (
                    <div className="more-link-container">
            <span className="more-link" onClick={toggleFullDescription}>
                {showFullDescription ? 'Less' : 'More...'}
            </span>
                    </div>
                )}
            </p>

            <div>
                <h2>Subjects</h2>
                <div className="subject-pills">
                    {subjectPills}
                </div>
            </div>
            <h2>Editions</h2>
            {/* Pagination Component */}
            <div>
                <PaginationEdition
                    currentPage={currentPage}
                    totalResults={totalResults}
                    changePage={changePage}
                    resultsPerPage={RESULTS_PER_PAGE}
                />
            </div>
            <div>
                {displayedEditions.map((edition, index) => (
                    <EditionCard key={index} edition={edition} />
                ))}
            </div>


        </div>
    );
};

export default BookDetails;