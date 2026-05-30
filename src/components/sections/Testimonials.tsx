import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

const testimonials = [
    {
        quote: "The Prof doesn't motivate you. It sharpens you. I left with more clarity in one sitting than a year of scrolling.",
        author: 'Hadi',
    },
    {
        quote: "It feels like a headquarters for people who want substance. The intelligence behind the message is what made me stay.",
        author: 'Confidence',
    },
    {
        quote: 'Bold voice, practical value. Knowledge is finally organised in a way that is worth acting on.',
        author: 'Mercy',
    },
    {
        quote: "The digital path mapping wasn't just helpful; it was a revelation of what's actually possible for someone like me.",
        author: 'Debby',
    },
    {
        quote: "Finally, a place that values substance over hype. The depth of insights here is unmatched.",
        author: 'Ben',
    },
    {
        quote: "HQ is where I go to refocus. It's the reset button everyone in this industry needs.",
        author: 'Victor',
    },
    {
        quote: "The frameworks for product management are exactly what's being done at the top tier. No fluff.",
        author: 'Martha',
    },
];

// Double the testimonials for seamless looping
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
    return (
        <section id="testimonials" className="bg-ink! py-24! relative! z-10! w-full! overflow-hidden!">
            {/* Enhanced Background elements */}
            <div className="absolute! top-0! right-0! w-[800px] h-[800px] bg-blue/8 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
            <div className="absolute! bottom-0! left-0! w-[600px] h-[600px] bg-blue/6 rounded-full blur-[90px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

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
                {/* Enhanced Gradient Masks with glow */}
                <div className="hidden lg:block absolute! inset-y-0! left-0! w-32! md:w-48! bg-gradient-to-r! from-ink! via-ink/80! to-transparent! z-20! pointer-events-none!" />
                <div className="hidden lg:block absolute! inset-y-0! right-0! w-32! md:w-48! bg-gradient-to-l! from-ink! via-ink/80! to-transparent! z-20! pointer-events-none!" />

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
                            className="group relative w-[300px]! md:w-[400px]! bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm border! border-white/10! rounded-2xl! p-8! flex! flex-col! gap-6! hover:border-blue/50! hover:bg-blue/5! hover:scale-[1.02] hover:-translate-y-1 transition-all! duration-500! shadow-lg shadow-black/20!"
                        >
                            {/* Accent corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue/5 rounded-bl-[3rem] rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Glowing border effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue/20 via-transparent to-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

                            {/* Quote mark with animation */}
                            <div className="relative">
                                <span className="text-blue-mid! text-5xl! font-display font-black! leading-none! group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">"</span>
                            </div>

                            <p className="font-body text-white/90! text-lg! md:text-2xl! leading-relaxed! flex-1! group-hover:text-white transition-colors relative z-10">
                                {t.quote}
                            </p>

                            <div className="mt-auto! pt-4! border-t border-white/5 group-hover:border-blue/20 transition-colors relative z-10">
                                <p className="font-display font-bold! uppercase! tracking-[0.15em]! text-blue-mid group-hover:text-blue text-xs! transition-colors">
                                    — {t.author}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue via-blue to-transparent group-hover:w-full transition-all duration-700" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
