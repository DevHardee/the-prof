import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

export default function WhyThisExists() {
    return (
        <section id="about" className="bg-ink! py-28! relative! z-10! text-center! w-full! overflow-hidden!">
            <div className="absolute! top-1/2! left-1/2! w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <MaxWidthWrapper className="relative! z-10!">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! text-sm! mb-8!"
                >
                    Why This Exists
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! xl:text-7xl! text-canvas! leading-[0.92]! mb-8! max-w-4xl! mx-auto!"
                >
                    Because knowledge is power — and power should never be locked behind privilege.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                    className="font-body text-canvas/60! text-lg! md:text-xl! max-w-2xl! mx-auto! leading-relaxed!"
                >
                    TheProfHQ exists to make the right knowledge accessible to everyone, so more people can rise, build, and lead — regardless of where they started.
                </motion.p>
            </MaxWidthWrapper>
        </section>
    );
}
