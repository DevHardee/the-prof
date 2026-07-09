import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EventsContent from '../components/EventsContent';

export default function Events() {
    return (
        <div className="w-full relative min-h-screen flex flex-col bg-canvas">
            <Navbar />

            <main className="flex-grow w-full">
                <EventsContent />
            </main>

            <Footer />
        </div>
    );
}