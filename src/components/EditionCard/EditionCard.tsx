// EditionCard.tsx
import React, { useState, useEffect } from 'react';
import './EditionCard.css';

interface EditionCardProps {
    edition: {
        title: string;
        publish_date: string;
        publishers: string[];
        languages: { key: string }[]; // Update the type to reflect the structure
        isbn_10?: string[];
        isbn_13?: string[];
    };
}

const EditionCard: React.FC<EditionCardProps> = ({ edition }) => {
    const {title, publish_date, publishers, languages, isbn_10, isbn_13} = edition;
    const [languageName, setLanguageName] = useState('');


    useEffect(() => {
        const fetchLanguageName = async () => {
            // Assuming each edition has one primary language
            const languageKey = languages?.[0]?.key;
            if (languageKey) {
                try {
                    const response = await fetch(`https://openlibrary.org${languageKey}.json`);
                    const data = await response.json();
                    setLanguageName(data.name);
                } catch (error) {
                    console.error(`Error fetching language information: ${error}`);
                    setLanguageName('Unavailable');
                }
            }
        };

        fetchLanguageName();
    }, [languages]);

    // Determine which ISBN to display
    const displayIsbn = isbn_10 && isbn_10.length > 0 ? isbn_10.join(', ') : (isbn_13 && isbn_13.length > 0 ? isbn_13.join(', ') : 'N/A');
    const isbnLabel = isbn_10 && isbn_10.length > 0 ? 'ISBN-10' : 'ISBN-13';


    return (
        <div className="edition-card">
            <h4 className="edition-link">{title}</h4>
            <div className="year-publish">
                <p className="publish-date">{publish_date}</p>
                <span className="publisher">{publishers?.join(', ') || 'N/A'}</span>
            </div>
            <div className="language-isbn">
                <p>Language: {languageName || 'N/A'}</p>
                <span className="isbn">{isbnLabel}: {displayIsbn}</span>
            </div>
        </div>
    );
}

export default EditionCard;
