import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

const profCards = [
    {
        label: 'Vision',
        desc: 'A generation that thinks independently, sees opportunities early, and moves with intention in work, business, and life.',
    },
    {
        label: 'Mission',
        desc: 'Turn scattered information into clear, useful insight that helps people make sharper decisions and create real value.',
    },
    {
        label: 'Brand values',
        desc: 'Clarity over noise. Depth over surface. Direction over drift. Access over gatekeeping. Growth over motivation.',
    },
    {
        label: 'Brand message',
        desc: 'One idea. One decision. One shift. Clarity creates confidence, and confidence changes movement.',
    },
];

export default function Statement() {
    return (
        <section id="pillars" className="bg-ink! py-24! relative! overflow-hidden! z-10! w-full!">
            <div className="absolute! top-1/2! left-1/2! w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute! inset-0! opacity-[0.10] mix-blend-screen pointer-events-none">
                <img src="/assets/brand-elements/Brand ELements-23.png" alt="" className="w-full! h-full! object-cover!" />
            </div>

            <MaxWidthWrapper>
                <div className="relative! z-10! w-full! grid! grid-cols-1! lg:grid-cols-2! gap-12! lg:gap-20! items-start!">
                    {/* Left */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="font-display font-semibold! uppercase! tracking-[0.15em]! text-blue! text-sm! mb-6!"
                        >
                            This Is The Prof
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-black! uppercase! text-4xl! md:text-5xl! lg:text-6xl! text-canvas! leading-[0.9]! mb-8!"
                        >
                            Not a school. Not a course.{' '}
                            <span className="text-blue!">A Standard.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="font-body text-canvas/60! text-base! md:text-lg! leading-relaxed! max-w-md! mb-4!"
                        >
                            TheProfHQ is a knowledge headquarters for people who want to think bigger, build smarter, and grow faster. A place where minds are sharpened, perspectives are challenged, and clarity is unlocked.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                            className="font-body text-canvas/60! text-base! md:text-lg! leading-relaxed! max-w-md!"
                        >
                            Built on four pillars — vision, mission, values, message — the HQ exists to remove confusion and replace it with direction.
                        </motion.p>
                    </div>

                    {/* Right — 2x2 grid of cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                        className="grid! grid-cols-1! sm:grid-cols-2! gap-6!"
                    >
                        {profCards.map((card) => (
                            <motion.div
                                key={card.label}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="bg-canvas/5! border! border-canvas/10! rounded-2xl! p-6! flex! flex-col! gap-3! hover:bg-canvas/10! transition-colors! duration-300!"
                            >
                                <div className="w-8! h-8! rounded-lg! bg-blue/20! flex! items-center! justify-center! text-blue! text-lg! flex-shrink-0!">
                                    ✳
                                </div>
                                <h3 className="font-display font-bold! text-canvas! text-lg! uppercase! tracking-wide!">
                                    {card.label}
                                </h3>
                                <p className="font-body text-canvas/55! text-sm! leading-relaxed!">
                                    {card.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
