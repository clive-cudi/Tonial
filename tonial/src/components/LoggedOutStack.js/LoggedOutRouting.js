import React from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';

function LoggedOutRouting() {
    return (
        <div className="content">
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default LoggedOutRouting
