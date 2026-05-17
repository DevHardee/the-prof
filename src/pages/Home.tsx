import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import TheTruth from '../components/sections/TheTruth';
import TheProf from '../components/sections/TheProf';
import WhatYouGet from '../components/sections/WhatYouGet';
import WhoItsFor from '../components/sections/WhoItsFor';
import WhyThisExists from '../components/sections/WhyThisExists';
import Testimonials from '../components/sections/Testimonials';
import TheRevolution from '../components/sections/TheRevolution';
import JoinCTA from '../components/sections/JoinCTA';

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        const state = location.state as { scrollTo?: string } | null;
        const targetId = state?.scrollTo;

        if (targetId) {
            // Wait for the page to fully render
            const timeoutId = setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);

            // Clear the state to prevent scrolling again on subsequent renders
            window.history.replaceState({}, document.title);

            return () => clearTimeout(timeoutId);
        }
    }, [location]);

    return (
        <div className="w-full relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow w-full flex flex-col">
                {/* Hero: "You're not stuck. You're just not clear." */}
                <Hero />

                {/* The Truth: "It's not about effort. It's about direction." */}
                <TheTruth />

                {/* This Is The Prof: "Not a school. Not a course. A Standard." */}
                <TheProf />

                {/* What You Get: "What happens when you plug in." — 6 shifts */}
                <WhatYouGet />

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