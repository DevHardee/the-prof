import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Check } from 'lucide-react';

const audienceItems = [
    'Just starting out and tired of guessing',
    'Building a side hustle into something real',
    'Transitioning into tech from any background',
    'Creating something bigger than yourself',
];

const cyclingPhrases = ['move forward.', 'charge their brain.'];

export default function WhoItsFor() {
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);
    return (
        <section className="bg-ink! py-24! relative! z-10! w-full! overflow-hidden!">
            <div className="absolute! top-0! left-0! w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />

            <MaxWidthWrapper className="relative! z-10!">
                <div className="grid! grid-cols-1! lg:grid-cols-2! gap-16! items-center!">
                    {/* Left */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! text-sm! mb-6!"
                        >
                            Who It's For
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-white! leading-[0.9]! mb-8!"
                        >
                            For everyone ready to{' '}
                            <span className="inline-block! relative! overflow-hidden! align-bottom!" style={{ minWidth: '7ch' }}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={phraseIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-blue! inline-block! whitespace-nowrap!"
                                    >
                                        {cyclingPhrases[phraseIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="font-body text-white/70! text-lg! leading-relaxed! max-w-md!"
                        >
                            No gatekeeping. No barriers. No limits. The HQ is your access point — whether you're starting from zero or scaling something already in motion.
                        </motion.p>
                    </div>

                    {/* Right — checklist */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                        className="flex! flex-col! gap-4!"
                    >
                        {audienceItems.map((item) => (
                            <motion.div
                                key={item}
                                variants={{
                                    hidden: { opacity: 0, x: 20 },
                                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="flex! items-center! gap-4! bg-ink! border! border-canvas! rounded-xl! p-5! hover:border-blue! hover:-translate-y-1! transition-all! duration-300! ease-brand!"
                            >
                                <div className="flex-shrink-0! w-6! h-6! rounded-full! bg-blue/20! flex! items-center! justify-center!">
                                    <Check size={14} className="text-blue" />
                                </div>
                                <p className="font-body text-white! text-base!">{item}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
