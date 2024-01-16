/**
 * SearchHomePage
 * Purpose:
 * SearchHomePage is the primary page for displaying book search results.
 * Functionality:
 * The component primarily renders the SearchContainer component, which includes the search input fields and the search button.
 * It uses the Outlet component from 'react-router-dom' to render any nested routes' components.
 * Children Components:
 * SearchContainer: A component that includes the search input fields and the search button.
 * Outlet: A special component from 'react-router-dom' that renders the appropriate child route component based on the current URL.
 * E.g. Route Setup:
 * <Route path="/search" element={<SearchHomePage />}>
 *   <Route path="results" element={<SearchResults />} />
 * </Route>
 * In this setup, navigating to '/search' displays the SearchHomePage with the SearchContainer.
 * If the URL changes to '/search/results', the SearchResults component will be rendered inside
 * the SearchHomePage layout, thanks to the Outlet component.
 */

import React from 'react';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import { Outlet } from 'react-router-dom';

const SearchHomePage = () => {
    return (
        <main>
            <SearchContainer />
            <Outlet />
        </main>
    )
}

export default SearchHomePage