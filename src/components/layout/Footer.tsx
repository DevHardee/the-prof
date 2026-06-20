import { motion, type Variants } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';

// --- Manual SVG Icons matching The Prof aesthetic ---
const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>;
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const TiktokIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>;

const MailIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const PhoneIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const WhatsappIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>;
const ChevronUpIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>;

const quickLinksLeft = [
    { label: 'Home', href: '/' },
    { label: 'The Truth', href: '#about' },
    { label: 'The Prof', href: '#pillars' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'TechPath', href: '/techpath' },
];

const quickLinksRight = [
    { label: 'View Our Events', href: '/events' },
    { label: 'Join The Community', href: 'https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC', target: '_blank', rel: 'noopener noreferrer' },
    // { label: 'Store', href: '#' },
    // { label: 'Terms', href: '#' },
    // { label: 'Privacy', href: '#' },
];

const socialLinks = [
    { icon: FacebookIcon, href: 'https://www.facebook.com/theprofhq' },
    { icon: XIcon, href: 'https://x.com/theprofhq' },
    { icon: TiktokIcon, href: 'https://www.tiktok.com/@theprofhq' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/theprofhq/' },
];

const contactInfo = [
    { icon: MailIcon, text: 'hello@theprofhq.com', href: 'mailto:hello@theprofhq.com' },
    { icon: PhoneIcon, text: '+234 808 030 9239', href: 'tel:+2348080309239' },
    { icon: WhatsappIcon, text: '+234 811 789 9169', href: 'https://wa.me/2348117899169' },
];

export default function Footer() {
    const scrollToTop = () => {
        // More robust scroll to top
        const body = document.body;
        const html = document.documentElement;
        body.scrollTop = 0;
        html.scrollTop = 0;
    };

    const containerAnim: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemAnim: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <footer className="bg-ink! pt-24! pb-12! w-full! relative! overflow-hidden! border-t! border-white/5!">
            {/* Subtle Brand Blurs */}
            <div className="absolute! top-0! right-0! w-[400px] h-[400px] bg-blue/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute! bottom-0! left-0! w-[400px] h-[400px] bg-blue/3 rounded-full blur-[100px] pointer-events-none" />

            <MaxWidthWrapper className="relative! z-10!">
                <motion.div
                    variants={containerAnim}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid! grid-cols-1! lg:grid-cols-3! gap-16! lg:gap-12! mb-20! items-start!"
                >
                    {/* Column 1: Logo & Tagline */}
                    <motion.div variants={itemAnim} className="flex! flex-col! items-start! gap-8!">
                        <div className="p-6! rounded-2xl! inline-block! shadow-[0_0_40px_rgba(59,130,246,0.1)]!">
                            <img
                                src="/assets/logos/The Prof Logo-05.jpg"
                                alt="Prof Logo"
                                className="h-20! w-auto! mix-blend-multiply!"
                            />
                        </div>
                        <div className="flex! gap-4!">
                            {socialLinks.map((Social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={Social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10! h-10! flex! items-center! justify-center! bg-white/5! border! border-white/10! rounded-xl! text-blue-mid! hover:bg-blue! hover:text-white! hover:border-blue! transition-all! duration-300!"
                                >
                                    <Social.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={itemAnim} className="flex! flex-col! gap-10!">
                        <h3 className="font-display font-black! text-white! text-2xl! uppercase! tracking-tighter! border-l-4! border-blue! pl-4!">
                            Quick <span className="text-blue!">Links</span>
                        </h3>
                        <div className="grid! grid-cols-2! gap-8!">
                            <ul className="flex! flex-col! gap-5!">
                                {quickLinksLeft.map((link) => (
                                    <li key={link.label} className='list-disc text-blue'>
                                        <a
                                            {...link}
                                            className="font-body text-canvas! hover:text-blue! transition-all! duration-300! text-lg! flex! items-center! gap-2! group!"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex! flex-col! gap-5!">
                                {quickLinksRight.map((link) => (
                                    <li key={link.label} className='list-disc text-blue'>
                                        <a
                                            {...link}
                                            className="font-body text-canvas hover:text-blue! transition-all! duration-300! text-lg! flex! items-center! gap-2! group!"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Column 3: Contact Info */}
                    <motion.div variants={itemAnim} className="flex! flex-col! gap-10!">
                        <h3 className="font-display font-black! text-white! text-2xl! uppercase! tracking-tighter! border-l-4! border-orange! pl-4!">
                            Contact <span className="text-orange!">Info</span>
                        </h3>
                        <div className="flex! flex-col! gap-8!">
                            {contactInfo.map((contact, idx) => (
                                contact.href ? (
                                    <a
                                        key={idx}
                                        href={contact.href}
                                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="flex! items-start! gap-4! group! hover:translate-x-2! transition-transform! duration-300!"
                                    >
                                        <div className="mt-1! transition-transform! duration-300! group-hover:scale-110!">
                                            <contact.icon />
                                        </div>
                                        <p className="font-display font-bold! text-canvas border-b! border-transparent! group-hover:border-blue/30! group-hover:text-blue! transition-all! pb-1! w-fit! text-base!">
                                            {contact.text}
                                        </p>
                                    </a>
                                ) : (
                                    <div key={idx} className="flex! items-start! gap-4! group!">
                                        <div className="mt-1! transition-transform! duration-300! group-hover:scale-110!">
                                            <contact.icon />
                                        </div>
                                        <p className="font-display font-bold! text-canvas border-b! border-transparent! group-hover:text-blue/30! group-hover:text-blue! transition-all! pb-1! w-fit! text-base!">
                                            {contact.text}
                                        </p>
                                    </div>
                                )
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Footer Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-12! border-t! border-white/5 flex! flex-col! md:flex-row! justify-between! items-center! gap-8!">
                    <p className="font-body text-canvas! text-[10px]! md:text-xs! uppercase! tracking-[0.4em]!">
                        &copy; {new Date().getFullYear()} The Prof HQ. All rights reserved.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -5, backgroundColor: '#ffffff', color: '#000000' }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14! h-14! bg-blue! text-white! cursor-pointer rounded-full! flex! items-center! justify-center! shadow-[0_0_40px_rgba(59,130,246,0.3)]! transition-all! group!"
                    >
                        <ChevronUpIcon />
                    </motion.button>
                </motion.div>
            </MaxWidthWrapper>
        </footer>
    );
}