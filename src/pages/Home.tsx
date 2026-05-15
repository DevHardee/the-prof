import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
//import Ticker from '../components/sections/Ticker';
import Pillars from '../components/sections/Pillars';
import Statement from '../components/sections/Statement';
//import Topics from '../components/sections/Topics';
import Posters from '../components/sections/Posters';
import WhoItsFor from '../components/sections/WhoItsFor';
import WhyThisExists from '../components/sections/WhyThisExists';
import Testimonials from '../components/sections/Testimonials';
import TheRevolution from '../components/sections/TheRevolution';
import JoinCTA from '../components/sections/JoinCTA';

export default function Home() {
    return (
        <div className="w-full relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow w-full flex flex-col">
                {/* Hero: "You're not stuck. You're just not clear." */}
                <Hero />
                {/* The Truth: "It's not about effort. It's about direction." */}
                <Pillars />
                {/* This Is The Prof: "Not a school. Not a course. A Standard." */}
                <Statement />
                {/* What You Get: "What happens when you plug in." — 6 shifts */}
                <Posters />
                {/* Who It's For: "For everyone ready to move forward." */}
                <WhoItsFor />
                {/* Why This Exists: "Because knowledge is power..." */}
                <WhyThisExists />
                {/* Testimonials From The HQ: "Proof that clarity changes movement." */}
                <Testimonials />
                {/* The Revolution: "This is bigger than you think." */}
                <TheRevolution />
                {/* CTA: "You don't need more time. You need the right knowledge." */}
                <JoinCTA />
            </main>
            <Footer />
        </div>
    );
}