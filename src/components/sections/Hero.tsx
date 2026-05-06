import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useState } from 'react';
import SplashScreen from '../ui/SplashScreen';
import { Zap } from 'lucide-react';

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
                className="relative! w-full! overflow-hidden! pt-10! md:pt-14! pb-14! mb:pb-20! bg-ink! px-4! md:px-8!">
                {/* Atmosphere */}
                <div className="absolute! top-0! right-0! w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <MaxWidthWrapper>
                    <div className="grid! grid-cols-1! lg:grid-cols-2! gap-20! lg:gap-16! items-center! relative! z-10! w-full!">

                        {/* Content */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex! flex-col!"
                        >
                            {/* Eyebrow tag */}
                            <motion.div variants={item} className="mb-6! inline-flex! items-center! gap-2! self-start!">
                                <span className="font-display text-xs md:text-base font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! border! border-blue/30 rounded-full! px-3! py-1!">
                                    ✳ A Standard. Not A School.
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={item}
                                className="font-display font-black! uppercase! text-[3rem]! md:text-[4.5rem]! lg:text-[5.5rem]! leading-[0.88]! text-white!"
                            >
                                You're not stuck.<br />
                                <span className="text-blue!">You're just not clear.</span>
                            </motion.h1>

                            <motion.p
                                variants={item}
                                className="font-body text-white/70! text-lg! md:text-xl! max-w-md! mt-10! mb-8! leading-relaxed!"
                            >
                                The difference between where you are and where you want to be is knowledge — the right knowledge, in the right order. TheProfHQ is the headquarters built to deliver it.
                            </motion.p>

                            <motion.div
                                variants={item}
                                className="flex! flex-col! md:flex-row! gap-6! mb-10!"
                            >
                                <a href="#" className="bg-blue! text-white! font-display font-bold! uppercase! tracking-wider! px-8! py-4! rounded-full! hover:bg-ink! transition-colors! duration-300! ease-brand text-center! flex! items-center! justify-center! gap-2!">
                                    Charge Your Brain
                                    <Zap className="text-canvas" />
                                </a>
                                <a href="#" className="bg-orange! text-canvas! border! border-orange/30 font-display font-bold! uppercase! tracking-wider! px-8! py-4! rounded-full! hover:bg-ink! hover:text-white! transition-all! duration-300! ease-brand text-center!">
                                    Enter The HQ →
                                </a>
                            </motion.div>

                            {/* Mini cards */}
                            <motion.div
                                variants={item}
                                className="grid! grid-cols-1! md:grid-cols-3! gap-3! mt-8!"
                            >
                                {miniCards.map((card) => (
                                    <div key={card.label} className="border! border-canvas/15! hover:border-orange! hover:-translate-y-7 transition-all! duration-300! ease-brand rounded-xl! p-4! bg-ink/50!">
                                        <p className="font-display font-semibold! uppercase! tracking-[0.12em]! text-canvas! text-[10px]! md:text-xs! mb-1!">
                                            {card.label}
                                        </p>
                                        <p className="font-body text-canvas! text-sm! md:text-base! leading-snug!">{card.value}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden! lg:block! relative! w-full! max-w-[500px]! mx-auto! overflow-hidden! rounded-2xl!"
                        >
                            <img src="/assets/prof.jpeg" alt="The Prof" className="w-full! h-full! object-cover! rounded-2xl! shadow-2xl!" />

                            {/* Scanning Beam */}
                            <motion.div
                                animate={{
                                    top: ["-5%", "105%"],
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute! left-0! right-0! h-1! bg-blue! shadow-[0_0_15px_rgba(59,130,246,0.8)]! z-20! pointer-events-none!"
                            />

                            {/* Scanning Overlay (Subtle) */}
                            <motion.div
                                animate={{
                                    top: ["-100%", "100%"]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute! left-0! right-0! h-[100%]! bg-gradient-to-b! from-transparent! via-blue/10! to-transparent! z-10! pointer-events-none!"
                            />
                        </motion.div>

                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
