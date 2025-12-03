import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/index.css';
import App from './pages/App.jsx';
import WorldMap from './components/map/WorldMap.jsx';
import Loading from './components/map/Loading.jsx';
import WorldLoading from './components/map/WorldLoading.jsx';

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
