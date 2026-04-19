import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface MetaItem {
    label: string;
    value: string;
}

const metaItems: MetaItem[] = [
    { label: 'The Truth', value: '1 Idea' },
    { label: 'The Problem', value: '1 Decision' },
    { label: 'The Shift', value: '1 Shift' },
    { label: 'The Result', value: 'Clarity Creates Confidence' },
];

export default function Statement() {
    return (
        <section className="bg-ink py-20! relative overflow-hidden text-center z-10 w-full">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.10] mix-blend-screen pointer-events-none">
                <img src="/assets/brand-elements/Brand ELements-23.png" alt="" className="w-full h-full object-cover" />
            </div>

            <MaxWidthWrapper>
                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display font-black uppercase text-center text-5xl md:text-6xl md:text-8xl text-canvas leading-[0.9] mb-20!"
                    >
                        KNOWLEDGE IS <span className="bg-orange text-white px-3 pb-1 inline-block">FREE.</span>
                        <br />
                        GROWTH IS EARNED
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                        className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-16 lg:gap-24"
                    >
                        {metaItems.map((item) => (
                            <motion.div
                                key={item.label}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="flex flex-col flex-1 w-full text-center md:text-left"
                            >
                                <div className="w-full h-[1px] bg-canvas/25 mb-6" />
                                <p className="font-display font-semibold uppercase tracking-[0.15em] text-canvas/50 text-[10px] sm:text-xs mb-2">
                                    {item.label}
                                </p>
                                <p className="font-display font-bold uppercase tracking-wider text-canvas text-base sm:text-xl lg:text-2xl">
                                    {item.value}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
