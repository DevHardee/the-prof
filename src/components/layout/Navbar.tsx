import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useNavigate, useLocation } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: 'hero' } });
        } else {
            const el = document.getElementById('hero');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return (
        <img
            src="/assets/logos/The Prof Logo-01.jpg"
            alt="Prof Logo"
            onClick={handleLogoClick}
            className="w-[150px] h-auto md:w-[200px] rounded-lg shadow-sm cursor-pointer"
        />
    );
}

const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'The Truth', target: 'about' },
    { label: 'The Prof', target: 'pillars' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'TechPath', target: '/techpath' },
    { label: 'Events', target: '/events' }
] as const;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Track active section on Home page
    useEffect(() => {
        if (location.pathname !== '/') return;

        const handleScroll = () => {
            const sections = ['hero', 'about', 'pillars', 'testimonials', 'join-cta'];
            const scrollPosition = window.scrollY + 200; // Offset for navbar

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const isActive = (target: string) => {
        if (target.startsWith('/')) {
            return location.pathname === target;
        }
        return location.pathname === '/' && activeSection === target;
    };

    const handleNavigate = (target: string) => {
        setIsOpen(false);
        if (target.startsWith('/')) {
            navigate(target);
            return;
        }

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: target } });
        } else {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.nav
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-0 z-50 bg-ink! backdrop-blur-md border-b! border-ink! w-full!"
        >
            <MaxWidthWrapper className="flex! justify-between! items-center! py-5! px-4! md:px-8!">
                {/* Left: Logo */}
                <div className="flex-1! flex! justify-start!">
                    <Logo />
                </div>

                {/* Center: Desktop Menu */}
                <div className="hidden! lg:flex! flex-1! justify-center! gap-8!">
                    {navLinks.map((link, idx) => (
                        <motion.a
                            key={link.label}
                            href={link.target.startsWith('/') ? link.target : `#${link.target}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigate(link.target);
                            }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (idx + 1), duration: 0.5, ease: 'easeOut' }}
                            className={`font-display font-semibold text-xs! md:text-sm! uppercase! tracking-widest! transition-colors! cursor-pointer! whitespace-nowrap! ${isActive(link.target) ? 'text-orange!' : 'text-canvas! hover:text-orange!'
                                }`}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                {/* Right: CTA Button */}
                <div className="hidden! lg:flex! flex-1! justify-end! items-center! gap-4!">
                    <motion.button
                        onClick={() => handleNavigate('join-cta')}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                        className="bg-blue! text-white! hover:bg-white! hover:text-blue! font-display font-bold! uppercase! tracking-wider! px-5! py-2.5! rounded! transition-all! duration-300! text-xs! md:text-sm! flex! items-center! gap-2! cursor-pointer!"
                    >
                        Charge Your Brain
                        <Zap size={14} className="fill-current" />
                    </motion.button>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="lg:hidden! text-white! hover:text-orange! transition-colors! p-2! z-50!"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
                </button>
            </MaxWidthWrapper>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="lg:hidden! bg-ink! border-b! border-border-solid overflow-hidden!"
                    >
                        <div className="flex! flex-col! items-center! py-8! px-6! gap-6!">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.target.startsWith('/') ? link.target : `#${link.target}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigate(link.target);
                                    }}
                                    className={`font-display font-semibold! text-lg! uppercase! tracking-widest! transition-colors! w-full! text-center! py-2! cursor-pointer! ${isActive(link.target) ? 'text-orange!' : 'text-canvas! hover:text-orange!'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}

                            <div className="flex! flex-col! w-full! gap-3! mt-4!">
                                <button
                                    onClick={() => handleNavigate('join-cta')}
                                    className="bg-blue! text-white! font-display font-bold! uppercase! tracking-wider! px-8! py-4! rounded-full! hover:bg-white! hover:text-blue! transition-all! duration-300! w-full! text-center! flex! items-center! justify-center! gap-2! cursor-pointer!"
                                >
                                    Charge Your Brain
                                    <Zap size={16} className="fill-current" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
