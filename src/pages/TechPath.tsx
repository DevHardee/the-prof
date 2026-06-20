import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Lightbulb, Briefcase, TrendingUp, Sparkles, Target, Compass } from 'lucide-react';
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

const pathRecommendations: Record<string, { title: string; description: string; roles: string[]; skills: string[]; why: string }> = {
    'Microbiology': {
        title: 'Bioinformatics & Data Science',
        description: 'Your scientific training translates directly into analyzing biological data, working with research databases, and contributing to computational biology projects.',
        roles: ['Bioinformatics Analyst', 'Clinical Data Analyst', 'Research Data Scientist', 'Laboratory Informatics Specialist'],
        skills: ['Python for data analysis', 'SQL for databases', 'Statistical analysis tools', 'Data visualization'],
        why: 'Your understanding of biological systems, research methodology, and attention to detail are exactly what bioinformatics teams need. The logical thinking you developed in lab work applies directly to data pipelines and analysis.'
    },
    'Accounting': {
        title: 'Financial Technology & Analytics',
        description: 'Your precision with numbers and understanding of financial systems positions you perfectly for fintech, business intelligence, and financial data analysis roles.',
        roles: ['Financial Data Analyst', 'Business Intelligence Analyst', 'Fintech Product Analyst', 'Revenue Operations Specialist'],
        skills: ['Excel & data modeling', 'SQL for financial data', 'Business intelligence tools (Tableau, Power BI)', 'Financial APIs'],
        why: 'Your systematic approach to reconciliation, understanding of financial flows, and attention to accuracy make you valuable in data-driven finance roles. Companies need people who understand both the numbers and the business context.'
    },
    'Mass Communication': {
        title: 'Digital Marketing & Content Strategy',
        description: 'Your storytelling ability and understanding of audience engagement translate directly into digital marketing, UX writing, and content strategy roles.',
        roles: ['Digital Marketing Specialist', 'Content Strategist', 'UX Writer', 'Social Media Analyst', 'SEO Specialist'],
        skills: ['Content management systems', 'Analytics platforms (Google Analytics)', 'SEO tools', 'Email marketing platforms'],
        why: 'Your ability to craft messages and understand audience psychology is exactly what digital teams need. The principles of effective communication apply whether you\'re writing copy, analyzing engagement metrics, or planning content calendars.'
    },
    'Economics': {
        title: 'Data Analytics & Business Intelligence',
        description: 'Your analytical mindset and understanding of market dynamics position you perfectly for roles analyzing business data, market trends, and strategic insights.',
        roles: ['Business Analyst', 'Market Research Analyst', 'Data Analyst', 'Product Analyst', 'Strategy Analyst'],
        skills: ['Statistical analysis (R, Python)', 'Data visualization', 'SQL for business data', 'A/B testing & experimentation'],
        why: 'Your training in analyzing trends, understanding causation, and working with quantitative data translates directly to business analytics. Companies need people who can turn data into strategic insights.'
    },
    'English': {
        title: 'UX Writing & Content Design',
        description: 'Your command of language and ability to clarify complex ideas positions you perfectly for roles shaping how users interact with digital products.',
        roles: ['UX Writer', 'Content Designer', 'Technical Writer', 'Documentation Specialist', 'Product Content Strategist'],
        skills: ['Content design principles', 'Information architecture', 'User research basics', 'Content management systems'],
        why: 'Your ability to write clearly, understand nuance, and structure information is invaluable in tech. Every app, website, and product needs someone who can make complex functionality understandable and guide users effectively.'
    }
};

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

export default function TechPath() {
    const [showResults, setShowResults] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiGeneratedPath, setAiGeneratedPath] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRevealPath = async () => {
        const fieldToUse = selectedField || searchInput;
        if (!fieldToUse) return;
        
        setSelectedField(fieldToUse);
        setIsLoading(true);
        setError(null);
        setShowResults(true);
        
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            
            // Call the AI backend
            const response = await fetch(`${API_URL}/api/generate-path`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: fieldToUse
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setAiGeneratedPath(result.data);
            } else {
                setError(result.error || 'Failed to generate path');
            }
        } catch (err) {
            console.error('Error calling AI agent:', err);
            setError('Failed to connect to AI engine. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFieldClick = (field: string) => {
        setSelectedField(field);
        setSearchInput(field);
    };

    return (
        <div className="w-full relative min-h-screen flex flex-col bg-ink">
            <Navbar />

            <main className="flex-grow w-full flex flex-col">
                {/* Hero Header */}
                <section className="relative w-full pt-16 md:pt-24 lg:pt-32 pb-16! overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px]! h-[800px]! bg-blue/10 rounded-full blur-[150px]! pointer-events-none" />

                    <MaxWidthWrapper className="relative z-10">
                        <div className="text-center mb-8!">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4! py-1.5! mb-6!"
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
                                className="font-display font-black uppercase text-2xl md:text-3xl lg:text-5xl text-canvas leading-[0.95] mb-6! max-w-6xl mx-auto"
                            >
                                Find Your Path Forward
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="font-body text-canvas/60 text-center text-sm md:text-lg max-w-6xl mx-auto leading-relaxed"
                            >
                                TechPath translates your current background into practical opportunities in tech, digital work, and modern career growth. No matter where you're starting from, there's a clear path forward.
                            </motion.p>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Main Content Section */}
                <section className="relative z-10 w-full py-16! overflow-hidden">
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

                                <div className="relative h-full bg-ink backdrop-blur-xl border border-white/10 rounded-3xl p-8! md:p-12! space-y-8!">
                                    {/* Search */}
                                    <div>
                                        <label className="block font-display font-semibold text-canvas/80 text-sm md:text-base mb-4!">
                                            What did you study, or where do your strengths already live?
                                        </label>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-canvas/40 group-focus-within:text-blue transition-colors" size={20} />
                                            <input
                                                type="text"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                placeholder="Try Microbiology, Accounting, Economics..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4! pl-12! pr-4! text-canvas placeholder:text-canvas/30 focus:outline-none focus:border-blue/50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-3!">
                                        {studyFields.map((field) => (
                                            <button
                                                key={field}
                                                onClick={() => handleFieldClick(field)}
                                                className={`bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-5! py-2! text-sm text-canvas/80 transition-all duration-300 ${selectedField === field ? 'bg-blue/20 border-blue/40' : ''
                                                    }`}
                                            >
                                                {field}
                                            </button>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={handleRevealPath}
                                        disabled={isLoading || (!selectedField && !searchInput)}
                                        className="bg-blue-mid hover:bg-blue text-white font-display font-bold uppercase tracking-widest px-10! py-5! rounded-xl transition-all duration-300 flex items-center gap-3! w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Generating your path...' : 'Reveal my path'}
                                        {!isLoading && <Zap className="fill-current" size={18} />}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Right Panel: How it works */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-5 flex flex-col justify-center p-4! md:p-8!"
                            >
                                <h3 className="font-display font-black uppercase text-xs tracking-[0.2em] text-blue mb-10!">
                                    HOW IT WORKS
                                </h3>

                                <div className="space-y-10!">
                                    {howItWorks.map((step) => (
                                        <div key={step.id} className="flex gap-6! group">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue/10 border border-blue/20 rounded-full flex items-center justify-center text-blue font-display font-bold transition-all group-hover:bg-blue group-hover:text-white">
                                                {step.id}
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-canvas text-sm md:text-base leading-snug mb-2!">
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
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8!">
                                {/* Results Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="lg:col-span-12 bg-canvas border border-ink/10 rounded-3xl p-8! md:p-12! relative overflow-hidden"
                                >
                                    <div className="absolute top-8! left-8! flex items-center gap-2! bg-ink/5 rounded-full px-3! py-1!">
                                        <Target className="w-3 h-3 text-ink/30" />
                                        <span className="text-[10px] font-display font-bold uppercase tracking-wider text-ink/30">
                                            {isLoading ? 'Generating...' : 'Recommended path'}
                                        </span>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center text-center min-h-[400px] py-12!">
                                            <motion.div
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 180, 360]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mb-6!"
                                            >
                                                <Sparkles className="w-8 h-8 text-blue" />
                                            </motion.div>
                                            <h4 className="font-display font-black uppercase text-2xl md:text-3xl text-ink mb-4!">
                                                Creating Your Path
                                            </h4>
                                            <p className="font-body text-muted text-base md:text-lg max-w-sm">
                                                Our AI is analyzing {selectedField} and mapping it to tech opportunities...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="flex flex-col items-center justify-center text-center min-h-[400px] py-12!">
                                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6!">
                                                <span className="text-3xl">⚠️</span>
                                            </div>
                                            <h4 className="font-display font-black uppercase text-2xl md:text-3xl text-ink mb-4!">
                                                Oops! Something went wrong
                                            </h4>
                                            <p className="font-body text-muted text-base md:text-lg max-w-sm mb-4!">
                                                {error}
                                            </p>
                                            <button
                                                onClick={handleRevealPath}
                                                className="bg-blue-mid hover:bg-blue text-white font-display font-bold uppercase tracking-widest px-6! py-3! rounded-xl transition-all duration-300 flex items-center gap-2!"
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    ) : aiGeneratedPath || pathRecommendations[selectedField] ? (
                                        <div className="mt-8! space-y-8!">
                                            {(() => {
                                                // Use AI generated path if available, otherwise fall back to hardcoded
                                                const pathData = aiGeneratedPath || pathRecommendations[selectedField];
                                                
                                                return (
                                                    <>
                                                        {/* Path Title */}
                                                        <div>
                                                            <div className="flex items-center gap-3! mb-4!">
                                                                <Compass className="w-8 h-8 text-blue" />
                                                                <h3 className="font-display font-black uppercase text-3xl md:text-4xl text-ink">
                                                                    {pathData.title}
                                                                </h3>
                                                            </div>
                                                            <p className="font-body text-muted text-lg md:text-xl leading-relaxed">
                                                                {pathData.description}
                                                            </p>
                                                        </div>

                                                        {/* Why This Path */}
                                                        <div className="bg-blue/5 border border-blue/10 rounded-2xl p-6! md:p-8!">
                                                            <div className="flex items-start gap-3! mb-3!">
                                                                <Lightbulb className="w-6 h-6 text-blue flex-shrink-0 mt-1!" />
                                                                <h4 className="font-display font-bold uppercase text-sm tracking-wider text-ink">
                                                                    Why this path fits you
                                                                </h4>
                                                            </div>
                                                            <p className="font-body text-muted text-base leading-relaxed ml-9!">
                                                                {pathData.why}
                                                            </p>
                                                        </div>

                                                        {/* Roles & Skills Grid */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6! md:gap-8!">
                                                            {/* Roles */}
                                                            <div className="bg-ink/5 rounded-2xl p-6! md:p-8!">
                                                                <div className="flex items-center gap-3! mb-6!">
                                                                    <Briefcase className="w-5 h-5 text-ink/60" />
                                                                    <h4 className="font-display font-bold uppercase text-xs tracking-wider text-ink/60">
                                                                        Sample Roles
                                                                    </h4>
                                                                </div>
                                                                <ul className="space-y-3!">
                                                                    {pathData.roles.map((role: string, idx: number) => (
                                                                        <li key={idx} className="flex items-start gap-3!">
                                                                            <span className="text-blue text-lg mt-0.5!">•</span>
                                                                            <span className="font-body text-ink text-base">{role}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Skills */}
                                                            <div className="bg-ink/5 rounded-2xl p-6! md:p-8!">
                                                                <div className="flex items-center gap-3! mb-6!">
                                                                    <TrendingUp className="w-5 h-5 text-ink/60" />
                                                                    <h4 className="font-display font-bold uppercase text-xs tracking-wider text-ink/60">
                                                                        Skills to Learn
                                                                    </h4>
                                                                </div>
                                                                <ul className="space-y-3!">
                                                                    {pathData.skills.map((skill: string, idx: number) => (
                                                                        <li key={idx} className="flex items-start gap-3!">
                                                                            <span className="text-blue text-lg mt-0.5!">•</span>
                                                                            <span className="font-body text-ink text-base">{skill}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center min-h-[400px] py-12!">
                                            <motion.div
                                                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-16 h-16 bg-ink/5 rounded-full flex items-center justify-center mb-6!"
                                            >
                                                <Compass className="w-8 h-8 text-ink/20" />
                                            </motion.div>

                                            <h4 className="font-display font-black uppercase text-2xl md:text-3xl text-ink mb-4!">
                                                Custom Path Coming Soon
                                            </h4>
                                            <p className="font-body text-muted text-base md:text-lg max-w-sm">
                                                Try one of the sample backgrounds above to see how TechPath works. We're building personalized recommendations for all fields.
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        )}
                    </MaxWidthWrapper>
                </section>
            </main>

            <Footer />
        </div>
    );
}
