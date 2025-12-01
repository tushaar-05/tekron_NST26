import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loading from './Loading.jsx'

function Main() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading ? (
                <Loading onLoadingComplete={() => setIsLoading(false)} />
            ) : (
                <App />
            )}
        </>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Main />
    </StrictMode>,
)
