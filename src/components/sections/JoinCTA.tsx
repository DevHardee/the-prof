import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function JoinCTA() {
    return (
        <section className="bg-ink! py-24! px-6! relative! z-10! text-center! w-full! overflow-hidden!">
            {/* Background decorative */}
            <div className="absolute! top-1/2! left-1/2! w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute! inset-0! opacity-[0.10] mix-blend-screen pointer-events-none">
                <img src="/assets/brand-elements/Brand ELements-25.png" alt="Brand image" className="w-full! h-full! object-cover!" />
            </div>

            <MaxWidthWrapper className="relative! z-10!">
                <div className="max-w-4xl! mx-auto! flex! flex-col! items-center!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue! text-sm! mb-8!"
                    >
                        The Next Move
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! leading-[0.95]! text-canvas! mb-8!"
                    >
                        You don't need more time.<br />
                        You need the right knowledge.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-body text-lg! md:text-xl! text-canvas/60! max-w-md! mb-12!"
                    >
                        Start seeing clearly. Start moving differently. The HQ is open.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="flex! flex-col! sm:flex-row! gap-4! items-center!"
                    >
                        <a
                            href="#"
                            className="bg-blue! text-white! font-display font-bold! uppercase! tracking-wider! px-10! py-4! rounded-full! hover:bg-canvas! hover:text-ink! transition-all! duration-300! ease-brand flex! items-center! gap-2!"
                        >
                            Charge Your Brain ⚡
                        </a>
                        <a
                            href="#"
                            className="bg-transparent! text-canvas! border! border-canvas/30! font-display font-bold! uppercase! tracking-wider! px-10! py-4! rounded-full! hover:bg-canvas! hover:text-ink! transition-all! duration-300! ease-brand"
                        >
                            Enter The HQ →
                        </a>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
