import React, { useState, useEffect } from 'react';
import "./BookDetails.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom'; // Import useNavigate;
import EditionCard from "../EditionCard/EditionCard";


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
    const [editions, setEditions] = useState<any[]>([]); // State to store editions

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (id) {
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);
                const data = await response.json();
                setBookDetails(data);

                // Fetch editions
                const editionsResponse = await fetch(`https://openlibrary.org/works/${id}/editions.json`);
                const editionsData = await editionsResponse.json();
                setEditions(editionsData.entries);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    const handleBackButtonClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const subjectPills = (bookDetails.subjects && bookDetails.subjects.length > 0)
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
            <p> {bookDetails.description || 'Description: No description listed'}</p>
            <div>
                <h2>Subjects</h2>
                <div className="subject-pills">
                    {subjectPills}
                </div>
            </div>
            {/* Render Editions */}
            <div>
                <h2>Editions</h2>
                <div>
                    {editions.map((edition, index) => (
                        <EditionCard key={index} edition={edition} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
