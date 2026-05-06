import { motion } from 'framer-motion';
import { Compass, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function Ecosystem() {
    const navigate = useNavigate();

    return (
        <section className="py-24! bg-ink! relative! overflow-hidden!">
            {/* Subtle background flair */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px] pointer-events-none" />

            <MaxWidthWrapper>
                <div className="text-center mb-16!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! text-sm! mb-4!"
                    >
                        The Ecosystem
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! text-white! leading-none!"
                    >
                        Beyond the <span className="text-blue!">Pillars.</span>
                    </motion.h2>
                </div>

                <div className="grid! grid-cols-1! md:grid-cols-2! gap-8!">
                    {/* TechPath Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        onClick={() => navigate('/techpath')}
                        className="group! relative! bg-canvas! rounded-3xl! p-10! cursor-pointer! overflow-hidden!"
                    >
                        <div className="absolute top-0 right-0 p-8! opacity-10! group-hover:opacity-20! transition-opacity!">
                            <Compass size={120} className="text-canvas" />
                        </div>

                        <div className="relative! z-10!">
                            <div className="w-12! h-12! bg-blue/20! rounded-xl! flex! items-center! justify-center! mb-8! group-hover:bg-blue! transition-colors!">
                                <Sparkles className="text-blue! group-hover:text-white! transition-colors!" size={24} />
                            </div>
                            <h3 className="font-display font-black! uppercase! text-2xl! text-ink! mb-4!">TechPath</h3>
                            <p className="font-body text-ink/60! text-base! mb-8! max-w-xs!">
                                Translate your current strengths into a clear digital career route. Find where you fit in tech.
                            </p>
                            <div className="flex! items-center! gap-2! text-blue! font-display font-bold! uppercase! text-sm! tracking-wider!">
                                Find Your Path
                                <ArrowRight size={16} className="group-hover:translate-x-1! transition-transform!" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Events Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        onClick={() => navigate('/events')}
                        className="group! relative! border! border-white/10! rounded-3xl! p-10! cursor-pointer! overflow-hidden! bg-canvas!"
                    >
                        <div className="absolute top-0 right-0 p-8! opacity-5! group-hover:opacity-10! transition-opacity!">
                            <Calendar size={120} className="text-ink" />
                        </div>

                        <div className="relative! z-10!">
                            <div className="w-12! h-12! bg-ink/5! rounded-xl! flex! items-center! justify-center! mb-8! group-hover:bg-ink! transition-colors!">
                                <Calendar className="text-ink! group-hover:text-white! transition-colors!" size={24} />
                            </div>
                            <h3 className="font-display font-black! uppercase! text-2xl! text-ink! mb-4!">Events</h3>
                            <p className="font-body text-ink/60! text-base! mb-8! max-w-xs!">
                                Join high-impact seminars and connect with a community of high-performers.
                            </p>
                            <div className="flex! items-center! gap-2! text-ink! font-display font-bold! uppercase! text-sm! tracking-wider!">
                                view upcoming events
                                <ArrowRight size={16} className="group-hover:translate-x-1! transition-transform!" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
