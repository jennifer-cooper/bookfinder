// BookCard.tsx
import React from 'react';
import './BookCard.css'; // Ensure this path matches your CSS file's location

interface BookCardProps {
    title: string;
    author: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author }) => (
    <div className="book-card">
        <h4 className="book-title">{title}</h4>
        <p className="book-author">by {author}</p>
    </div>
);

export default BookCard;
