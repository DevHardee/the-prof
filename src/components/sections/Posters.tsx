import { motion, type Variants } from 'framer-motion';
import { Lightbulb, Telescope, Compass, Flame, TrendingUp, Zap } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';

const shifts = [
    {
        icon: Lightbulb,
        title: 'Clarity',
        desc: 'See what matters. Ignore what doesn\'t.',
    },
    {
        icon: Telescope,
        title: 'Perspective',
        desc: 'Think beyond your current environment and rooms.',
    },
    {
        icon: Compass,
        title: 'Direction',
        desc: 'Know your next move — and why it matters.',
    },
    {
        icon: Flame,
        title: 'Mindset',
        desc: 'Build the mental strength to actually execute.',
    },
    {
        icon: TrendingUp,
        title: 'Growth',
        desc: 'Move faster than you thought possible, with intention.',
    },
    {
        icon: Zap,
        title: 'Edge',
        desc: 'Spot openings in careers, business, and tech early.',
    },
];

export default function Posters() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section
            id="resources"
            className="bg-ink/95! py-24! relative! z-10! w-full! overflow-hidden!">
            {/* Background elements */}
            <div className="absolute! -top-40! -right-40! w-96! h-96! bg-orange/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute! top-1/2! -left-40! w-96! h-96! bg-blue/10 rounded-full blur-[100px] pointer-events-none" />

            <MaxWidthWrapper className="relative! z-10!">
                <div className="flex! flex-col! items-center! text-center! mb-16!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! text-sm! md:text-base! mb-4!"
                    >
                        What You Get
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-canvas! max-w-3xl!"
                    >
                        What happens when you plug in.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="font-body text-canvas/70! text-lg! mt-4! max-w-xl!"
                    >
                        Six shifts that compound. Each one sharpens how you see, decide, and move.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-6! w-full!"
                >
                    {shifts.map((shift) => {
                        const Icon = shift.icon;
                        return (
                            <motion.div
                                key={shift.title}
                                variants={item}
                                className="group bg-ink! border! border-canvas/10! rounded-2xl! p-8! flex! flex-col! gap-3! hover:border-blue! hover:-translate-y-1! transition-all! duration-300! ease-brand!"
                            >
                                <span className="text-2xl! text-blue-mid! mb-1! transition-all! duration-300! group-hover:scale-110! group-hover:text-ink! group-hover:bg-blue-mid group-hover:p-1! group-hover:rounded-full! group-hover:w-fit origin-left!">
                                    {typeof Icon === 'string' ? Icon : <Icon />}
                                </span>
                                <h3 className="font-display font-bold! text-canvas! text-xl! uppercase! tracking-wide!">
                                    {shift.title}
                                </h3>
                                <p className="font-body text-canvas/60! text-sm! leading-relaxed!">
                                    {shift.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
