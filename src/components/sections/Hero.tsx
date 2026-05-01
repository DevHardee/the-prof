import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useState } from 'react';
import SplashScreen from '../ui/SplashScreen';

export default function Hero() {
    const [_splashDone, setSplashDone] = useState(false);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const floatAnim = {
        y: [-8, 8],
        transition: { duration: 3, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const }
    };

    const floatAnimDelayed = {
        y: [8, -8],
        transition: { duration: 3.5, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const }
    };

    const miniCards = [
        { label: 'STANDARD', value: 'A standard for thinking, not a school.' },
        { label: 'HEADQUARTERS', value: 'A command center for clarity and growth.' },
        { label: 'MOVEMENT', value: 'A generation that refuses to stay average.' },
    ];

    return (
        <>
            <SplashScreen onComplete={() => setSplashDone(true)} />

            <section
                id='hero'
                className="relative w-full overflow-hidden pt-32 pb-24 sm:pt-40 md:pt-48 lg:pb-40 bg-canvas px-4 md:px-8">
                {/* Atmosphere */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <MaxWidthWrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center relative z-10 w-full">

                        {/* Content */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col"
                        >
                            {/* Eyebrow tag */}
                            <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 self-start">
                                <span className="font-display font-semibold uppercase tracking-[0.15em] text-blue text-xs border border-blue/30 rounded-full px-3 py-1">
                                    ✳ A Standard. Not A School.
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={item}
                                className="font-display font-black uppercase text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.88] text-ink"
                            >
                                You're not stuck.<br />
                                <span className="text-blue">You're just not clear.</span>
                            </motion.h1>

                            <motion.p
                                variants={item}
                                className="font-body text-muted text-lg md:text-xl max-w-md mt-10! mb-8! leading-relaxed"
                            >
                                The difference between where you are and where you want to be is knowledge — the right knowledge, in the right order. TheProfHQ is the headquarters built to deliver it.
                            </motion.p>

                            <motion.div
                                variants={item}
                                className="flex flex-col md:flex-row gap-6! mb-10!"
                            >
                                <a href="#" className="bg-blue text-white font-display font-bold uppercase tracking-wider px-8! py-4! rounded-full hover:bg-ink transition-colors duration-300 ease-brand text-center flex items-center justify-center gap-2">
                                    Charge Your Brain ⚡
                                </a>
                                <a href="#" className="bg-transparent text-ink border border-ink/30 font-display font-bold uppercase tracking-wider px-8! py-4! rounded-full hover:bg-ink hover:text-white transition-[color,background-color,border-color] duration-300 ease-brand text-center">
                                    Enter The HQ →
                                </a>
                            </motion.div>

                            {/* Mini cards */}
                            <motion.div
                                variants={item}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3! mt-2!"
                            >
                                {miniCards.map((card) => (
                                    <div key={card.label} className="border border-ink/15 rounded-xl p-4! bg-canvas/50">
                                        <p className="font-display font-semibold uppercase tracking-[0.12em] text-muted text-[10px] mb-1">
                                            {card.label}
                                        </p>
                                        <p className="font-body text-ink text-sm leading-snug">{card.value}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden lg:block relative w-full max-w-[500px] mx-auto"
                        >
                            <img src="/assets/brand-elements/Brand ELements-13.png" alt="The Prof" className="w-full h-full object-cover" />

                            {/* Floating elements */}
                            <motion.span
                                animate={floatAnim}
                                className="absolute top-8 -right-6 font-display font-black text-orange text-5xl md:text-6xl"
                            >
                                ✳
                            </motion.span>
                            <motion.span
                                animate={floatAnimDelayed}
                                className="absolute bottom-16 -left-8 font-display font-black text-blue text-5xl md:text-6xl"
                            >
                                ✳
                            </motion.span>
                            <motion.span
                                animate={floatAnim}
                                className="absolute bottom-8 -right-4 font-display font-black text-blue text-6xl md:text-7xl"
                            >
                                ⚡
                            </motion.span>
                        </motion.div>

                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
