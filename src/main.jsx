import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/index.css';

// Page Components
import App from './pages/App';
import WorldMap from './components/map/WorldMap';
import Loading from './components/map/Loading';
import WorldLoading from './components/map/WorldLoading';
import About from './pages/About/About';
import Store from './pages/Store/Store';
import Gallery from './pages/Gallery/Gallery';
import Competition from './pages/Competition/Competition';
import Events from './pages/Events/Events';
import Contact from './pages/Contact/Contact';
import Sponsors from './pages/Sponsors/Sponsors';
import Hospitality from './pages/Hospitality/Hospitality';
import ComingSoon from './components/ui/ComingSoon/ComingSoon';

// A wrapper component to handle route changes
function AppWrapper() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/map" element={<WorldMap />} />

            {/* Main Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/hospitality" element={<Hospitality />} />

            {/* Redirects */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function Main() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Main />
    </StrictMode>
);
