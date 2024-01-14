/**
 * Header Component
 * Purpose:
 * - Header for the app.
 * - To provide consistent header/branding across pages.
 **/

import React from 'react';
import "./Header.css";

const Header = () => {
    return (
        <div className='holder'>
            <header className='header-banner'>
                <h3>Open Library</h3>
            </header>
        </div>

    );
}

export default Header;