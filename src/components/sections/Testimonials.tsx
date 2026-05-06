import { motion } from 'framer-motion';
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
    {
        quote: "The digital path mapping wasn't just helpful; it was a revelation of what's actually possible for someone like me.",
        author: 'Career switcher',
    },
    {
        quote: "Finally, a place that values substance over hype. The depth of insights here is unmatched.",
        author: 'Digital entrepreneur',
    },
    {
        quote: "HQ is where I go to refocus. It's the reset button everyone in this industry needs.",
        author: 'Software Engineer',
    },
    {
        quote: "The frameworks for product management are exactly what's being done at the top tier. No fluff.",
        author: 'Product Designer',
    },
];

// Double the testimonials for seamless looping
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
    return (
        <section id="testimonials" className="bg-ink! py-24! relative! z-10! w-full! overflow-hidden!">
            <div className="absolute! -top-40! right-0! w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />

            <MaxWidthWrapper className="relative! z-10!">
                <div className="flex! flex-col! items-center! text-center! mb-16!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! text-sm! mb-4!"
                    >
                        Voices From The HQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-white! max-w-2xl!"
                    >
                        Proof that clarity changes movement.
                    </motion.h2>
                </div>
            </MaxWidthWrapper>

            {/* Marquee Row */}
            <div className="relative! w-full! overflow-hidden! py-8!">
                {/* Gradient Masks */}
                <div className="absolute! inset-y-0! left-0! w-20! md:w-40! bg-gradient-to-r! from-ink! to-transparent! z-20! pointer-events-none!" />
                <div className="absolute! inset-y-0! right-0! w-20! md:w-40! bg-gradient-to-l! from-ink! to-transparent! z-20! pointer-events-none!" />

                <motion.div
                    animate={{ x: [0, -1920] }} // Approximated width, works well with items
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                    }}
                    className="flex! gap-6! w-max!"
                >
                    {duplicatedTestimonials.map((t, i) => (
                        <div
                            key={`${t.author}-${i}`}
                            className="w-[300px]! md:w-[400px]! bg-ink! border! border-white/20! rounded-2xl! p-8! flex! flex-col! gap-6! hover:border-blue! transition-all! duration-300!"
                        >
                            <span className="text-blue! text-3xl! font-display font-black! leading-none!">"</span>
                            <p className="font-body text-white! text-base! leading-relaxed! flex-1!">
                                {t.quote}
                            </p>
                            <div className="mt-auto!">
                                <p className="font-display font-semibold! uppercase! tracking-[0.1em]! text-canvas/80! text-xs!">
                                    {t.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
