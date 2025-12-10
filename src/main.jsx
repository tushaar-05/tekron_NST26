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
import ComingSoon from './components/ui/ComingSoon/ComingSoon';

// A wrapper component to handle loading state and route changes
function AppWrapper() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const isMapRoute = location.pathname === '/map';

    // Reset loading state when location changes
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading
        return () => clearTimeout(timer);
    }, [location]);

    if (isLoading) {
        return isMapRoute ? (
            <WorldLoading onLoadingComplete={() => setIsLoading(false)} />
        ) : (
            <Loading onLoadingComplete={() => setIsLoading(false)} />
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/map" element={<WorldMap />} />
                
                {/* Main Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/store" element={<ComingSoon title="Store" launchDate="2024-02-01" />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/competition" element={<Competition />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sponsors" element={<ComingSoon title="Sponsors" launchDate="2024-02-01" />} />
                
                {/* Redirects */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
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
