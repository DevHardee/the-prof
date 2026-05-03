import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useNavigate, useLocation } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById('hero');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
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
            className="w-[120px] h-auto md:w-[250px] rounded-lg shadow-sm cursor-pointer"
        />
    );
}

const navLinks = [
    { label: 'The Truth', target: 'about' },
    { label: 'The Prof', target: 'pillars' },
    { label: 'TechPath', target: 'techpath' },
    { label: 'Voices', target: 'voices' },
    { label: 'Explore', target: 'topics' },
] as const;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavigate = (target: string) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
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
            className="sticky top-0 z-50 bg-ink! backdrop-blur-md border-b! border-border-solid w-full!"
        >
            <MaxWidthWrapper className="flex! justify-between! items-center! py-5! px-4! md:px-8!">
                {/* Left: Logo */}
                <div className="flex-1! flex! justify-start!">
                    <Logo />
                </div>

                {/* Center: Desktop Menu */}
                <div className="hidden! md:flex! flex-1! justify-center! gap-8!">
                    {navLinks.map((link, idx) => (
                        <motion.a
                            key={link.label}
                            href={`#${link.target}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigate(link.target);
                            }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (idx + 1), duration: 0.5, ease: 'easeOut' }}
                            className="font-display font-semibold text-xs! md:text-sm! uppercase! tracking-widest! text-canvas! hover:text-orange! transition-colors! cursor-pointer! whitespace-nowrap!"
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                {/* Right: CTA Buttons */}
                <div className="hidden! md:flex! flex-1! justify-end! items-center! gap-4!">
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                        className="bg-transparent! text-canvas! border! border-canvas/20! hover:bg-canvas! hover:text-ink! font-display font-bold! uppercase! tracking-wider! px-5! py-2.5! rounded-full! transition-all! duration-300! text-xs! md:text-sm!"
                    >
                        Enter the HQ
                    </motion.a>
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                        className="bg-blue! text-white! hover:bg-white! hover:text-blue! font-display font-bold! uppercase! tracking-wider! px-5! py-2.5! rounded-full! transition-all! duration-300! text-xs! md:text-sm! flex! items-center! gap-2!"
                    >
                        Charge Your Brain
                        <Zap size={14} className="fill-current" />
                    </motion.a>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden! text-white! hover:text-orange! transition-colors! p-2! z-50!"
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
                        className="md:hidden! bg-ink! border-b! border-border-solid overflow-hidden!"
                    >
                        <div className="flex! flex-col! items-center! py-8! px-6! gap-6!">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={`#${link.target}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigate(link.target);
                                    }}
                                    className="font-display font-semibold! text-lg! uppercase! tracking-widest! text-canvas! hover:text-orange! transition-colors! w-full! text-center! py-2! cursor-pointer!"
                                >
                                    {link.label}
                                </a>
                            ))}

                            <div className="flex! flex-col! w-full! gap-3! mt-4!">
                                <a
                                    href="#"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-transparent! text-canvas! border! border-canvas/20! font-display font-bold! uppercase! tracking-wider! px-8! py-4! rounded-full! hover:bg-canvas! hover:text-ink! transition-all! duration-300! w-full! text-center!"
                                >
                                    Enter the HQ
                                </a>
                                <a
                                    href="#"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-blue! text-white! font-display font-bold! uppercase! tracking-wider! px-8! py-4! rounded-full! hover:bg-white! hover:text-blue! transition-all! duration-300! w-full! text-center! flex! items-center! justify-center! gap-2!"
                                >
                                    Charge Your Brain
                                    <Zap size={16} className="fill-current" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
