import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Ticker from '../components/sections/Ticker';
import Pillars from '../components/sections/Pillars';
import Statement from '../components/sections/Statement';
import Topics from '../components/sections/Topics';
import JoinCTA from '../components/sections/JoinCTA';

export default function Home() {
    return (
        <div className="w-full relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow w-full flex flex-col">
                <Hero />
                <Ticker />
                <Pillars />
                <Statement />
                <Topics />
                <JoinCTA />
            </main>
            <Footer />
        </div>
    );
}