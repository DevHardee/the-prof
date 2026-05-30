import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Brain, Hammer, Target, Eye, ArrowRight } from 'lucide-react';

const movementCategories = [
    {
        icon: Brain,
        category: 'THINKERS',
        value: 'Independent',
        description: 'You question what you are told and go looking for what is actually true. You don\'t accept the ceiling your environment gave you, you raise it yourself.'
    },
    {
        icon: Hammer,
        category: 'BUILDERS',
        value: 'Relentless',
        description: 'You build through the doubt, the setbacks, and the silence. Failure doesn\'t finish you – it teaches you. You don\'t stop because stopping was never part of the plan.'
    },
    {
        icon: Target,
        category: 'DOERS',
        value: 'Intentional',
        description: 'You act with purpose. Every move means something. You\'re done with motion that goes nowhere – you want progress that compounds and a life that reflects your decisions.'
    },
    {
        icon: Eye,
        category: 'VISIONARIES',
        value: 'Fearless',
        description: 'You see what others don\'t see yet. You move before the crowd arrives. You\'re not waiting for permission, for perfect conditions, or for someone to hand you the map – you draw it yourself.'
    }
];

export default function TheRevolution() {
    return (
        <section className="bg-ink py-24! relative z-10 w-full overflow-hidden">
            {/* Background atmosphere */}
            <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-blue/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl pointer-events-none" />

            <MaxWidthWrapper className="relative z-10">
                <div className="space-y-24! md:space-y-32!">
                    {/* Content Section — Text Left, Categories Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12! lg:gap-20! items-start">
                        {/* Left — Title & Description */}
                        <div className="lg:col-span-5 space-y-8! lg:sticky lg:top-2">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="font-display font-semibold uppercase tracking-[0.2em] text-blue-mid text-sm"
                            >
                                The Revolution
                            </motion.p>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-black uppercase text-4xl md:text-5xl lg:text-7xl text-white leading-[0.9]"
                            >
                                This is bigger than{' '}
                                <span className="text-blue">you think.</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                className="space-y-6!"
                            >
                                <p className="font-body text-white/70 text-lg md:text-2xl leading-relaxed max-w-lg">
                                    Not a person. Not a trend. A growing standard for people who refuse to stay average. A generation of thinkers, builders, and doers who decided to charge their brains instead of waiting for life to change.
                                </p>

                                <p className="font-body text-blue font-semibold text-lg md:text-2xl">
                                    The movement has already started. And you're early.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right — Categories Grid */}
                        <div className="lg:col-span-7 relative">
                            {/* Decorative background glows */}
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange/10 rounded-full blur-3xl pointer-events-none" />

                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4! md:gap-6! relative z-10"
                            >
                                {movementCategories.map((item) => (
                                    <motion.div
                                        key={item.category}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.95, y: 20 },
                                            show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        className="group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6! md:p-8! hover:border-blue/50 hover:bg-blue/5 transition-all duration-500"
                                    >
                                        {/* Icon & Label */}
                                        <div className="flex flex-col gap-4! mb-6!">
                                            <div className="w-14 h-14 rounded-2xl bg-blue/10 flex items-center justify-center text-blue group-hover:scale-110 group-hover:bg-blue/20 transition-all duration-500">
                                                <item.icon size={28} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="font-display font-bold uppercase tracking-[0.2em] text-blue/60 text-[10px] mb-1!">
                                                    {item.category}
                                                </p>
                                                <h4 className="font-display font-black uppercase text-white text-2xl group-hover:text-blue transition-colors">
                                                    {item.value}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="font-body text-white/50 text-lg md:text-2xl leading-relaxed group-hover:text-white/80 transition-colors">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Closing CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative py-16! md:py-20! px-8! md:px-12! rounded-[2.5rem] overflow-hidden"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-orange/5 to-transparent backdrop-blur-2xl border border-blue/20" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue/10 rounded-full blur-3xl" />

                        {/* Content */}
                        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8!">
                            <h3 className="font-display font-black text-white text-3xl md:text-5xl uppercase leading-tight">
                                The movement has already started.<br />
                                <span className="text-blue">The only question is whether you are in it.</span>
                            </h3>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue text-white px-12! py-5! rounded-full font-display font-black uppercase text-xs md:text-sm tracking-[0.15em] shadow-2xl shadow-blue/30 group"
                            >
                                <span className="flex items-center gap-3!">
                                    Join The Community
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
