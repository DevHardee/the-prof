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

                    {/* Word-by-word reveal: CHARGE YOUR BRAIN */}
                    <div className="relative z-10 flex flex-col items-center gap-0 select-none">

                        {/* CHARGE */}
                        <motion.span
                            initial={{ opacity: 0, y: 40, skewX: -4 }}
                            animate={{ opacity: 1, y: 0, skewX: 0 }}
                            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-black uppercase text-canvas leading-none"
                            style={{ fontSize: 'clamp(4rem, 14vw, 10rem)', letterSpacing: '-0.02em' }}
                        >
                            CHARGE
                        </motion.span>

                        {/* YOUR */}
                        <motion.span
                            initial={{ opacity: 0, y: 40, skewX: -4 }}
                            animate={{ opacity: 1, y: 0, skewX: 0 }}
                            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-black uppercase text-canvas leading-none"
                            style={{ fontSize: 'clamp(4rem, 14vw, 10rem)', letterSpacing: '-0.02em' }}
                        >
                            YOUR
                        </motion.span>

                        {/* BRAIN — orange on entry */}
                        <motion.span
                            initial={{ opacity: 0, y: 40, skewX: -4 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                skewX: 0,
                                color: phase === 'slogan' || phase === 'exit'
                                    ? '#ff6700'
                                    : '#f5f2ea',
                            }}
                            transition={{
                                delay: 0.8,
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                                color: { delay: 1.0, duration: 0.5 }
                            }}
                            className="font-display font-black uppercase leading-none"
                            style={{ fontSize: 'clamp(4rem, 14vw, 10rem)', letterSpacing: '-0.02em' }}
                        >
                            BRAIN
                        </motion.span>
                    </div>

                    {/* Tagline under the slogan */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: phase === 'slogan' || phase === 'exit' ? 1 : 0, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative z-10 mt-6 flex items-center gap-3"
                    >
                        <span className="font-display font-black text-orange text-2xl">✳</span>
                        <span className="font-display font-semibold uppercase tracking-[0.3em] text-canvas/50 text-xs md:text-sm">
                            The Prof
                        </span>
                        <span className="font-display font-black text-blue-mid text-2xl">⚡</span>
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