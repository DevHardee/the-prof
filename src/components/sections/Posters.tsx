import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

const shifts = [
    {
        icon: '💡',
        title: 'Clarity',
        desc: 'See what matters. Ignore what doesn\'t.',
    },
    {
        icon: '🔭',
        title: 'Perspective',
        desc: 'Think beyond your current environment and rooms.',
    },
    {
        icon: '🧭',
        title: 'Direction',
        desc: 'Know your next move — and why it matters.',
    },
    {
        icon: '🔥',
        title: 'Mindset',
        desc: 'Build the mental strength to actually execute.',
    },
    {
        icon: '📈',
        title: 'Growth',
        desc: 'Move faster than you thought possible, with intention.',
    },
    {
        icon: '⚡',
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
            className="bg-canvas! py-24! relative! z-10! w-full! overflow-hidden!">
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
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue! text-sm! md:text-base! mb-4!"
                    >
                        What You Get
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-ink! max-w-3xl!"
                    >
                        What happens when you plug in.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="font-body text-ink/70! text-lg! mt-4! max-w-xl!"
                    >
                        Six shifts that compound. Each one sharpens how you see, decide, and move.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-3! gap-6! w-full!"
                >
                    {shifts.map((shift) => (
                        <motion.div
                            key={shift.title}
                            variants={item}
                            className="group! bg-white! border! border-ink/10! rounded-2xl! p-8! flex! flex-col! gap-3! hover:border-blue/30! hover:-translate-y-1! transition-all! duration-300! ease-brand!"
                        >
                            <span className="text-2xl! mb-1!">{shift.icon}</span>
                            <h3 className="font-display font-bold! text-ink! text-xl! uppercase! tracking-wide!">
                                {shift.title}
                            </h3>
                            <p className="font-body text-ink/60! text-sm! leading-relaxed!">
                                {shift.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
