import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

const testimonials = [
    {
        quote: "The Prof doesn't motivate you. It sharpens you. I left with more clarity in one sitting than a year of scrolling.",
        author: 'Young professional',
    },
    {
        quote: "It feels like a headquarters for people who want substance. The intelligence behind the message is what made me stay.",
        author: 'Student founder',
    },
    {
        quote: 'Bold voice, practical value. Knowledge is finally organised in a way that is worth acting on.',
        author: 'Community member',
    },
];

export default function Voices() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section id="voices" className="bg-canvas! py-24! relative! z-10! w-full! overflow-hidden!">
            <div className="absolute! -top-40! right-0! w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />

            <MaxWidthWrapper className="relative! z-10!">
                <div className="flex! flex-col! items-center! text-center! mb-16!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue! text-sm! mb-4!"
                    >
                        Voices From The HQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-ink! max-w-2xl!"
                    >
                        Proof that clarity changes movement.
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid! grid-cols-1! md:grid-cols-3! gap-6! w-full!"
                >
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.author}
                            variants={item}
                            className="bg-white! border! border-ink/10! rounded-2xl! p-8! flex! flex-col! gap-6! hover:border-blue/20! hover:-translate-y-1! transition-all! duration-300!"
                        >
                            <span className="text-blue! text-3xl! font-display font-black! leading-none!">"</span>
                            <p className="font-body text-ink! text-base! leading-relaxed! flex-1!">
                                {t.quote}
                            </p>
                            <p className="font-display font-semibold! uppercase! tracking-[0.1em]! text-muted! text-xs!">
                                {t.author}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}
