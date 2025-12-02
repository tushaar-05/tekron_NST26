function WorldMap() {
    const cloudStyle = {
        position: 'absolute',
        width: '500px',
        height: 'auto',
        zIndex: 1
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Main Background */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: 'url(/images/map/main.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            
            {/* Cloud 1 - Top Left */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 1" 
                style={{
                    ...cloudStyle,
                    top: '-20px',
                    left: '-20px'
                }}
            />
            
            {/* Cloud 2 - Top Right */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 2" 
                style={{
                    ...cloudStyle,
                    top: '-20px',
                    right: '-20px',
                    transform: 'scaleX(-1)'
                }}
            />
            
            {/* Cloud 3 - Bottom Left */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 3" 
                style={{
                    ...cloudStyle,
                    bottom: '-20px',
                    left: '-20px',
                    transform: 'scaleY(-1)'
                }}
            />
            
            {/* Cloud 4 - Bottom Right */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 4" 
                style={{
                    ...cloudStyle,
                    bottom: '20px',
                    right: '20px',
                    transform: 'scale(-1)'
                }}
            />
        </div>
    );
}

export default WorldMap;