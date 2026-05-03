import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface FooterLink {
    label: string;
    href: string;
    icon?: string;
}

interface FooterCol {
    title: string;
    links: FooterLink[];
}

const footerCols: FooterCol[] = [
    {
        title: 'Connect with us',
        links: [
            { label: 'Tiktok', href: 'https://www.tiktok.com/@theprofhq?_r=1&_t=ZS-95PpxjIRKmz', icon: 'tiktok' },
            { label: 'X', href: 'https://x.com/theprofhq', icon: 'x' },
            { label: 'Instagram', href: 'https://www.instagram.com/theprofhq/', icon: 'instagram' },
            { label: 'Facebook', href: 'https://www.facebook.com/theprofhq', icon: 'facebook' },
        ],
    },
];

const SocialIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'tiktok':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
            );
        case 'x':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            );
        case 'instagram':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            );
        case 'facebook':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            );
        default:
            return null;
    }
};

export default function Footer() {
    const containerAnim = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-ink! pt-20! md:pt-24! pb-12! w-full! relative! overflow-hidden!"
        >
            {/* Ambient Background Blur for Visual Interest */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute! top-0! right-0! w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-orange/5 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute! bottom-0! left-0! w-[400px] h-[400px] bg-blue/5 rounded-full blur-[80px] pointer-events-none"
            />

            <MaxWidthWrapper className="relative! z-10!">
                <div className="flex! flex-col! md:flex-row! justify-between! items-center! md:items-start! mb-20! gap-16! md:gap-0!">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img
                            src="/assets/logos/The Prof Logo-05.jpg"
                            alt="Prof Logo"
                            className="w-[200px] md:w-[400px] h-auto rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                        />
                    </motion.div>

                    <div className="w-full! md:w-auto! flex! justify-center! md:justify-end!">
                        {footerCols.map((col) => (
                            <motion.div
                                key={col.title}
                                className="flex! flex-col! items-start! gap-6!"
                                variants={containerAnim}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                <motion.p variants={itemAnim} className="font-display font-bold! uppercase! tracking-[0.2em]! text-canvas! text-base! md:text-xl!">
                                    {col.title}
                                </motion.p>
                                <ul className="flex! flex-wrap! justify-center! md:justify-end! gap-3! md:gap-4! w-full!">
                                    {col.links.map((link) => (
                                        <motion.li key={link.label} variants={itemAnim}>
                                            <a
                                                href={link.href}
                                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="group! relative! flex! items-center! gap-3! font-display font-semibold! uppercase! tracking-wider! text-ink! hover:text-white! transition-colors! duration-200! ease-brand text-sm md:text-base border border-ink/10 bg-canvas hover:border-orange px-4! py-2! rounded-full hover:bg-orange shadow-sm hover:shadow-md overflow-hidden!"
                                            >
                                                <div className="absolute! inset-0! bg-transparent group-hover:bg-orange transition-colors duration-200 z-0" />
                                                <span className="relative! z-10! transition-transform! duration-200! group-hover:scale-110!">
                                                    {'icon' in link && <SocialIcon type={link.icon} />}
                                                </span>
                                                <span className="relative! z-10! transition-[letter-spacing]! duration-200! group-hover:tracking-widest!">
                                                    {link.label}
                                                </span>
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-10! border-t! border-canvas/10 flex! justify-center! items-center! gap-4!"
                >
                    <p className="font-body text-canvas/60 text-sm! md:text-base! tracking-wide!">
                        © {new Date().getFullYear()} The Prof. All rights reserved.
                    </p>
                </motion.div>
            </MaxWidthWrapper>
        </motion.footer>
    );
}