import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface BookDetailsData {
    title: string;
    authors: { name: string }[];
    description: string;
    // ... other properties as needed ...
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

    return (
        <div>
            <h1>{bookDetails.title}</h1>
            <p>Author: {bookDetails.authors.map((author) => author.name).join(', ')}</p>
            <p>Description: {bookDetails.description}</p>
        </div>
    );
};

export default BookDetails;