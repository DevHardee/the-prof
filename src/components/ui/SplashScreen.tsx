import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [visible, setVisible] = useState(true);
    const [phase, setPhase] = useState<'charging' | 'complete' | 'exit'>('charging');

    const text = "CHARGE YOUR BRAIN";
    const letters = text.split('');

    useEffect(() => {
        // Phase 1: charging letters (0 - 1800ms)
        // Phase 2: complete hold (1800 - 2600ms)
        // Phase 3: exit (2600ms+)
        const t1 = setTimeout(() => setPhase('complete'), 1800);
        const t2 = setTimeout(() => setPhase('exit'), 2600);
        const t3 = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 3200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="fixed inset-0 z-[999] bg-ink flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Atmospheric background pulse */}
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: phase === 'exit' ? 0 : 0.08 }}
                        transition={{ duration: 2.5, ease: 'easeOut' }}
                        className="absolute w-[700px] h-[700px] rounded-full bg-orange pointer-events-none"
                    />

                    {/* Main content with heart rate monitors on sides */}
                    <div className="relative z-10 flex items-center gap-2 md:gap-6 select-none px-4">
                        {/* Left heart rate monitor */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: phase === 'exit' ? 0 : 1,
                                x: 0
                            }}
                            transition={{
                                opacity: { duration: 0.4 },
                                x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                            }}
                            className="flex-shrink-0"
                        >
                            <svg
                                className="w-12 h-8 md:w-20 md:h-12 text-orange drop-shadow-[0_0_10px_rgba(255,103,0,0.6)]"
                                viewBox="0 0 80 50"
                            >
                                <motion.path
                                    d="M 0,25 L 15,25 L 22,10 L 29,40 L 36,15 L 43,30 L 50,25 L 80,25"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        pathLength: { duration: 1.0, ease: "easeInOut" }
                                    }}
                                />
                            </svg>
                        </motion.div>

                        {/* Letter-by-letter charging text */}
                        <div className="flex items-center justify-center flex-1 min-w-0">
                            <span className="font-display font-black uppercase leading-none text-orange whitespace-nowrap"
                                style={{ fontSize: 'clamp(1.25rem, 4.5vw, 4rem)', letterSpacing: '0.02em' }}
                            >
                                {letters.map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.1
                                        }}
                                        className="inline-block"
                                        style={{ minWidth: letter === ' ' ? '0.25em' : 'auto' }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        </div>

                        {/* Right heart rate monitor */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{
                                opacity: phase === 'exit' ? 0 : 1,
                                x: 0
                            }}
                            transition={{
                                opacity: { duration: 0.4 },
                                x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                            }}
                            className="flex-shrink-0"
                        >
                            <svg
                                className="w-12 h-8 md:w-20 md:h-12 text-orange drop-shadow-[0_0_10px_rgba(255,103,0,0.6)]"
                                viewBox="0 0 80 50"
                            >
                                <motion.path
                                    d="M 0,25 L 30,25 L 37,30 L 44,15 L 51,40 L 58,10 L 65,25 L 80,25"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        pathLength: { duration: 1.0, ease: "easeInOut", delay: 0.2 }
                                    }}
                                />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Tagline under the slogan */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: phase === 'complete' || phase === 'exit' ? 1 : 0, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 1.8 }}
                        className="relative z-10 mt-6 flex items-center gap-3"
                    >
                        <span className="font-display font-semibold uppercase tracking-[0.3em] text-canvas/50 text-xs md:text-sm">
                            The Prof
                        </span>
                    </motion.div>

                    {/* Bottom progress bar - solid orange */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-canvas/10"
                    >
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.8, ease: 'linear' }}
                            style={{ originX: 0 }}
                            className="h-full bg-orange"
                        />
                    </motion.div>

                    {/* Battery percentage */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'complete' ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-3 right-4 md:bottom-4 md:right-8 font-display font-bold text-orange text-xs md:text-sm tracking-wider"
                    >
                        100%
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
