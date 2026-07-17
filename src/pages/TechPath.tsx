import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Lightbulb, Briefcase, TrendingUp, Sparkles, Target, Compass, Mail, User, ArrowRight } from 'lucide-react';
import { STUDY_FIELDS } from '../data/studyFields';
import { supabase } from '../lib/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

interface TechPath {
    data: {
        title: string,
        description: string,
        roles: string[],
        skills: string[],
        why: string,
    },
    subject: string,
}

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
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState('Initializing search...');
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', email: '' });
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const [aiGeneratedPath, setAiGeneratedPath] = useState<TechPath | null>(null);
    const [isAiFetching, setIsAiFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const suggestionRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (searchInput.length > 1) {
            const filtered = STUDY_FIELDS.filter(field =>
                field.toLowerCase().includes(searchInput.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchInput]);

    // Handle clicking outside of suggestions
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRevealPath = async () => {
        const fieldToUse = searchInput.trim();
        if (!fieldToUse) return;

        setSelectedField(fieldToUse);
        setAiGeneratedPath(null);
        setShowResults(false);
        setShowLeadForm(false);
        setIsLoading(true);
        setIsAiFetching(true);
        setError(null);
        setLoadingProgress(0);
        setLoadingStatus('Identifying best tech career matches...');

        // Scroll to results area
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        // Simulate progress for premium feel
        const intervals = [
            { threshold: 30, status: 'Analyzing your background...', duration: 800 },
            { threshold: 60, status: 'Mapping potential career choices...', duration: 1200 },
            { threshold: 90, status: 'Generating personalized recommendations...', duration: 1000 },
            { threshold: 100, status: 'Analysis complete!', duration: 500 }
        ];

        let currentIntervalIdx = 0;
        const timer = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsLoading(false);
                        if (leadData.name.trim() && leadData.email.trim()) {
                            setShowResults(true);
                        } else {
                            setShowLeadForm(true);
                        }
                    }, 500);
                    return 100;
                }

                const nextVal = prev + Math.random() * 5;
                if (nextVal >= intervals[currentIntervalIdx].threshold && currentIntervalIdx < intervals.length - 1) {
                    setLoadingStatus(intervals[currentIntervalIdx + 1].status);
                    currentIntervalIdx++;
                }
                return Math.min(nextVal, 100);
            });
        }, 100);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/generate-path`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: fieldToUse })
            });

            const result = await response.json();
            if (result.success) {
                setAiGeneratedPath(result);
            } else {
                console.warn('AI Generation failed, falling back to local recommendations if available.');
            }
        } catch (err) {
            console.error('Error calling AI agent:', err);
        } finally {
            setIsAiFetching(false);
        }
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingLead(true);

        try {
            // Save to Supabase
            const { error: sbError } = await supabase
                .from('leads')
                .insert([
                    {
                        name: leadData.name,
                        email: leadData.email,
                        field_of_study: selectedField || searchInput
                    }
                ]);

            if (sbError) throw sbError;

            setShowLeadForm(false);
            setShowResults(true);
        } catch (err) {
            console.error('Error saving lead:', err);
            // Even if save fails, let them see results for better UX, but log it
            setShowLeadForm(false);
            setShowResults(true);
        } finally {
            setIsSubmittingLead(false);
        }
    };

    // const handleFieldClick = (field: string) => {
    //     setSelectedField(field);
    //     setSearchInput(field);
    // };

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
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8! mb-16! flex-col lg:flex-none">
                            {/* Left Panel: Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="order-2 lg:order-1 lg:col-span-7 relative rounded-3xl"
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
                                    <div className="relative" ref={suggestionRef}>
                                        <label className="block font-display font-semibold text-canvas/80 text-sm md:text-base mb-4!">
                                            Find the Tech field you can go into based on your course
                                        </label>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-canvas/40 group-focus-within:text-blue transition-colors" size={20} />
                                            <input
                                                type="text"
                                                value={searchInput}
                                                onFocus={() => searchInput.length > 1 && setShowSuggestions(true)}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                placeholder="Enter the course you studied (e.g Biochemistry)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4! pl-12! pr-4! text-canvas placeholder:text-canvas/30 focus:outline-none focus:border-blue/50 transition-all font-body"
                                            />
                                        </div>

                                        {/* Suggestions Dropdown */}
                                        <AnimatePresence>
                                            {showSuggestions && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute z-50 left-0 right-0 mt-2 bg-ink/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
                                                >
                                                    {suggestions.map((suggestion) => (
                                                        <button
                                                            key={suggestion}
                                                            onClick={() => {
                                                                setSearchInput(suggestion);
                                                                setSelectedField(suggestion);
                                                                setShowSuggestions(false);
                                                            }}
                                                            className="w-full text-left px-6! py-3! text-canvas/70 hover:bg-blue hover:text-white transition-colors border-b border-white/5 last:border-0 font-body text-sm"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={handleRevealPath}
                                        disabled={isLoading || (!selectedField && !searchInput)}
                                        className="bg-blue-mid hover:bg-blue text-white font-display font-bold uppercase tracking-widest px-10! py-5! rounded-xl transition-all duration-300 flex items-center gap-3! w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                                    >
                                        <span className="relative z-10">{isLoading ? 'Processing...' : 'Reveal my path'}</span>
                                        {!isLoading && <Zap className="fill-current relative z-10" size={18} />}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue to-blue-mid opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Right Panel: How it works */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center p-4! md:p-8!"
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

                        {/* Results Area - Only shown when showResults, isLoading, or showLeadForm is true */}
                        {(showResults || isLoading || showLeadForm) && (
                            <div ref={resultsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8!">
                                {/* Results Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="lg:col-span-12 bg-ink backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5! md:p-8! lg:p-12! relative overflow-hidden"
                                >
                                    <div className="absolute top-8! left-8! flex items-center gap-2! bg-white/5 rounded-full px-3! py-1!">
                                        <Target className="w-3 h-3 text-blue-mid" />
                                        <span className="text-[10px] md:text-xs font-display font-bold uppercase tracking-wider text-blue-mid">
                                            {isLoading ? 'Generating...' : 'Recommended path'}
                                        </span>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center text-center py-10! md:py-20!">
                                            {/* Circular Progress */}
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8! md:mb-12!">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="64"
                                                        cy="64"
                                                        r="58"
                                                        stroke="currentColor"
                                                        strokeWidth="8"
                                                        fill="transparent"
                                                        className="text-white/10"
                                                    />
                                                    <motion.circle
                                                        cx="64"
                                                        cy="64"
                                                        r="58"
                                                        stroke="currentColor"
                                                        strokeWidth="8"
                                                        fill="transparent"
                                                        strokeDasharray={364.4}
                                                        initial={{ strokeDashoffset: 364.4 }}
                                                        animate={{ strokeDashoffset: 364.4 - (364.4 * loadingProgress) / 100 }}
                                                        transition={{ duration: 0.5, ease: "linear" }}
                                                        className="text-blue"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-blue/20 rounded-full animate-spin border-t-blue" />
                                                </div>
                                            </div>

                                            <h4 className="font-display font-black uppercase text-base md:text-2xl text-canvas mb-2! px-4!">
                                                {loadingStatus}
                                            </h4>

                                            {/* Linear Progress */}
                                            <div className="w-full max-w-xs md:max-w-md mt-6! md:mt-8! px-2! md:px-0!">
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3!">
                                                    <motion.div
                                                        className="h-full bg-blue"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${loadingProgress}%` }}
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center px-1!">
                                                    <span className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-white/30 italic">Processing</span>
                                                    <span className="text-xs md:text-sm font-display font-black text-canvas">{Math.round(loadingProgress)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : showLeadForm ? (
                                        <div className="flex flex-col items-center justify-center text-center py-8! md:py-12! w-full max-w-xl mx-auto!">
                                            <h4 className="font-display font-black uppercase text-2xl md:text-4xl text-canvas mb-3! md:mb-4!">
                                                Almost there!
                                            </h4>
                                            <p className="font-body text-muted text-sm md:text-lg mb-6! md:mb-10! px-2!">
                                                Enter your details to reveal your personalized career path.
                                            </p>

                                            <form onSubmit={handleLeadSubmit} className="w-full space-y-3! md:space-y-4!">
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue transition-colors" size={18} />
                                                    <input
                                                        required
                                                        type="email"
                                                        value={leadData.email}
                                                        onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                                                        placeholder="Email"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5! md:py-4! pl-11! pr-4! text-canvas placeholder:text-white/30 focus:outline-none focus:border-blue/50 transition-all text-sm md:text-base"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue transition-colors" size={18} />
                                                    <input
                                                        required
                                                        type="text"
                                                        value={leadData.name}
                                                        onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                                                        placeholder="Name"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5! md:py-4! pl-11! pr-4! text-canvas placeholder:text-white/30 focus:outline-none focus:border-blue/50 transition-all text-sm md:text-base"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmittingLead}
                                                    className="w-full bg-blue hover:bg-blue-mid text-white font-display font-black uppercase tracking-widest py-4! md:py-5! rounded-xl transition-all duration-300 flex items-center justify-center gap-2! shadow-lg shadow-blue/20 text-sm md:text-base"
                                                >
                                                    {isSubmittingLead ? 'Processing...' : 'Reveal My Path'}
                                                    {!isSubmittingLead && <ArrowRight size={18} />}
                                                </button>
                                            </form>
                                        </div>
                                    ) : (isAiFetching) ? (
                                        <div className="flex flex-col items-center justify-center text-center py-10! md:py-20!" />
                                    ) : error ? (
                                        <div className="flex flex-col items-center justify-center text-center min-h-[400px] py-12!">
                                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6!">
                                                <span className="text-3xl">⚠️</span>
                                            </div>
                                            <h4 className="font-display font-black uppercase text-2xl md:text-3xl text-canvas mb-4!">
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
                                    ) : (aiGeneratedPath || pathRecommendations[selectedField]) ? (
                                        <div className="mt-6! md:mt-8! space-y-6! md:space-y-8!">
                                            {(() => {
                                                const pathData = aiGeneratedPath ? aiGeneratedPath.data : pathRecommendations[selectedField];

                                                return (
                                                    <>
                                                        {/* Path Title */}
                                                        <div className="pt-2! md:pt-4!">
                                                            <div className="flex items-start gap-3! mb-3! md:mb-4!">
                                                                <Compass className="w-6 h-6 md:w-8 md:h-8 text-blue flex-shrink-0 mt-1!" />
                                                                <h3 className="font-display font-black uppercase text-xl md:text-3xl lg:text-4xl text-canvas leading-tight">
                                                                    {pathData.title}
                                                                </h3>
                                                            </div>
                                                            <p className="font-body text-canvas text-sm md:text-lg leading-relaxed pl-0! md:pl-0!">
                                                                {pathData.description}
                                                            </p>
                                                        </div>

                                                        {/* Why This Path */}
                                                        <div className="bg-blue/5 border border-blue/10 rounded-xl md:rounded-2xl p-4! md:p-6! lg:p-8!">
                                                            <div className="flex items-center gap-2! md:gap-3! mb-2! md:mb-3!">
                                                                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-blue flex-shrink-0" />
                                                                <h4 className="font-display font-bold uppercase text-xs md:text-sm tracking-wider text-canvas">
                                                                    Why this path fits you
                                                                </h4>
                                                            </div>
                                                            <p className="font-body text-canvas/80 text-sm md:text-lg leading-relaxed">
                                                                {pathData.why}
                                                            </p>
                                                        </div>

                                                        {/* Roles & Skills Grid */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4! md:gap-6! lg:gap-8!">
                                                            {/* Roles */}
                                                            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4! md:p-6! lg:p-8!">
                                                                <div className="flex items-center gap-2! md:gap-3! mb-4! md:mb-6!">
                                                                    <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                                                                    <h4 className="font-display font-bold uppercase text-xs tracking-wider text-white/60">
                                                                        Sample Roles
                                                                    </h4>
                                                                </div>
                                                                <ul className="space-y-2! md:space-y-3!">
                                                                    {pathData.roles.map((role: string, idx: number) => (
                                                                        <li key={idx} className="flex items-start gap-2! md:gap-3!">
                                                                            <span className="text-blue text-base md:text-lg mt-0.5! flex-shrink-0">•</span>
                                                                            <span className="font-body text-canvas text-sm md:text-base leading-snug">{role}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Skills */}
                                                            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4! md:p-6! lg:p-8!">
                                                                <div className="flex items-center gap-2! md:gap-3! mb-4! md:mb-6!">
                                                                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                                                                    <h4 className="font-display font-bold uppercase text-xs tracking-wider text-white/60">
                                                                        Skills to Learn
                                                                    </h4>
                                                                </div>
                                                                <ul className="space-y-2! md:space-y-3!">
                                                                    {pathData.skills.map((skill: string, idx: number) => (
                                                                        <li key={idx} className="flex items-start gap-2! md:gap-3!">
                                                                            <span className="text-blue text-base md:text-lg mt-0.5! flex-shrink-0">•</span>
                                                                            <span className="font-body text-canvas text-sm md:text-base leading-snug">{skill}</span>
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
                                                className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6!"
                                            >
                                                <Compass className="w-8 h-8 text-white/20" />
                                            </motion.div>

                                            <h4 className="font-display font-black uppercase text-2xl md:text-3xl text-canvas mb-4!">
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
