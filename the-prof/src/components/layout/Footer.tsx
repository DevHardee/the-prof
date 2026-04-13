import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterCol {
    title: string;
    links: FooterLink[];
}

const footerCols: FooterCol[] = [
    {
        title: 'Brand',
        links: [
            { label: 'About', href: '#' },
            { label: 'Manifesto', href: '#' },
            { label: 'Press', href: '#' },
        ],
    },
    {
        title: 'Learn',
        links: [
            { label: 'Topics', href: '#' },
            { label: 'Community', href: '#' },
            { label: 'Newsletter', href: '#' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'Instagram', href: '#' },
            { label: 'Twitter / X', href: '#' },
            { label: 'YouTube', href: '#' },
        ],
    },
];

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-ink pt-24 md:pt-32 pb-12 w-full"
        >
            <MaxWidthWrapper>
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-16 md:gap-0">
                    <div className="flex flex-col gap-1">
                        <span className="font-display text-2xl md:text-3xl leading-none uppercase text-canvas/60">The</span>
                        <span className="font-display font-black text-6xl md:text-7xl leading-none uppercase text-canvas/80">Prof</span>
                        <span className="font-display text-sm md:text-base text-canvas/40 tracking-[0.2em] mt-2">CHARGE YOUR BRAIN</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 lg:gap-32 w-full md:w-auto">
                        {footerCols.map((col) => (
                            <div key={col.title} className="flex flex-col gap-6">
                                <p className="font-display font-semibold uppercase tracking-widest text-canvas/40 text-xs md:text-sm">
                                    {col.title}
                                </p>
                                <ul className="flex flex-col gap-4">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="font-display font-medium uppercase tracking-wider text-canvas/60 hover:text-orange transition-colors duration-200 ease-brand md:text-lg"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-10 border-t border-canvas/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <p className="font-body text-canvas/28 text-sm md:text-base tracking-wide">
                        © {new Date().getFullYear()} The Prof. All rights reserved.
                    </p>
                    <p className="font-body text-canvas/28 text-sm md:text-base uppercase tracking-[0.2em]">
                        WWW.THEPROFHQ.COM
                    </p>
                </div>
            </MaxWidthWrapper>
        </motion.footer>
    );
}
