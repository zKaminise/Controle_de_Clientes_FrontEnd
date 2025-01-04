import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Financeiro from './components/Financeiro';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/financeiro" element={<Financeiro />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
