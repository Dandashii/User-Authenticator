import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import './assets/styling/index.scss';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home />}/>
            <Route path="profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
);

