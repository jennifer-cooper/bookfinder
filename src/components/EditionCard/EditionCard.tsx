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
            <h4 className="edition-link">{title}</h4>
            <div className="year-publish">
                <p className="publish-date">{publish_date}</p>
                <span className="publisher">{publishers?.join(', ') || 'N/A'}</span>
            </div>
            <div className="language-isbn">
                <p>Language: {languages?.join(', ') || 'N/A'}</p>
                <span className="isbn">ISBN-10: {isbn_10?.join(', ') || 'N/A'}</span>
            </div>

        </div>
    );
};

export default EditionCard;
