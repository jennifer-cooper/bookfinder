import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import SearchHomePage from "./pages/SearchHomePage/SearchHomePage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import { SearchProvider} from "./contexts/SearchContext";


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <SearchProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchHomePage />} />
                <Route path="book/:id" element={<BookDetailsPage />} />
            </Routes>
        </BrowserRouter>
    </SearchProvider>
);