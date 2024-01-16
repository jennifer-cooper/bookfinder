/**
 * BookDetailsPage
 * Purpose:
 * BookDetailsPage serves as a page container for displaying detailed information about a specific book.
 * It uses the BookDetails component to render the book's details based on the provided book ID.
 * Functionality:
 * The component uses the useParams hook from 'react-router-dom' to extract the book ID from the URL parameters.
 * Children Components:
 * Header: A reusable component that renders the header of the page.
 * BookDetails: A component that takes a book ID as a prop and displays detailed information about the book.
 * Usage:
 *  E.g. Route Setup:
 * <Route path="/book/:id" element={<BookDetailsPage />} />
 * e.g. when a user navigates to a URL like '/book/11111', the BookDetailsPage will render and display details for the book with ID '11111'.
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import BookDetails from '../../components/BookDetails/BookDetails';

const BookDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <main>
            <Header />
            <div className="main-content">
                {id ? <BookDetails id={id} /> : <p>Book ID not found.</p>}
            </div>
        </main>
    );
};

export default BookDetailsPage;