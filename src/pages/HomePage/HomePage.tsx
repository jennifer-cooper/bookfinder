import React from 'react';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    return (
        <main>
            <SearchContainer />
            <Outlet />
        </main>
    )
}

export default HomePage