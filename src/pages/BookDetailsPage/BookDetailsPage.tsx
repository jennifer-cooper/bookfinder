import React from 'react';
import Header from '../../components/Header/Header';
import BookDetails from '../../components/BookDetails/BookDetails';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
    const { id: id = '' } = useParams<{ id: string }>();

    return (
        <main>
            <Header />
        </main>
    );
}

export default BookDetailsPage;