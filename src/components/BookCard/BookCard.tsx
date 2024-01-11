// BookCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

interface BookCardProps {
    key: string;
    title: string;
    author: string;
}

const BookCard: React.FC<BookCardProps> = ({ key, title, author }) => (
    <div className="book-card">
        <h4 className="book-title">
            <Link to={`/book/${key}`} className="book-link">{title}</Link>  {/* Add className */}
        </h4>
        <p className="book-author">by {author}</p>
    </div>
);

export default BookCard;