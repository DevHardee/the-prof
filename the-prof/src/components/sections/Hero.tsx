import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface HeroProps {
    heroImage?: string;
}

export default function Hero({ heroImage }: HeroProps) {
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

    return (
        <section className="relative w-full overflow-hidden pt-24 pb-20 sm:pt-32 md:pt-40 lg:pb-32 bg-canvas">
            {/* Atmosphere */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10 w-full">

                    {/* Content */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col"
                    >
                        <motion.p
                            variants={item}
                            className="font-display font-semibold uppercase tracking-[0.15em] text-muted text-sm mb-6"
                        >
                            Charge Your Brain
                        </motion.p>

                        <motion.h1
                            variants={item}
                            className="font-display font-black uppercase text-[5rem] sm:text-[6rem] lg:text-[7.5rem] leading-[0.85] text-ink"
                        >
                            Think<br />
                            <span className="text-orange">Better</span><br />
                            See Clearly<br />
                            Move<br />
                            Differently
                        </motion.h1>

                        <motion.p
                            variants={item}
                            className="font-body text-muted text-lg max-w-md mt-8 mb-10 leading-relaxed"
                        >
                            Most people don't lack effort — they lack clarity. The Prof is here for those who seek genuine knowledge and are ready to take action to grow.
                        </motion.p>

                        <motion.div
                            variants={item}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a href="#" className="bg-orange text-white font-display font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-ink transition-colors duration-300 ease-brand text-center">
                                Join Us Now
                            </a>
                            <a href="#" className="bg-transparent text-ink border border-ink/20 font-display font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-ink hover:text-white transition-[color,background-color,border-color] duration-300 ease-brand text-center">
                                Explore Topics
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto"
                    >
                        <div className="aspect-[3/4] w-full rounded-t-full rounded-b-3xl bg-ink overflow-hidden relative">
                            {heroImage ? (
                                <img src={heroImage} alt="The Prof" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="font-display font-bold text-canvas/20 uppercase tracking-widest">Visual Placeholder</span>
                                </div>
                            )}
                        </div>

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
    );
}
