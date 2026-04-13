import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface Topic {
    tag: string;
    title: string;
    desc: string;
    href: string;
    featured: boolean;
}

const topics: Topic[] = [
    {
        tag: 'Featured',
        title: 'Think Clearly',
        desc: "You don't need more random information — you need to understand what actually matters. Most people don't lack effort, they lack clarity.",
        href: '#',
        featured: true,
    },
    {
        tag: 'Vision',
        title: 'See Opportunities',
        desc: "Opportunities are everywhere but only visible to a trained mind. If you can't see it, you can't take it.",
        href: '#',
        featured: false,
    },
    {
        tag: 'Execution',
        title: 'Move With Intention',
        desc: 'Random actions lead to random results. When your thinking is clear, your moves become precise and effective.',
        href: '#',
        featured: false,
    },
    {
        tag: 'Value',
        title: 'Build Real Value',
        desc: "It's not about knowing more — it's about knowing what works. Focus on skills that translate into real-life results.",
        href: '#',
        featured: false,
    },
];

export default function Topics() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemAnim: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const featuredAnim: Variants = {
        hidden: { opacity: 0, x: -40 },
        show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="bg-white py-32 md:py-40 px-6 relative z-10 w-full">
            <MaxWidthWrapper>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-display font-semibold uppercase tracking-[0.15em] text-muted text-sm mb-4"
                >
                    Core Topics
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="font-display font-black uppercase text-4xl sm:text-5xl md:text-6xl text-ink mb-16"
                >
                    You Need Direction.
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[1.5px] bg-border-solid border border-border-solid w-full"
                >
                    {topics.map((t) => {
                        const isFeatured = t.featured;

                        return (
                            <motion.div
                                key={t.title}
                                variants={isFeatured ? featuredAnim : itemAnim}
                                className={`group flex flex-col items-start p-10 md:p-14 lg:p-20 transition-[background-color] duration-500 ease-brand ${isFeatured
                                    ? 'md:col-span-2 bg-blue text-white'
                                    : 'bg-white hover:bg-canvas text-ink'
                                    }`}
                            >
                                <p
                                    className={`font-display font-semibold uppercase tracking-[0.15em] text-[10px] sm:text-xs mb-6 ${isFeatured ? 'text-white/55' : 'text-orange'
                                        }`}
                                >
                                    {t.tag}
                                </p>
                                <h3 className={`font-display font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl mb-6 ${isFeatured ? 'text-white' : 'text-ink'}`}>
                                    {t.title}
                                </h3>
                                <p className={`font-body text-base md:text-lg max-w-2xl mb-16 ${isFeatured ? 'text-white/65' : 'text-muted'}`}>
                                    {t.desc}
                                </p>

                                <a
                                    href={t.href}
                                    className={`mt-auto inline-flex items-center gap-3 font-display font-bold uppercase tracking-wider text-base md:text-lg ${isFeatured ? 'text-white' : 'text-ink'}`}
                                >
                                    {isFeatured ? 'Start Here' : 'Explore'}
                                    <span className="transition-transform duration-200 ease-brand group-hover:translate-x-2 flex-shrink-0">
                                        →
                                    </span>
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
