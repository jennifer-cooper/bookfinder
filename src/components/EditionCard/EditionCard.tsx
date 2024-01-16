/**
 * EditionCard Component
 * Purpose:
 * Displays the details of a specific edition of the selected book.
 * Includes the edition title, publication date, publishers, (fetched) language, and ISBN numbers (either ISBN-10/13).
 * Dynamically fetches/displays the name of the language from the API using the language key from the edition data.
 * Props:
 * edition (object): Contains details of the book edition, including:
 * title (string), publish_date (string)
 * publishers (array of strings): An array of publishers' names.
 * languages (array of objects): An array where each object contains a key for a language ("/languages/eng").
 * isbn_10 (array of strings, optional): An array of ISBN-10 numbers.
 * isbn_13 (array of strings, optional): An array of ISBN-13 numbers.
 * State:
 * languageName (string): Stores the name of the language fetched based on the language key.
 * useEffect Hook:
 * Fetches the language name using the provided language key from the Open Library API.
 * Updates the `languageName` state with the fetched language name or 'Unavailable' in case of error.
**/

import React, { useState, useEffect } from 'react';
import './EditionCard.css';

interface EditionCardProps {
    edition: {
        title: string;
        publish_date: string;
        publishers: string[];
        languages: { key: string }[];
        isbn_10?: string[];
        isbn_13?: string[];
    };
}

const EditionCard: React.FC<EditionCardProps> = ({ edition }) => {
    const {title, publish_date, publishers, languages, isbn_10, isbn_13} = edition;
    const [languageName, setLanguageName] = useState('');


    useEffect(() => {
        const fetchLanguageName = async () => {
            // Taking one primary language from each edition
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

    // Determining which ISBN to display
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
                <p className="lang">Language: {languageName || 'N/A'}</p>
                <span className="isbn">{isbnLabel}: {displayIsbn}</span>
            </div>
        </div>
    );
}

export default EditionCard;
