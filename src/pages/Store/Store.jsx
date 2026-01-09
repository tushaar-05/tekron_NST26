import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';
import ComingSoon from '../../components/ui/ComingSoon/ComingSoon';

function Store() {
    return (
        <UnifiedBackground>
            <MiniNavbar />
            <ComingSoon title="Store" launchDate="2024-02-01" transparent={true} />
        </UnifiedBackground>
    );
}

export default Store;
