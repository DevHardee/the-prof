import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function JoinCTA() {
    return (
        <section className="bg-orange py-40 px-6 relative z-10 text-center w-full">
            <MaxWidthWrapper>
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="font-display font-semibold uppercase tracking-[0.15em] text-white/50 text-sm mb-6"
                    >
                        The Prof Community
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display font-black uppercase text-5xl sm:text-6xl md:text-[6.5rem] leading-[0.9] text-white mb-10"
                    >
                        YOU NEED<br />
                        <span className="inline-flex items-center justify-center gap-4">
                            <span className="text-white">✳</span> DIRECTION.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-body text-xl md:text-2xl text-white/80 max-w-xl mb-16"
                    >
                        Stop guessing. The Prof is here for those who seek genuine knowledge and are ready to take action to grow.
                    </motion.p>

                    <motion.a
                        href="#"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="bg-white text-orange font-display font-bold uppercase tracking-wider px-12 py-6 text-lg rounded-full hover:bg-canvas transition-[background-color] duration-500 ease-brand"
                    >
                        Join Us Now
                    </motion.a>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
