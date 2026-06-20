import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Zap, ArrowRight } from 'lucide-react';

export default function WhyThisExists() {
    return (
        <section id="about" className="bg-ink py-24! relative z-10 w-full overflow-hidden">
            {/* Enhanced Background atmosphere */}
            <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-orange/12 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange/8 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange/6 rounded-full blur-[90px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <MaxWidthWrapper className="relative z-10">
                <div className="space-y-16!">
                    {/* Header Section */}
                    <div className="text-center max-w-7xl mx-auto space-y-8!">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="font-display font-semibold uppercase tracking-[0.2em] text-orange text-sm"
                        >
                            Why This Exists
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                            className="font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.92]"
                        >
                            Because knowledge is power{' '}
                            <span className="text-orange"> - and power should never be locked behind privilege.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                            className="font-body text-white/70 text-base md:text-lg lg:text-2xl leading-relaxed"
                        >
                            Too many brilliant people are losing – not because they lack ability, but because the right knowledge never reached them.{' '}
                            <span className="text-white font-semibold">That ends here.</span>
                        </motion.p>
                    </div>

                    {/* Body Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8! lg:gap-12! items-start">
                        {/* Left Column — Main narrative */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                            className="space-y-6! font-body text-white/80 text-base md:text-lg lg:text-2xl leading-relaxed"
                        >
                            <p>
                                There is a version of you that never gets the information it needs. Not because you aren't smart enough. Not because you aren't willing enough. But because the knowledge that could change your life is sitting behind a paywall, inside a network you were never invited into, or in a room you didn't know existed.
                            </p>

                            <p className="text-white/60 italic">
                                That version of you stays stuck. Not by choice. By circumstance.
                            </p>
                        </motion.div>

                        {/* Right Column — The Prof's story */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                            className="space-y-6! font-body text-white/80 text-base md:text-lg lg:text-2xl leading-relaxed"
                        >
                            <p>
                                <span className="text-orange font-semibold">The Prof knows this</span> – not as a theory, but as a lived experience. Learnt every piece of clarity through confusion, every lesson through loss, every step forward through years of standing still.
                            </p>

                            <div className="bg-orange/10 backdrop-blur-xl border border-orange/20 rounded-2xl p-6! space-y-4!">
                                <div className="flex items-center gap-3!">
                                    <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
                                        <Zap size={20} className="text-orange" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="font-display font-black text-white text-lg md:text-xl lg:text-3xl uppercase">
                                        That is why the Prof exists.
                                    </h3>
                                </div>
                                <p className="text-white/90 font-semibold text-base md:text-lg lg:text-2xl">
                                    This is not a platform. <span className="text-orange">This is a correction.</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="relative py-16! px-8! md:px-12! rounded-[2.5rem] overflow-hidden"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange/15 via-orange/8 to-transparent backdrop-blur-2xl border border-orange/30" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange/15 rounded-full blur-3xl" />
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange/10 rounded-full blur-2xl" />

                        {/* Content */}
                        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8!">
                            <h3 className="font-display font-black text-white text-3xl md:text-5xl uppercase leading-tight">
                                Ready to move forward?
                            </h3>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4! pt-4!">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-orange text-white px-10! py-4! rounded-full font-display font-black uppercase text-sm tracking-[0.15em] shadow-2xl shadow-orange/30 group flex items-center gap-3!"
                                >
                                    Join The Community
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
