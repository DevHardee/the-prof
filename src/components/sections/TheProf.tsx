import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Target, ShieldCheck, BrainCircuit, Unlock, Crown, Globe, Zap, CalendarDays, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useNavigate } from 'react-router-dom';

const profCards = [
    {
        label: 'VISION',
        desc: 'To become a trusted source of knowledge, clarity, and mental elevation. The brand that charges millions of minds and sparks a generation of bold, informed, and fearless builders – one person at a time.',
        icon: Eye
    },
    {
        label: 'MISSION',
        desc: 'To educate, inspire, and empower every person with the right knowledge to build a life they are proud of. No paywalls. No gatekeeping - because access to clarity should never be a privilege.',
        icon: Target
    },
    {
        label: 'BRAND MESSAGE',
        desc: 'You are one idea, one decision, and one knowledge away from changing everything. Charge your brain.',
        icon: BrainCircuit
    },
    {
        label: 'WHAT DRIVES US',
        desc: (
            <>
                Five values power everything at The Prof – <span className="font-bold text-canvas">Freedom</span>, <span className="font-bold text-canvas">Integrity</span>, <span className="font-bold text-canvas">Accessibility</span>, <span className="font-bold text-canvas">Inspiration</span>, and <span className="font-bold text-canvas">Consistency</span>. Not words on a wall. Standards we are held to every single day.
            </>
        ),
        icon: ShieldCheck,
        link: true
    },
];

const brandValues = [
    {
        icon: Unlock,
        label: 'Freedom',
        desc: "Knowledge at The Prof is always free. No exceptions. No paywalls. If you need it, it's yours."
    },
    {
        icon: Crown,
        label: 'Integrity',
        desc: "We only teach what we know is true. We will never mislead for clicks, clout, or fame. Credibility is the only currency."
    },
    {
        icon: Globe,
        label: 'Accessibility',
        desc: "Built to be understood by anyone, anywhere, at any level. Complexity is the enemy. Clarity is the product."
    },
    {
        icon: Zap,
        label: 'Inspiration',
        desc: "Every piece of content must leave you more motivated than it found you. We don't just inform, we ignite."
    },
    {
        icon: CalendarDays,
        label: 'Consistency',
        desc: "We show up regularly because the world cannot afford for us to stop. The mission doesn't pause."
    }
];

export default function TheProf() {
    const [showValues, setShowValues] = useState(false);
    const navigate = useNavigate();

    return (
        <section id="pillars" className="bg-ink py-24! relative overflow-hidden z-10 w-full overflow-x-hidden">
            {/* Layered Background elements */}
            {/* Base layer - Large ambient glows */}
            <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-blue/15 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-blue/12 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Mid layer - Overlapping accent glows */}
            <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-blue/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-blue/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Top layer - Smaller focused glows */}
            <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-blue/25 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute top-2/3 right-1/3 w-[350px] h-[350px] bg-blue/20 rounded-full blur-[60px] pointer-events-none" />

            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60 pointer-events-none" />

            <MaxWidthWrapper>
                <div className="relative z-10 w-full space-y-24!">
                    {/* Bio Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12! lg:gap-16! items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group lg:sticky lg:top-24"
                        >
                            <div className="absolute -inset-6 bg-blue/20 rounded-[3rem] blur-3xl group-hover:bg-blue/30 transition-colors duration-500" />
                            <div className="absolute -inset-2 bg-gradient-to-br from-blue/20 via-transparent to-orange/10 rounded-[2.5rem] opacity-50" />

                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-canvas/10 shadow-2xl shadow-blue/10">
                                <img
                                    src="/assets/prof.jpeg"
                                    alt="Kehinde Adebanjo (The Prof)"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-70" />

                                {/* Corner accent lines */}
                                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-blue/50" />
                                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-blue/50" />
                            </div>

                            {/* Enhanced Accent element */}
                            <div className="absolute -bottom-8 -right-2 md:-right-8 w-32 h-32 md:w-40 md:h-40 bg-blue/15 backdrop-blur-xl border-2 border-canvas/20 rounded-3xl p-6! flex items-center justify-center shadow-xl">
                                <div className="text-center">
                                    <div className="text-blue font-display font-black text-3xl leading-none">THE</div>
                                    <div className="text-canvas font-display font-black text-3xl leading-none mt-1">PROF</div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-8!">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="font-display font-semibold uppercase tracking-[0.2em] text-blue-mid! text-sm mb-4!">Meet The Prof</p>
                                <h2 className="font-display font-black uppercase text-4xl md:text-5xl lg:text-6xl text-canvas leading-[0.9]">
                                    Kehinde <span className="text-blue">Adebanjo.</span>
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-6! text-canvas/80 font-body text-lg leading-relaxed"
                            >
                                <p>
                                    His name is Kehinde Adebanjo. But most people just call him <span className="text-canvas font-bold italic">The Prof.</span>
                                </p>
                                <p>
                                    He didn't start with confidence. He started with a speech defect and a room full of people who laughed. Through secondary school and into his early years in higher institution, speaking was something that happened to other people, not to him. Then one faculty did something nobody else had done: they pushed him in front of a room full of young people who needed to hear what the journey ahead looked like.
                                </p>
                                <p>
                                    He spoke. They listened. They clapped. They laughed with him, not at him. And something shifted that never shifted back. <span className="text-blue font-semibold italic">That was the beginning of The Prof.</span>
                                </p>

                                <div className="pt-4! border-t border-canvas/10">
                                    <h3 className="font-display font-bold text-canvas uppercase text-xl mb-4!">Then came the storm</h3>
                                    <p>
                                        What came after wasn't easy; some days he cried. Some days the weight was too heavy to name. This left him with nothing but lessons. But he didn't disappear.
                                    </p>
                                </div>

                                <p>
                                    Today, Kehinde is rebuilding. Not with bitterness, he carries no regrets, only understanding. He is clear about what he does have: his hands, his brain, and God. While quietly navigating his own storm, he has spent years counselling others through theirs, helping people find direction while keeping his own battles private.
                                </p>

                                <p className="bg-blue/10 border-l-4 border-blue p-6! rounded-r-xl text-canvas italic">
                                    "The Prof is the moment those two things finally meet. His story and your journey. His mistakes and your map. He is not building this from a place of arrival. He is building it from the middle of the road, because that is exactly where you are too, and that is precisely why you should listen."
                                </p>

                                <p>
                                    He wished someone had grabbed his hand and pushed him back on track when everything fell apart. Nobody did. So, he became that person, <span className="text-blue-mid font-bold">for you.</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Pillars Grid */}
                    <div className="space-y-12!">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6!">
                            {profCards.map((card, index) => (
                                <motion.div
                                    key={card.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="group bg-ink/50 backdrop-blur-sm border border-canvas/10 hover:border-blue/50 rounded-2xl p-8! flex flex-col gap-6! hover:bg-blue/5 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center text-blue group-hover:scale-110 transition-transform duration-500">
                                        <card.icon size={24} strokeWidth={2} />
                                    </div>
                                    <div className="space-y-3!">
                                        <h3 className="font-display font-black text-canvas text-xl uppercase tracking-wider">
                                            {card.label}
                                        </h3>
                                        <p className="font-body text-canvas/70 text-base leading-relaxed">
                                            {card.desc}
                                        </p>
                                    </div>
                                    {card.link && (
                                        <button
                                            onClick={() => setShowValues(!showValues)}
                                            className="mt-auto pt-4! flex items-center gap-2 text-blue-mid font-display font-bold uppercase text-xs tracking-widest group-hover:gap-4 transition-all cursor-pointer"
                                        >
                                            {showValues ? 'Hide' : 'See'} our values <ArrowRight size={14} className={`transition-transform ${showValues ? 'rotate-90' : ''}`} />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Values Strip - Collapsible */}
                    <AnimatePresence>
                        {showValues && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-8! pt-12! border-t border-canvas/10 overflow-hidden"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-center"
                                >
                                    <h3 className="font-display font-black text-canvas text-3xl md:text-4xl uppercase tracking-tighter">
                                        Brand <span className="text-blue">Values.</span>
                                    </h3>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4!">
                                    {brandValues.map((value, index) => (
                                        <motion.div
                                            key={value.label}
                                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                            className="bg-canvas/5 border border-canvas/10 rounded-xl p-6! space-y-4! hover:border-blue/30 hover:bg-blue/5 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center text-blue">
                                                <value.icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-canvas uppercase text-sm tracking-widest mb-2! flex items-center gap-2!">
                                                    {value.label}
                                                </h4>
                                                <p className="font-body text-canvas/60 text-xs leading-relaxed">
                                                    {value.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative py-20! px-8! rounded-[3rem] overflow-hidden text-center"
                    >
                        <div className="absolute text-center inset-0 bg-blue/10 backdrop-blur-3xl border border-blue/20" />
                        <div className="relative z-10 max-w-6xl mx-auto space-y-8!">
                            <h2 className="font-display font-black text-canvas text-3xl md:text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tighter">
                                The path is already built.<br />
                                <span className="text-blue">You just need to walk it.</span>
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4! justify-center!">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue text-white px-12! py-5! rounded-full font-display font-black uppercase text-xs md:text-sm tracking-[0.2em] shadow-2xl shadow-blue/20 group"
                                >
                                    <span
                                        onClick={() => navigate('/events')}
                                        className="flex items-center gap-3!">
                                        View Upcoming Events
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue text-white px-12! py-5! rounded-full font-display font-black uppercase text-xs md:text-sm tracking-[0.2em] shadow-2xl shadow-blue/20 group"
                                >
                                    <span
                                        onClick={() => navigate('/techpath')}
                                        className="flex items-center gap-3!">
                                        Join The Community
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}