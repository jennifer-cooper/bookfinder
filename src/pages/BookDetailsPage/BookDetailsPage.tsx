import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import BookDetails from '../../components/BookDetails/BookDetails';

const BookDetailsPage = () => {
    const { id } = useParams<{ id: string }>(); // Define the shape of params

    // Render BookDetails only if id is defined
    return (
        <main>
            <Header />
            <div className="main-content"> {/* Begin main content area */}
                {id ? <BookDetails id={id} /> : <p>Book ID not found.</p>}
            </div>
        </main>
    );
};

export default BookDetailsPage;