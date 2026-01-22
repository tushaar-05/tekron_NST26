import React, { useState, useEffect } from 'react';

const VisitorCounter = () => {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const NAMESPACE = 'tekron_nst26';
                const KEY = 'visit';

                // Increment on every load (Hit Counter)
                const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`);
                const data = await response.json();

                if (data && data.count) {
                    setCount(data.count);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                console.error('Error fetching visitor count:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    if (error) return null; // Hide if error

    return (
        <div className="flex items-center justify-center gap-2 font-mono text-xs md:text-sm text-cyan-500/60">
            <span className="uppercase tracking-widest">Real_Visitors:</span>
            <div className="bg-black/40 border border-cyan-500/20 px-3 py-1 rounded relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                {loading ? (
                    <span className="animate-pulse">Analyzing...</span>
                ) : (
                    <span className="text-cyan-400 font-bold tracking-widest relative z-10">
                        {count.toLocaleString().padStart(6, '0')}
                    </span>
                )}
            </div>
        </div>
    );
};

export default VisitorCounter;
