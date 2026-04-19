import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    { label: 'About', target: 'about' },
    { label: 'Topics', target: 'topics' },
    { label: 'Resources', target: 'resources' },
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
            className="sticky top-0 z-50 bg-black backdrop-blur-md border-b border-border-solid w-full"
        >
            <MaxWidthWrapper className="flex justify-between items-center py-5 px-1! md:px-8">
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-end gap-5 md:gap-8">
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
                            className="font-display font-semibold text-xs md:text-sm uppercase tracking-widest text-white hover:text-orange transition-colors cursor-pointer"
                        >
                            {link.label}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                        className="bg-orange text-white hover:bg-black hover:text-orange font-display font-bold uppercase tracking-wider px-5 md:px-6! py-3! rounded-full hover:bg-ink transition-[background-color]"
                    >
                        Join Now
                    </motion.a>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden text-white hover:text-orange transition-colors p-2 z-50"
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
                        className="md:hidden bg-black border-b border-border-solid overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-6 px-6 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={`#${link.target}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigate(link.target);
                                    }}
                                    className="font-display font-semibold text-lg uppercase tracking-widest text-white hover:text-orange transition-colors w-full text-center py-2 cursor-pointer"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#"
                                onClick={() => setIsOpen(false)}
                                className="bg-orange text-white font-display font-bold uppercase tracking-wider px-8 py-3 rounded-full hover:bg-ink transition-[background-color] w-full text-center mt-2"
                            >
                                Join Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}