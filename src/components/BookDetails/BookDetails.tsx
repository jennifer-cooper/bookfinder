/**
 * BookDetails Component
 * Purpose:
 * Displays detailed information about a specific book based on selected ID.
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
 * getFirstTwoSentences: Extracts and returns the first two sentences from the book's description.
 * toggleFullDescription: Toggles the state to show or hide the full book description.
 * changePage: Function to change the current page in the editions pagination.
 **/

import React, { useState, useEffect } from 'react';
import "./BookDetails.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom'; // Import useNavigate;
import EditionCard from "../EditionCard/EditionCard";
import PaginationEdition from "../PaginationEdition/PaginationEdition";


interface BookDetailsData {
    title: string;
    authors: { name: string }[];
    description: string;
    subjects: string[]; // Assuming this is included in your data structure
}

interface BookDetailsProps {
    id: string; // Add this to accept 'id' as a prop
}

const BookDetails: React.FC<BookDetailsProps> = ({ id }) => {
    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState<BookDetailsData | null>(null);
    const [editions, setEditions] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const RESULTS_PER_PAGE = 10;
    const [showFullDescription, setShowFullDescription] = useState(false); //adding state to toggle full description

    const getFirstTwoSentences = (text: string | undefined | null) => {
        if (typeof text !== 'string') {
            return '';
        }

        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        return sentences.slice(0, 2).join(' ');
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
                by {bookDetails.authors?.map((author) => author.name).join(', ') || 'No authors listed'}
            </p>
            <p>
                {showFullDescription || !bookDetails?.description
                    ? bookDetails?.description
                    : `${getFirstTwoSentences(bookDetails.description)}... `}
            </p>
            {bookDetails?.description && bookDetails.description.length > getFirstTwoSentences(bookDetails.description).length && (
                <div className="more-link-container">
                    <span className="more-link" onClick={toggleFullDescription}>
                        <h4> {showFullDescription ? 'Less' : 'More...'} </h4>
                    </span>
                </div>
            )}

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