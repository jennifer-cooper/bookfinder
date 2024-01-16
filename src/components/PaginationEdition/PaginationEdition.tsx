/**
 * PaginationEdition Component
 * Purpose:
 * Provides pagination functionality for book editions allowing users to navigate between pages.
 * Props:
 * currentPage (number): The current page number.
 * totalResults (number): The total number of editions for pagination.
 * changePage (function): A function to handle the page change.
 * resultsPerPage (number): The number of results to display per page.
 * **/

import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PaginationEdition.css';


interface PaginationProps {
    currentPage: number;
    totalResults: number;
    changePage: (newPage: number) => void;
    resultsPerPage: number;
}

const PaginationEdition: React.FC<PaginationProps> = ({ currentPage, totalResults, changePage, resultsPerPage }) => {
    const startIdx = (currentPage - 1) * resultsPerPage + 1;
    const endIdx = Math.min(currentPage * resultsPerPage, totalResults);

    return (
        <div>
            <div className="editions-info">
                Showing {startIdx} to {endIdx} of {totalResults} editions
            </div>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ArrowBackIosIcon />
                </button>
                <button
                    className="pagination-button"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={totalResults <= currentPage * resultsPerPage}
                >
                    <ArrowForwardIosIcon />
                </button>
            </div>
        </div>
    );
};

export default PaginationEdition;