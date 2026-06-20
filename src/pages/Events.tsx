import { motion } from 'framer-motion';
import { Calendar, Users, Zap, ArrowRight, MapPin, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

export default function Events() {
    return (
        <div className="w-full relative min-h-screen flex flex-col bg-canvas">
            <Navbar />

            <main className="flex-grow w-full">
                {/* Hero section */}
                <section className="relative pt-16 md:pt-24 lg:pt-32 pb-20! overflow-hidden bg-ink!">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue/20 rounded-full blur-[120px] pointer-events-none" />

                    <MaxWidthWrapper className="relative z-10 text-center!">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4! py-1.5! mb-6!"
                        >
                            <Calendar className="w-4 h-4 text-blue" />
                            <span className="font-display font-bold uppercase tracking-widest text-blue text-xs">
                                The HQ Events
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display font-black uppercase text-2xl md:text-4xl lg:text-5xl text-canvas leading-tight mb-8!"
                        >
                            Connect. Learn. <br /> <span className="text-blue">Evolve.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-body text-canvas/60 text-sm md:text-lg max-w-6xl mx-auto leading-relaxed"
                        >
                            The HQ isn't just a platform; it's a movement. Join our upcoming sessions to bridge the gap between theory and high-impact execution.
                        </motion.p>
                    </MaxWidthWrapper>
                </section>

                {/* Featured Event: PM Seminar */}
                <section className="pt-10! md:pt-16 lg:pt-24 pb-10! relative">
                    <MaxWidthWrapper>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16! items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-block px-3! py-1! bg-orange/10 border border-orange/20 rounded-md mb-6!">
                                    <span className="font-display font-bold uppercase text-[10px] tracking-[0.2em] text-orange">Upcoming Seminar</span>
                                </div>
                                <h2 className="font-display font-black uppercase text-4xl md:text-5xl text-ink leading-none mb-6!">
                                    Product Management <br /> <span className="text-blue">Standard Seminar</span>
                                </h2>
                                <p className="font-body text-ink/70 text-lg leading-relaxed mb-8! max-w-lg">
                                    Master the art of building what people actually use. We're breaking down the exact frameworks used by top-tier PMs to scope, build, and ship products that scale.
                                </p>

                                <div className="space-y-4! mb-10!">
                                    <div className="flex items-center gap-4 text-ink/80">
                                        <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                                            <MapPin size={18} />
                                        </div>
                                        <span className="font-display font-semibold">The Prof HQ (Online & Physical)</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-ink/80">
                                        <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                                            <Clock size={18} />
                                        </div>
                                        <span className="font-display font-semibold">Saturday, July 15th • 10:00 AM WAT</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-ink/80">
                                        <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                                            <Users size={18} />
                                        </div>
                                        <span className="font-display font-semibold">limited to 100 participants</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4! mb-10!">
                                    <button className="group bg-ink text-canvas hover:bg-blue transition-all duration-500 px-8! py-4! rounded-full font-display font-black uppercase tracking-wider flex items-center gap-3!">
                                        Secure My Seat
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                    </button>
                                    <a
                                        href="https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group border-2 border-ink text-ink hover:bg-ink hover:text-white transition-all duration-500 px-8! py-4! rounded-full font-display font-black uppercase tracking-wider flex items-center gap-3!"
                                    >
                                        Join The Community
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                    </a>
                                </div>

                                <div className="space-y-2!">
                                    <p className="font-body text-ink/70 text-sm md:text-base flex items-center gap-2!">
                                        <span className="w-2 h-2 rounded-full bg-blue" />
                                        Have questions or want to know more about the event?
                                    </p>
                                    <p className="font-body text-ink/70 text-sm md:text-base">
                                        For partnerships or inquiries, reach out via WhatsApp: <a href="https://wa.me/2348117899169" target="_blank" className="text-blue font-bold hover:underline">+234 811 789 9169</a>
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="aspect-square bg-ink rounded-3xl overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-blue/20 mix-blend-overlay" />
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
                                        alt="PM Seminar"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

                                    <div className="absolute bottom-8! left-8! right-8!">
                                        <div className="flex items-center gap-3! mb-4!">
                                            <Zap className="text-blue fill-current" size={24} />
                                            <span className="font-display font-bold uppercase tracking-widest text-canvas text-sm">Charge Your Career</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '65%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-blue"
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2!">
                                            <span className="text-[10px] font-display font-bold text-canvas/40 uppercase">Registration Progress</span>
                                            <span className="text-[10px] font-display font-bold text-blue uppercase">65% Filled</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </main>

            <Footer />
        </div>
    );
}