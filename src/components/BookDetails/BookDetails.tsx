import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./BookDetails.css";


interface BookDetailsData {
    title: string;
    authors: { name: string }[];
    description: string;
    // ... other properties as needed ...
    subjects: string[]; // Add this line to include subjects

}

const BookDetails: React.FC = () => {
    const [bookDetails, setBookDetails] = useState<BookDetailsData | null>(null);
    const params = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (params.id) {
                const response = await fetch(`https://openlibrary.org/works/${params.id}.json`);
                const data = await response.json();
                setBookDetails(data);
            }
        };

        fetchBookDetails();
    }, [params.id]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    // Check if subjects are present and have length; if not, set a default array with one "No Subjects Recorded" entry
    const subjectPills = (bookDetails.subjects && bookDetails.subjects.length > 0)
        ? bookDetails.subjects.slice(0, 3).map((subject, index) => (
            <span key={index} className="subject-pill">{subject}</span>
        ))
        : [<span key="default" className="subject-pill">No Subjects Recorded</span>];

    return (
        <div className='book-detail'>
            <h3>{bookDetails.title}</h3>
            <p>
                by {bookDetails.authors?.map((author) => author.name).join(', ') || 'No authors listed'}
            </p>
            <p>Description: {bookDetails.description}</p>
            {/* Use the subjectPills variable here */}
            <div>
                <h2>Subjects</h2>
                <div className="subject-pills">
                    {subjectPills}
                </div>
            </div>
        </div>
    );
}

export default BookDetails;