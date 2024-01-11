// BookCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

interface BookCardProps {
    bookKey: string; // Renamed from key
    title: string;
    author: string;
}

const BookCard: React.FC<BookCardProps> = ({ bookKey, title, author }) => (
    <div className="book-card">
        <h4 className="book-title">
            <Link to={`/book/${bookKey}`} className="book-link">{title}</Link>
        </h4>
        <p className="book-author">by {author}</p>
    </div>
);

export default BookCard;