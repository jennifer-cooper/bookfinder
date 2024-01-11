// BookCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

interface BookCardProps {
    bookKey: string; // Renamed from key
    title: string;
    author: string;
    editionCount: number; // Add this line

}

const BookCard: React.FC<BookCardProps> = ({ bookKey, title, author, editionCount }) => (
    <div className="book-card">
        <h4 className="book-title">
            <Link to={`/book/${bookKey}`} className="book-link">{title}</Link>
        </h4>
        <div className="book-meta">
            <p className="book-author">by {author}</p>
            <span className="book-editions">{editionCount} editions</span>
        </div>
    </div>
);
export default BookCard;