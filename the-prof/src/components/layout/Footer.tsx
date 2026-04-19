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
    // {
    //     title: 'Brand',
    //     links: [
    //         { label: 'About', href: '#' },
    //         { label: 'Manifesto', href: '#' },
    //         { label: 'Press', href: '#' },
    //     ],
    // },
    // {
    //     title: 'Learn',
    //     links: [
    //         { label: 'Topics', href: '#' },
    //         { label: 'Community', href: '#' },
    //         { label: 'Newsletter', href: '#' },
    //     ],
    // },
    {
        title: 'Connect',
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
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white pt-24! pb-12 w-full"
        >
            <MaxWidthWrapper>
                <div className="flex flex-col md:flex-row justify-between items-start mb-24! gap-16! md:gap-0">
                    <img
                        src="/assets/logos/The Prof Logo-11.jpg"
                        alt="Prof Logo"
                        className="w-[120px] h-auto md:w-[400px] rounded-lg shadow-sm"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12! md:gap-24 lg:gap-32 w-full md:w-auto">
                        {footerCols.map((col) => (
                            <div key={col.title} className="flex flex-col gap-6">
                                <p className="font-display font-semibold uppercase tracking-widest text-canvas/40 text-xs md:text-sm">
                                    {col.title}
                                </p>
                                <ul className="flex gap-4">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="font-display font-medium uppercase tracking-wider text-canvas/60 hover:text-orange transition-colors duration-200 ease-brand md:text-lg flex items-center gap-3"
                                            >
                                                {'icon' in link && <SocialIcon type={(link as any).icon} />}
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-10! pb-8! flex flex-col md:flex-row justify-between items-start md:items-center gap-6!">
                    <p className="font-body text-canvas/28 text-sm md:text-xl tracking-wide">
                        © {new Date().getFullYear()} The Prof. All rights reserved.
                    </p>
                </div>
            </MaxWidthWrapper>
        </motion.footer>
    );
}