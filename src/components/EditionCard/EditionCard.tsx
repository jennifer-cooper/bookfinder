// EditionCard.tsx
import React from 'react';
import './EditionCard.css';

interface EditionCardProps {
    edition: {
        title: string;
        publish_date: string;
        publishers: string[];
        languages: string[];
        isbn_10?: string[];
        isbn_13?: string[];
    };
}

const EditionCard: React.FC<EditionCardProps> = ({ edition }) => {
    const { title, publish_date, publishers, languages, isbn_10, isbn_13 } = edition;

    return (
        <div className="edition-card">
            <h4>{title}</h4>
            <div>Publish Date: {publish_date}</div>
            <div>Publisher: {publishers?.join(', ') || 'N/A'}</div>
            <div>Language: {languages?.join(', ') || 'N/A'}</div>
            <div>ISBN-10: {isbn_10?.join(', ') || 'N/A'}</div>
            <div>ISBN-13: {isbn_13?.join(', ') || 'N/A'}</div>
        </div>
    );
};

export default EditionCard;
