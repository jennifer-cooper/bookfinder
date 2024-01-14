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