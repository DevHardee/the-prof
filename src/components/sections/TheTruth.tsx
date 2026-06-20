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
        title: "You are trying.",
        desc: "Courses. Videos. Threads. You're consuming everything, but nothing is compounding. The more you learn, the more scattered you feel. That's not a knowledge problem. That's a sequence problem.",
    },
    {
        num: '02',
        title: "You are moving.",
        desc: "But effort without a map gets you lost faster. You're not behind because you're slow. You're behind because no one gave you the road. Most people spend years figuring out what could be handed to them in weeks.",
    },
    {
        num: '03',
        title: "You need a system.",
        desc: "Not another resource. Not another motivational thread. A structured path – built by someone who already cleared the road, made the mistakes, and mapped the shortcuts. That's what The Prof was built to be.",
    },
];

export default function TheTruth() {
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
            className="bg-ink/90 py-24! relative z-10 w-full overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
                <img src="/assets/brand-elements/Brand ELements-21.png" alt="background image" className="w-full h-full object-cover" />
            </div>

            <MaxWidthWrapper className="relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-display font-semibold! uppercase! tracking-[0.15em]! text-orange! text-sm! md:text-base! mb-4!"
                >
                    The Truth
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-white! mb-4!"
                >
                    It's not about effort.<br />It's about direction.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    className="font-body text-white/70! text-base! md:text-lg! lg:text-2xl! max-w-2xl! mb-14!"
                >
                    Not lazy. Not incapable. Just unclear. That's the gap most people never name, and it's the <em>only</em> one that matters.
                </motion.p>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid! grid-cols-1! lg:grid-cols-3! gap-8! md:gap-10! w-full!"
                >
                    {pillars.map((p) => (
                        <motion.div
                            key={p.num}
                            variants={item}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 20px 40px rgba(255, 103, 0, 0.15)"
                            }}
                            className="group! border! border-white/10! bg-ink! p-10! md:p-12! rounded-[2.5rem]! flex! flex-col! items-start! text-white/70! hover:text-white! transition-all! duration-500! ease-brand hover:-translate-y-2! hover:border-orange/50! w-full! relative! overflow-hidden!"
                        >
                            {/* Inner Glow on Hover */}
                            <div className="absolute! inset-0! bg-gradient-to-br! from-orange/5! to-transparent! opacity-0! group-hover:opacity-100! transition-opacity! duration-500! pointer-events-none!" />

                            <div className="font-display font-black! text-[72px]! lg:text-[88px]! leading-none! text-orange! mb-6! transition-transform! duration-500! group-hover:scale-110! group-hover:rotate-3!">
                                {p.num}
                            </div>
                            <div className="w-12! h-[3px]! bg-orange! mb-8! rounded-full! group-hover:w-20! transition-all! duration-500!" />
                            <h3 className="font-display font-black! uppercase! text-lg! md:text-xl! lg:text-3xl! tracking-tighter! text-white! mb-4!">
                                {p.title}
                            </h3>
                            <p className="font-body text-white/60! text-base! md:text-lg! lg:text-2xl! leading-relaxed! group-hover:text-white! transition-colors! duration-300!">
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
                    <p className="font-display font-bold! text-orange/80! hover:text-orange! transition-colors! duration-200! text-base! md:text-lg! lg:text-2xl! tracking-wide!">
                        That changes here. →
                    </p>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}