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
        title: "You're trying.",
        desc: "Reading. Watching. Saving. Still, the picture won't sharpen.",
    },
    {
        num: '02',
        title: "You're moving.",
        desc: "But movement without direction multiplies the wrong outcomes.",
    },
    {
        num: '03',
        title: "You're capable.",
        desc: "What's missing isn't effort. It's the right knowledge, in the right order.",
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
        <section
            id='about'
            className="bg-canvas! py-10! md:py-14! relative! z-10! w-full! overflow-hidden!">
            {/* Background Decoration */}
            <div className="absolute! top-0! right-0! w-full! h-[500px] pointer-events-none opacity-[0.03]">
                <img src="/assets/brand-elements/Brand ELements-22.png" alt="background image" className="w-full! h-full! object-cover!" />
            </div>
            <MaxWidthWrapper>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! text-sm! md:text-base! mb-4!"
                >
                    The Truth
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-ink! mb-4!"
                >
                    It's not about effort.<br />It's about direction.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    className="font-body text-ink/70! text-lg! max-w-2xl! mb-14!"
                >
                    Not lazy. Not incapable. Just unclear. That's the gap most people never name — and it's the <em>only</em> one that matters.
                </motion.p>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid! grid-cols-1! md:grid-cols-3! gap-8! md:gap-10! w-full!"
                >
                    {pillars.map((p) => (
                        <motion.div
                            key={p.num}
                            variants={item}
                            className="group! bg-white! p-10! md:p-12! rounded-3xl! shadow-xl! flex! flex-col! items-start! text-ink/70! hover:text-canvas! transition-all! duration-500! ease-brand hover:-translate-y-2! hover:bg-ink! w-full!"
                        >
                            <div className="font-display font-black! text-[72px]! lg:text-[88px]! leading-none! transition-colors! duration-300! ease-brand mb-6!">
                                {p.num}
                            </div>
                            <div className="w-6! h-[2px]! bg-blue! mb-8! rounded-full!" />
                            <h3 className="font-display font-bold! uppercase! text-2xl! lg:text-3xl! tracking-wider! transition-colors! duration-300! ease-brand mb-4!">
                                {p.title}
                            </h3>
                            <p className="font-body leading-relaxed! transition-colors! duration-300! ease-brand!">
                                {p.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* "That changes here" link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="mt-12! text-center!"
                >
                    <a href="#" className="font-display font-bold! text-ink! hover:text-blue! transition-colors! duration-200! text-lg! tracking-wide!">
                        That changes here. →
                    </a>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
