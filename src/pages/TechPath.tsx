import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Zap, Lightbulb, Briefcase, TrendingUp, Sparkles, Target, Compass } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

const studyFields = [
    'Microbiology',
    'Accounting',
    'Mass Communication',
    'Economics',
    'English'
];

const howItWorks = [
    {
        id: 1,
        title: 'Start with the discipline or strength you already have.',
        desc: 'Choose your background or expertise.'
    },
    {
        id: 2,
        title: 'See the digital path that best matches the way you think.',
        desc: 'Personalized mapping based on your skills.'
    },
    {
        id: 3,
        title: 'Move forward with more confidence, focus, and direction.',
        desc: 'Actionable steps to enter tech or digital roles.'
    }
];

const features = [
    {
        icon: <Lightbulb className="w-5 h-5 text-blue" />,
        title: 'Clarity first',
        desc: 'The Prof helps visitors understand where their current strengths can lead.'
    },
    {
        icon: <Briefcase className="w-5 h-5 text-blue" />,
        title: 'Practical routes',
        desc: 'Each path stays actionable, modern, and easy to follow.'
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-blue" />,
        title: 'Confidence boost',
        desc: 'The experience is designed to move people from confusion to momentum.'
    }
];

export default function TechPath() {
    const [showResults, setShowResults] = useState(false);

    const handleRevealPath = () => {
        setShowResults(true);
    };

    return (
        <div className="w-full relative min-h-screen flex flex-col bg-ink">
            <Navbar />

            <main className="flex-grow w-full flex flex-col">
                {/* Hero Header */}
                <section className="relative w-full pt-32! pb-16! overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px]! h-[800px]! bg-blue/10 rounded-full blur-[150px]! pointer-events-none" />

                    <MaxWidthWrapper className="relative z-10">
                        <div className="text-center mb-8!">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4! py-1.5! mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-blue" />
                                <span className="font-display font-bold uppercase tracking-widest text-blue-mid text-sm">
                                    TechPath
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="font-display font-black uppercase text-5xl md:text-6xl lg:text-7xl text-canvas leading-[0.95] mb-6! max-w-4xl mx-auto"
                            >
                                Find Your Path Forward
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="font-body text-canvas/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                            >
                                TechPath translates your current background into practical opportunities in tech, digital work, and modern career growth. No matter where you're starting from, there's a clear path forward.
                            </motion.p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Main Content Section */}
                <section className="relative z-10 w-full py-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 rounded-full blur-[120px] pointer-events-none" />

                    <MaxWidthWrapper className="relative z-10">
                        {/* Tool Main Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8! mb-16!">
                            {/* Left Panel: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-7 relative rounded-3xl"
                            >
                                {/* Animated glow border */}
                                <motion.div
                                    className="absolute -inset-[2px] bg-gradient-to-r from-blue via-blue/50 to-blue rounded-3xl opacity-70"
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        filter: ["blur(4px)", "blur(12px)", "blur(4px)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />

                                <div className="relative h-full bg-ink backdrop-blur-xl border border-white/10 rounded-3xl p-8! md:p-12! space-y-8">
                                    {/* Search */}
                                    <div>
                                        <label className="block font-display font-semibold text-canvas/80 text-sm md:text-base mb-4">
                                            What did you study, or where do your strengths already live?
                                        </label>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-canvas/40 group-focus-within:text-blue transition-colors" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Try Microbiology, Accounting, Economics..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-canvas placeholder:text-canvas/30 focus:outline-none focus:border-blue/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-3">
                                        {studyFields.map((field) => (
                                            <button
                                                key={field}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-5! py-2! text-sm text-canvas/80 transition-all duration-300"
                                            >
                                                {field}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Personalization */}
                                    <div>
                                        <label className="block font-display font-semibold text-canvas/80 text-sm mb-4">
                                            Who should we personalise this for?
                                        </label>
                                        <div className="relative">
                                            <select className="w-full appearance-none bg-ink/95 border border-white/10 rounded-xl py-4! px-4! text-canvas focus:outline-none focus:border-blue/50 transition-all">
                                                <option>Scholar</option>
                                                <option>Professional</option>
                                                <option>Entrepreneur</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-canvas/40 pointer-events-none" size={20} />
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={handleRevealPath}
                                        className="bg-blue-mid hover:bg-blue text-white font-display font-bold uppercase tracking-widest px-10 py-5 rounded-xl transition-all duration-300 flex items-center gap-3 w-full md:w-auto justify-center"
                                    >
                                        Reveal my path
                                        <Zap className="fill-current" size={18} />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Right Panel: How it works */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-5 flex flex-col justify-center p-4 md:p-8"
                            >
                                <h3 className="font-display font-black uppercase text-xs tracking-[0.2em] text-blue mb-10">
                                    HOW IT WORKS
                                </h3>

                                <div className="space-y-10">
                                    {howItWorks.map((step) => (
                                        <div key={step.id} className="flex gap-6 group">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue/10 border border-blue/20 rounded-full flex items-center justify-center text-blue font-display font-bold transition-all group-hover:bg-blue group-hover:text-white">
                                                {step.id}
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-canvas text-sm md:text-base leading-snug mb-2">
                                                    {step.title}
                                                </h4>
                                                <p className="font-body text-canvas/40 text-xs md:text-sm">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Results Area - Only shown when showResults is true */}
                        {showResults && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Placeholder Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="lg:col-span-7 bg-canvas border border-ink/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
                                >
                                    <div className="absolute top-8 left-8 flex items-center gap-2 bg-ink/5 rounded-full px-3 py-1">
                                        <Target className="w-3 h-3 text-ink/30" />
                                        <span className="text-[10px] font-display font-bold uppercase tracking-wider text-ink/30">Recommended path</span>
                                    </div>

                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-16 h-16 bg-ink/5 rounded-full flex items-center justify-center mb-6"
                                    >
                                        <Compass className="w-8 h-8 text-ink/20" />
                                    </motion.div>

                                    <h4 className="font-display font-black uppercase text-2xl md:text-3xl text-ink mb-4">
                                        Your recommendation will appear here.
                                    </h4>
                                    <p className="font-body text-muted text-base md:text-lg max-w-sm">
                                        Use any of the sample backgrounds above to preview the experience, or type your own closest discipline.
                                    </p>
                                </motion.div>

                                {/* Features Column */}
                                <div className="lg:col-span-5 flex flex-col gap-4">
                                    {features.map((feat, idx) => (
                                        <motion.div
                                            key={feat.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-blue/30 transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-5">
                                                <div className="p-3 bg-blue/10 border border-blue/20 rounded-xl">
                                                    {feat.icon}
                                                </div>
                                                <div>
                                                    <h5 className="font-display font-bold text-canvas text-base mb-2">
                                                        {feat.title}
                                                    </h5>
                                                    <p className="font-body text-canvas/50 text-sm leading-relaxed">
                                                        {feat.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </MaxWidthWrapper>
                </section>
            </main>

            <Footer />
        </div>
    );
}
