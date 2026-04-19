import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

function Logo() {
    return (
        <img
            src="/assets/logos/The-Prof-Logo-01.jpg"
            alt="Prof Logo"
            className="w-[80px] h-auto md:w-[120px] rounded-lg shadow-sm"
        />
    );
}

const navLinks = [
    { label: 'About' },
    { label: 'Topics' },
    { label: 'Community' },
] as const;

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border-solid w-full"
        >
            <MaxWidthWrapper className="flex justify-between items-center py-5 px-6 md:px-8">
                <div className="flex items-center gap-3">
                    <Logo />
                </div>

                <div className="flex items-center justify-end gap-5 md:gap-8 flex-wrap">
                    {navLinks.map((link, idx) => (
                        <motion.a
                            key={link.label}
                            href="#"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (idx + 1), duration: 0.5, ease: 'easeOut' }}
                            className="font-display font-semibold text-xs md:text-sm uppercase tracking-widest text-ink hover:text-orange transition-colors hidden sm:block"
                        >
                            {link.label}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                        className="bg-orange text-white font-display font-bold uppercase tracking-wider px-5 md:px-6 py-2.5 rounded-full hover:bg-ink transition-[background-color]"
                    >
                        Join Now
                    </motion.a>
                </div>
            </MaxWidthWrapper>
        </motion.nav>
    );
}
