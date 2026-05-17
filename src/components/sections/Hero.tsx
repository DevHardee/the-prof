import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SplashScreen from '../ui/SplashScreen';
import { Target, Users, Lightbulb } from 'lucide-react';

export default function Hero() {
    const location = useLocation();
    const hasTarget = !!(location.state?.scrollTo || location.hash);
    const [splashDone, setSplashDone] = useState(hasTarget);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    const TargetIcon = () => <Target size={20} strokeWidth={2.5} className="text-orange!" />;
    const GroupIcon = () => <Users size={20} strokeWidth={2.5} className="text-orange!" />;
    const LightIcon = () => <Lightbulb size={20} strokeWidth={2.5} className="text-orange!" />;

    const miniCards = [
        { label: 'What are we doing?', value: 'Impacting the world with the right knowledge and information.', icon: TargetIcon },
        { label: 'Who are we doing it for?', value: 'Aspiring entrepreneurs, builders, side-hustlers, thinkers, tired of mediocrity - regardless of background, income, or experience.', icon: GroupIcon },
        { label: 'Why are we doing it?', value: 'To educatem inspire, and empower every person with the right knowledge they need to build a life they are proud of - completely free. Knowledge shouldn\'t be a privilege.', icon: LightIcon },
    ];

    return (
        <>
            {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

            <section
                id='hero'
                className="relative! w-full! overflow-hidden! pt-10! md:pt-14! pb-14! md:pb-20! bg-ink! px-4! md:px-8!">
                {/* Atmosphere */}
                <div className="absolute! top-0! right-0! w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <MaxWidthWrapper>
                    <div className="flex! flex-col! gap-12! relative! z-10! w-full!">
                        {/* Top section: Text and Image */}
                        <div className="grid! grid-cols-1! lg:grid-cols-2! gap-12! lg:gap-16! items-center!">
                            {/* Content */}
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate={splashDone ? "show" : "hidden"}
                                className="flex! flex-col!"
                            >
                                {/* Eyebrow tag */}
                                {/* <motion.div variants={item} className="mb-6! inline-flex! items-center! gap-2! self-start!">
                                    <span className="font-display text-xs md:text-base font-semibold! uppercase! tracking-[0.15em]! text-blue-mid! border! border-blue/30 rounded-full! px-3! py-1!">
                                        ✳ A Standard. Not A School.
                                    </span>
                                </motion.div> */}

                                <motion.h1
                                    variants={item}
                                    className="font-display font-black! uppercase! text-[2.5rem]! md:text-[4.0rem]! lg:text-[5.0rem]! leading-[0.88]! text-white!"
                                >
                                    You're not stuck.<br />
                                    <span className="text-blue!">You're just not clear.</span>
                                </motion.h1>

                                <motion.p
                                    variants={item}
                                    className="font-body text-white/70! text-lg! md:text-xl! max-w-md! mt-10! leading-relaxed!"
                                >
                                    The world trained you to memorize. The Prof helps you to see clearly, think independently, and operate at a higher mental frequency.
                                </motion.p>
                            </motion.div>

                            {/* Visual */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                                className="relative! w-full! flex! items-center! justify-center!"
                            >
                                {/* Blue background glow */}
                                <div className="absolute! inset-0! bg-blue/20! rounded-3xl! blur-2xl! scale-110! pointer-events-none!" />

                                <div className="hidden lg:block relative! w-full! max-w-[550px]! overflow-hidden! rounded-2xl! border! border-orange/20!">
                                    <img
                                        src="/assets/homepage.png"
                                        alt="The Prof"
                                        className="w-full! h-full! object-cover! rounded-2xl! shadow-2xl!"
                                    />

                                    {/* Subtle glow effect */}
                                    <motion.div
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute! inset-0! bg-gradient-to-tr! from-orange/10! via-transparent! to-blue/10! z-10! pointer-events-none! rounded-2xl!"
                                    />

                                    {/* Border glow animation */}
                                    <motion.div
                                        animate={{
                                            opacity: [0.4, 0.8, 0.4]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute! inset-0! rounded-2xl! shadow-[0_0_30px_rgba(255,103,0,0.3)]! pointer-events-none!"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Mini cards - Full width below */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid! grid-cols-1! lg:grid-cols-3! gap-6! w-full!"
                        >
                            {miniCards.map((card) => (
                                <motion.div
                                    key={card.label}
                                    variants={item}
                                    whileHover={{
                                        y: -10,
                                        backgroundColor: "rgba(255, 255, 255, 0.05)"
                                    }}
                                    className="group flex flex-col h-full! min-h-[160px]! rounded-[24px]! p-6! bg-white/[0.02]! border! border-orange/15! backdrop-blur-md! transition-all! duration-500! hover:border-orange!"
                                >
                                    <div className="flex! items-center! justify-between! mb-4!">
                                        <div className="p-3! bg-orange/10! rounded-xl! text-orange! group-hover:scale-110! transition-transform! duration-300!">
                                            <card.icon />
                                        </div>
                                        <div className="w-8! h-[1px]! bg-white/10! group-hover:w-12! group-hover:bg-blue! transition-all! duration-300!" />
                                    </div>
                                    <p className=" font-display font-medium! uppercase! tracking-[0.1em]! text-white/80! text-[10px]! md:text-xs! mb-2! group-hover:text-white! transition-colors!">
                                        {card.label}
                                    </p>
                                    <p className="font-body text-canvas/80! text-sm! md:text-base! leading-relaxed! flex-1! group-hover:text-white! transition-colors!">{card.value}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
