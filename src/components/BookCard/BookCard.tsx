/**
 * BookCard Component
 * Purpose:
 * BookCard is designed to display information about a book: title, author, and the number of editions.
 * Props:
 * bookKey (string): A unique identifier for the book, used in the routing path to the book's detail page.
 * title (string): The title of the book.
 * author (string): The name of the book's author.
 * editionCount (number): The number of editions that the book has.
 * Usage:
 * It uses the 'Link' component from 'react-router-dom' to navigate to the book's detailed view based on its bookKey.
 * Used within SearchForm to display results from the search as a series of cards.
 **/

import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

interface BookCardProps {
    bookKey: string;
    title: string;
    author: string;
    editionCount: number;

}

const BookCard: React.FC<BookCardProps> = ({ bookKey, title, author, editionCount }) => (
    <div className="book-card">
        <h4 className="book-title">
            <Link to={`/book/${bookKey}`} className="book-link">{title}</Link>
        </h4>
        <div className="book-meta">
            <p className="book-author">by {author}</p>
            <span className="book-editions">{editionCount} {editionCount === 1 ? 'edition' : 'editions'}</span>
        </div>
    </div>
);
export default BookCard;