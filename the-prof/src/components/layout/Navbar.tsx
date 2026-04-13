import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

function LogoMark({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle cx="40" cy="40" r="40" fill="#000" />
            <ellipse cx="30" cy="30" rx="16" ry="20" fill="#fff" />
            <ellipse cx="30" cy="30" rx="8" ry="10" fill="#000" />
            <rect x="44" y="26" width="7" height="20" rx="3.5" fill="#fff" />
            <ellipse cx="47.5" cy="26" rx="3.5" ry="3.5" fill="#fff" />
            <ellipse cx="47.5" cy="24" rx="2" ry="2" fill="#000" />
        </svg>
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
            className="sticky top-0 z-50 bg-canvas border-b border-border-solid w-full"
        >
            <MaxWidthWrapper className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <LogoMark className="w-10 h-10" />
                    <div className="flex flex-col">
                        <span className="font-display text-sm leading-none uppercase text-ink">The</span>
                        <span className="font-display font-bold text-xl leading-none uppercase text-ink">Prof</span>
                        <span className="font-display text-[10px] text-muted tracking-wide mt-0.5 uppercase">Charge your brain</span>
                    </div>
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
