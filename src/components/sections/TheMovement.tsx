import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

const movementStats = [
    { category: 'THINKERS', value: 'Independent' },
    { category: 'BUILDERS', value: 'Relentless' },
    { category: 'DOERS', value: 'Intentional' },
    { category: 'STANDARD', value: 'Non-negotiable' },
];

export default function TheMovement() {
    return (
        <section className="bg-ink py-24! relative z-10 w-full overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

            <MaxWidthWrapper className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16! items-center">
                    {/* Left */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="font-display font-semibold uppercase tracking-[0.15em] text-blue text-sm mb-6"
                        >
                            The Movement
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl text-canvas leading-[0.9] mb-8!"
                        >
                            This is bigger than you think.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="font-body text-canvas/60 text-lg leading-relaxed max-w-md"
                        >
                            Not a person. Not a trend. A growing standard for people who refuse to stay average — a generation of thinkers, builders and doers who decided to charge their brains instead of waiting for life to change.
                        </motion.p>
                    </div>

                    {/* Right — 2x2 stat grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                        className="grid grid-cols-2 gap-4!"
                    >
                        {movementStats.map((stat) => (
                            <motion.div
                                key={stat.category}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="bg-canvas/5 border border-canvas/10 rounded-xl p-6! flex flex-col gap-2 hover:bg-canvas/10 transition-colors duration-300"
                            >
                                <p className="font-display font-semibold uppercase tracking-[0.12em] text-canvas/50 text-[10px]">
                                    {stat.category}
                                </p>
                                <p className="font-display font-bold uppercase text-canvas text-2xl md:text-3xl">
                                    {stat.value}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
