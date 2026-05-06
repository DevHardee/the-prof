import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [visible, setVisible] = useState(true);
    const [phase, setPhase] = useState<'words' | 'slogan' | 'exit'>('words');

    useEffect(() => {
        // Phase 1: staggered words (0 - 1400ms)
        // Phase 2: full slogan hold (1400 - 2400ms)
        // Phase 3: exit (2400ms+)
        const t1 = setTimeout(() => setPhase('slogan'), 1400);
        const t2 = setTimeout(() => setPhase('exit'), 2400);
        const t3 = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 3000);

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
                        animate={{ scale: 1.4, opacity: phase === 'exit' ? 0 : 0.06 }}
                        transition={{ duration: 2.5, ease: 'easeOut' }}
                        className="absolute w-[700px] h-[700px] rounded-full bg-blue pointer-events-none"
                    />

                    {/* Single line with heart rate monitor effect */}
                    <div className="relative z-10 flex items-center gap-3 select-none">
                        {/* Heart rate line before text */}
                        <motion.svg
                            width="80"
                            height="40"
                            viewBox="0 0 80 40"
                            className="text-orange"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                        >
                            <motion.path
                                d="M 0,20 L 20,20 L 25,10 L 30,30 L 35,15 L 40,20 L 80,20"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </motion.svg>

                        {/* CHARGE YOUR BRAIN */}
                        <motion.span
                            initial={{ opacity: 0, scaleX: 0.8 }}
                            animate={{
                                opacity: 1,
                                scaleX: 1,
                                color: phase === 'slogan' || phase === 'exit' ? '#ff6700' : '#f5f2ea'
                            }}
                            transition={{
                                opacity: { delay: 0.3, duration: 0.6 },
                                scaleX: { delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                color: { delay: 1.0, duration: 0.5 }
                            }}
                            className="font-display font-black uppercase leading-none"
                            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '0.05em' }}
                        >
                            CHARGE YOUR BRAIN
                        </motion.span>

                        {/* Heart rate line after text */}
                        <motion.svg
                            width="80"
                            height="40"
                            viewBox="0 0 80 40"
                            className="text-orange"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                        >
                            <motion.path
                                d="M 0,20 L 40,20 L 45,15 L 50,30 L 55,10 L 60,20 L 80,20"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                            />
                        </motion.svg>
                    </div>

                    {/* Tagline under the slogan */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: phase === 'slogan' || phase === 'exit' ? 1 : 0, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative z-10 mt-6 flex items-center gap-3"
                    >
                        <span className="font-display font-semibold uppercase tracking-[0.3em] text-canvas/50 text-xs md:text-sm">
                            The Prof
                        </span>
                    </motion.div>

                    {/* Bottom progress bar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2.4, ease: 'linear' }}
                        style={{ originX: 0 }}
                        className="absolute bottom-0 left-0 w-full h-[3px] bg-orange"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}