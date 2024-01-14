/**
 * Entry point for the React application.
 * Purpose:
 * - It initializes the React application and renders it into the root DOM element.
 * - Sets up the routing for the application using React Router.
 * - Wraps the entire application in the SearchProvider context to manage global state related to search functionality.
 * Key Components:
 * - BrowserRouter: A Router component from React Router that uses the HTML5 history API to keep UI in sync with the URL.
 * - Routes: A component that renders the first Route that matches the URL.
 * - Route: Defines the mapping between URL paths and their corresponding components.
 * - SearchProvider: Context provider that supplies search-related state and functionality to the components in the application.
 * Routes:
 * - "/" (Home Route): Renders the SearchHomePage component, which is the main page for search functionality.
 * - "book/:id" (Book Details Route): Renders the BookDetailsPage component, which displays detailed information about a specific book.
 * The ":id" in the path is a URL parameter representing the unique identifier of a book.
 **/

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