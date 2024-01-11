import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage/HomePage';
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import { SearchProvider } from './SearchContext';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <SearchProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="book" element={<BookList />} />
                <Route path="book/:id" element={<BookDetailsPage />} />
            </Routes>
        </BrowserRouter>
    </SearchProvider>
);