import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface Pillar {
    num: string;
    title: string;
    desc: string;
}

const pillars: Pillar[] = [
    {
        num: '01',
        title: 'Clarity',
        desc: 'Most people are not stuck. They are confused. Clarity removes friction. Clarity creates movement.',
    },
    {
        num: '02',
        title: 'Awareness',
        desc: 'Opportunities are not rare. They are simply unseen. Train your mind to notice what others ignore.',
    },
    {
        num: '03',
        title: 'Thinking',
        desc: "Information is everywhere. Understanding is not. Think deeper. That's where the advantage is.",
    },
];

export default function Pillars() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="bg-canvas py-32 md:py-40 px-6 relative z-10 w-full overflow-hidden">
            <MaxWidthWrapper>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-display font-semibold uppercase tracking-[0.15em] text-muted text-sm mb-4"
                >
                    What We Teach
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="font-display font-black uppercase text-4xl sm:text-5xl md:text-6xl text-ink mb-16"
                >
                    Clarity Creates Confidence
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-[1.5px] bg-border-solid border border-border-solid w-full"
                >
                    {pillars.map((p) => (
                        <motion.div
                            key={p.num}
                            variants={item}
                            className="group bg-canvas p-10 md:p-12 lg:p-16 flex flex-col items-start transition-colors duration-500 ease-brand hover:bg-ink w-full"
                        >
                            <div className="font-display font-black text-[72px] lg:text-[88px] leading-none text-ink/[0.06] group-hover:text-canvas transition-colors duration-300 ease-brand mb-6">
                                {p.num}
                            </div>
                            <div className="w-6 h-[2px] bg-orange mb-8 rounded-full" />
                            <h3 className="font-display font-bold uppercase text-2xl lg:text-3xl tracking-wider text-ink group-hover:text-canvas transition-colors duration-300 ease-brand mb-4">
                                {p.title}
                            </h3>
                            <p className="font-body text-muted leading-relaxed group-hover:text-canvas/60 transition-colors duration-300 ease-brand">
                                {p.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
