import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateLocation from './pages/CreateLocation';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route element={Home} path="/" />
            <Route element={CreateLocation} path="/create-location" />
        </BrowserRouter>
    );
}

export default Routes;