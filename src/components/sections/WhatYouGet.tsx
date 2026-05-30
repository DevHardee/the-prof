import { motion, type Variants } from 'framer-motion';
import { Lightbulb, Telescope, Compass, Flame, TrendingUp, Zap } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';

const shifts = [
    {
        icon: Lightbulb,
        title: 'Clarity',
        label: 'Cut through the noise',
        desc: 'Most people are drowning in information but starving for understanding. When you plug into The Prof, the fog lifts. You stop consuming everything and start knowing exactly what matters, what to ignore, and what to act on – right now.',
    },
    {
        icon: Telescope,
        title: 'Perspective',
        label: 'See what people around you can\t see yet',
        desc: 'Your environment shapes your ceiling until your thinking breaks it. The Prof expands your frame of reference beyond your street, your city, and your current room. You start seeing the world the way people three levels ahead of you see it.',
    },
    {
        icon: Compass,
        title: 'Direction',
        label: 'Stop guessing. Start moving with intention',
        desc: 'Confusion is expensive. Every day without direction is a day of wasted motion. The Prof gives you a map, not a motivational quote. You will know where you are, where you\'re going, and exactly what your next move is.',
    },
    {
        icon: Flame,
        title: 'Mindset',
        label: 'Build the discipline to finish what you start',
        desc: 'Ideas are common. Execution is rare. The gap between where you are and where you want to be isn\'t talent, it\'s mental structure. We build that structure. You bring the willingness. Together, you become someone who actually follows through.',
    },
    {
        icon: TrendingUp,
        title: 'Growth',
        label: 'Progress that compounds - not a sprint, a system',
        desc: 'Random effort produces random results. Intentional growth produces momentum. The Prof doesn\'t just motivate you; it installs a system of thinking that keeps working long after you close the tab.',
    },
    {
        icon: Zap,
        title: 'Edge',
        label: 'Arrive before the crowd does',
        desc: 'The people winning right now aren\'t smarter than you, they\'re earlier. They spotted the opportunity before it became obvious. The Prof trains you to read signals, spot openings in careers, business, and tech, and move while everyone else is still catching up.',
    },
];

export default function WhatYouGet() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section
            id="resources"
            className="bg-ink/95! py-24! relative! z-10! w-full! overflow-hidden!">
            {/* Enhanced Background elements */}
            <div className="absolute! top-0! right-0! w-[900px]! h-[900px]! bg-orange/15 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute! top-1/3! left-0! w-[700px]! h-[700px]! bg-orange/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute! bottom-0! left-1/2! w-[600px]! h-[600px]! bg-orange/8 rounded-full blur-[90px] -translate-x-1/4 translate-y-1/3 pointer-events-none" />

            {/* <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none">
                <img src="/assets/brand-elements/Brand ELements-18.png" alt="background pattern" className="w-full h-full object-cover" />
            </div> */}
            <MaxWidthWrapper className="relative! z-10!">
                <div className="flex! flex-col! items-center! text-center! mb-16!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-orange! text-sm! md:text-base! mb-4!"
                    >
                        What You Get
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-canvas! max-w-3xl!"
                    >
                        What happens when you plug in.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="font-body text-canvas/70! text-lg! md:text-2xl! mt-4! max-w-xl!"
                    >
                        Six shifts that compound. Each one sharpens how you see, decide, and move.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-8! w-full!"
                >
                    {shifts.map((shift, idx) => {
                        const Icon = shift.icon;
                        return (
                            <motion.div
                                key={shift.title}
                                variants={item}
                                whileHover={{
                                    y: -8,
                                    backgroundColor: "rgba(255, 103, 0, 0.04)"
                                }}
                                className="group relative! flex! flex-col! bg-white/[0.02]! border! border-white/5! rounded-[32px]! p-10! transition-all! duration-500! ease-brand! overflow-hidden! hover:border-orange/40!"
                            >
                                {/* Decorative Number/Index */}
                                <div className="absolute! top-8! right-10! font-display font-black! text-6xl! text-white/80! group-hover:text-orange! transition-colors!">
                                    0{idx + 1}
                                </div>

                                {/* Icon Wrapper */}
                                <div className="mb-8! relative! w-fit!">
                                    <div className="absolute! inset-0! bg-orange/30! blur-[20px]! opacity-0! group-hover:opacity-100! transition-opacity!" />
                                    <div className="relative! w-14! h-14! rounded-2xl! bg-orange/10! flex! items-center! justify-center! text-orange! group-hover:bg-orange! group-hover:text-white! transition-all! duration-500!">
                                        <Icon size={28} strokeWidth={2.5} />
                                    </div>
                                </div>

                                {/* Labels & Content */}
                                <div className="flex! flex-col! gap-3!">
                                    <span className="font-display font-black! uppercase! tracking-[0.2em]! text-orange! text-[10px]! md:text-xs!">
                                        {shift.label}
                                    </span>
                                    <h3 className="font-display font-black! text-white! text-2xl! uppercase! tracking-tighter!">
                                        {shift.title}
                                    </h3>
                                    <div className="w-8! h-[2px]! bg-orange/30! group-hover:w-16! group-hover:bg-orange! transition-all! duration-500! mt-1! mb-2!" />
                                    <p className="font-body text-canvas/50! text-lg! md:text-2xl! leading-relaxed! group-hover:text-canvas/80! transition-colors!">
                                        {shift.desc}
                                    </p>
                                </div>

                                {/* Bottom Glow */}
                                <div className="absolute! bottom-0! left-0! w-full! h-[2px]! bg-gradient-to-r! from-transparent! via-orange/60! to-transparent! opacity-0! group-hover:opacity-100! transition-opacity!" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
