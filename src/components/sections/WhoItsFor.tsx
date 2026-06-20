import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Check, ArrowRight } from 'lucide-react';

const audienceItems = [
    'You\'re at the beginning and everyone around you seems to know something you don\'t, and you\'re tired of pretending otherwise',
    'You have an idea that won\'t leave you alone and you\'re ready to stop calling it a dream and start building it properly',
    'You want to break into tech but don\'t know where the door is, who has the key, or whether someone like you is even allowed in',
    'You\'re stuck in the wrong career, the wrong city, or the wrong chapter, and you know it\'s time to rewrite it',
    'You\'ve been knocked down by people, by circumstances, by your own mistakes, and you\'re quietly rebuilding and refusing to quit',
    'You\'re done surviving. You\'re ready to build something that outlasts you, that means something, that makes the struggle worth it'
];

const cyclingPhrases = [
    'who wants to move forward.',
    'who wants to charge their brain.',
    'who knows they\'re built for more.'
];

export default function WhoItsFor() {
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % cyclingPhrases.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-ink py-24! relative z-10 w-full overflow-hidden">
            {/* Background atmosphere */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl pointer-events-none" />

            <MaxWidthWrapper className="relative z-10">
                <div className="space-y-20!">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12! lg:gap-20! items-start">
                        {/* Left — Title & Description */}
                        <div className="space-y-8!">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="font-display font-semibold uppercase tracking-[0.2em] text-blue-mid text-sm"
                            >
                                Who It's For
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-6!"
                            >
                                <h2 className="font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                                    For the one
                                </h2>

                                {/* Cycling phrase container with fixed height */}
                                <div className="relative h-[100px] md:h-[110px] lg:h-[170px] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.h2
                                            key={phraseIndex}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -40 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-0 left-0 font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl text-blue leading-[0.95]"
                                        >
                                            {cyclingPhrases[phraseIndex]}
                                        </motion.h2>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                className="font-body text-white/70 text-base md:text-lg lg:text-2xl leading-relaxed max-w-lg"
                            >
                                No gatekeeping. No barriers. No limits. The Prof is your access point – whether you're starting from zero or scaling something already in motion. If you're willing to learn, you already qualify.
                            </motion.p>
                        </div>

                        {/* Right — Visual accent card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="relative bg-blue/10 backdrop-blur-xl border border-blue/20 rounded-3xl p-8! md:p-12! overflow-hidden"
                        >
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue/20 rounded-full blur-3xl" />
                            <div className="relative z-10 space-y-6!">
                                <div className="w-16 h-16 rounded-2xl bg-blue/20 flex items-center justify-center">
                                    <Check size={32} className="text-blue" strokeWidth={3} />
                                </div>
                                <h3 className="font-display font-black text-white text-lg md:text-xl lg:text-3xl uppercase leading-tight">
                                    You're exactly who this is for.
                                </h3>
                                <p className="font-body text-white/60 text-base md:text-lg lg:text-2xl leading-relaxed">
                                    This isn't for people who have it all figured out. It's for the ones in motion, the ones rebuilding, the ones refusing to settle.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Audience Checklist */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4! md:gap-5!"
                    >
                        {audienceItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="group relative flex items-start gap-4! bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6! hover:bg-blue/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                            >
                                {/* Animated border wrapper */}
                                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                    {/* Static border */}
                                    <div className="absolute inset-0 border border-canvas/10 rounded-2xl group-hover:border-blue/30 transition-colors duration-500" />

                                    {/* Animated traveling light border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            background: `conic-gradient(from ${index * 60}deg, transparent 0deg, transparent 270deg, rgba(59, 130, 246, 0.8) 300deg, rgba(59, 130, 246, 0) 360deg)`,
                                            padding: '1px',
                                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            WebkitMaskComposite: 'xor',
                                            maskComposite: 'exclude'
                                        }}
                                        animate={{
                                            rotate: [0, 360]
                                        }}
                                        transition={{
                                            duration: 4,
                                            ease: "linear",
                                            repeat: Infinity,
                                            delay: index * 0.3
                                        }}
                                    />
                                </div>

                                <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-blue/20 flex items-center justify-center group-hover:bg-blue/30 group-hover:scale-110 transition-all duration-300 relative z-10">
                                    <Check size={14} className="text-blue" strokeWidth={3} />
                                </div>
                                <p className="font-body text-white/80 text-base md:text-lg lg:text-2xl leading-relaxed group-hover:text-white transition-colors relative z-10">
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Closing CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative py-16! md:py-20! px-8! md:px-12! rounded-[2.5rem] overflow-hidden"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-blue/5 to-transparent backdrop-blur-2xl border border-blue/20" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue/10 rounded-full blur-3xl" />

                        {/* Content */}
                        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8!">
                            <h3 className="font-display font-black text-white text-2xl md:text-4xl lg:text-5xl uppercase leading-tight">
                                If any of these is you,<br />
                                <span className="text-blue">you're exactly who The Prof built this for.</span>
                            </h3>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4! pt-4!">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue text-white px-10! py-4! rounded-full font-display font-black uppercase text-sm tracking-[0.15em] shadow-2xl shadow-blue/30 group flex items-center gap-3!"
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
