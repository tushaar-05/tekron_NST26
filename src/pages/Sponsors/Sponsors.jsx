import { useEffect, useState } from 'react';

function Sponsors() {
    const [sponsors, setSponsors] = useState({
        title: [],
        platinum: [],
        gold: [],
        silver: [],
        bronze: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you would fetch this data from an API
        const timer = setTimeout(() => {
            setSponsors({
                title: [
                    { id: 1, name: 'Tech Giant Inc.', logo: '/src/assets/images/sponsors/tech-giant.png', url: '#' },
                ],
                platinum: [
                    { id: 2, name: 'Innovate Corp', logo: '/src/assets/images/sponsors/innovate.png', url: '#' },
                    { id: 3, name: 'Future Labs', logo: '/src/assets/images/sponsors/future-labs.png', url: '#' },
                ],
                gold: [
                    { id: 4, name: 'Code Masters', logo: '/src/assets/images/sponsors/code-masters.png', url: '#' },
                    { id: 5, name: 'Pixel Perfect', logo: '/src/assets/images/sponsors/pixel-perfect.png', url: '#' },
                    { id: 6, name: 'Byte Size', logo: '/src/assets/images/sponsors/byte-size.png', url: '#' },
                ],
                silver: [
                    { id: 7, name: 'Web Wizards', logo: '/src/assets/images/sponsors/web-wizards.png', url: '#' },
                    { id: 8, name: 'Data Drift', logo: '/src/assets/images/sponsors/data-drift.png', url: '#' },
                    { id: 9, name: 'Cloud Nine', logo: '/src/assets/images/sponsors/cloud-nine.png', url: '#' },
                    { id: 10, name: 'Logic Leap', logo: '/src/assets/images/sponsors/logic-leap.png', url: '#' },
                ],
                bronze: [
                    { id: 11, name: 'Startup X', logo: '/src/assets/images/sponsors/startup-x.png', url: '#' },
                    { id: 12, name: 'Tech Start', logo: '/src/assets/images/sponsors/tech-start.png', url: '#' },
                    { id: 13, name: 'Digital Dreams', logo: '/src/assets/images/sponsors/digital-dreams.png', url: '#' },
                ]
            });
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const renderSponsorTier = (tier, sponsors, colorClass) => (
        <div key={tier} className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-center ${colorClass}`}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
                {sponsors.map((sponsor) => (
                    <a 
                        key={sponsor.id} 
                        href={sponsor.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                            <img 
                                src={sponsor.logo} 
                                alt={sponsor.name}
                                className="max-w-full max-h-full object-contain p-2"
                            />
                        </div>
                        <span className="text-center text-sm md:text-base">{sponsor.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-2xl">Loading sponsors...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center">Our Sponsors</h1>
                
                <div className="space-y-16">
                    {sponsors.title.length > 0 && renderSponsorTier('title', sponsors.title, 'text-yellow-400')}
                    {sponsors.platinum.length > 0 && renderSponsorTier('platinum', sponsors.platinum, 'text-gray-300')}
                    {sponsors.gold.length > 0 && renderSponsorTier('gold', sponsors.gold, 'text-yellow-500')}
                    {sponsors.silver.length > 0 && renderSponsorTier('silver', sponsors.silver, 'text-gray-400')}
                    {sponsors.bronze.length > 0 && renderSponsorTier('bronze', sponsors.bronze, 'text-yellow-700')}
                </div>

                <div className="mt-16 p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Become a Sponsor</h2>
                    <p className="mb-6 text-gray-300">
                        Interested in becoming a sponsor? Contact us to learn about sponsorship opportunities and how your organization can support our event.
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Sponsors;
