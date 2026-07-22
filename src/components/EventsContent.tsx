import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, ArrowRight, Code2, Cpu, Palette, BriefcaseBusiness, Fingerprint,
    type LucideIcon,
    User,
    Phone,
    Mail,
    CheckCircle2,
    X,
    MapPin,
    Clock,
    Users,
    Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';

import MaxWidthWrapper from './MaxWidthWrapper';

/* ============================================================================
   EVENT DATA
   Add, edit, or remove events here. Nothing below this block needs to change.

   - status: 'open'          → full featured card with live registration,
                                a Supabase-backed seat count, a progress bar,
                                and a comments/feedback section that flips
                                from "comments" to "feedback" once eventDateTime
                                has passed.
   - status: 'coming-soon'   → compact "notify me" card, no registration.
   ============================================================================ */

type OpenEvent = {
    id: string;                 // must be unique — also used as the event_id in Supabase
    status: 'open';
    eyebrow: string;            // small tag above the title, e.g. "Upcoming Seminar"
    title: string;
    titleAccent: string;        // second line of the title, shown in blue
    description: string;
    location: string;
    date: string;                // display string shown to users, e.g. "Saturday, July 15th"
    eventDateTime: string;       // ISO datetime used to detect when the event has ended,
    // e.g. '2026-07-15T23:59:59'. Comments switch to
    // feedback once "now" is past this value.
    participantsLabel: string;  // e.g. "limited to 100 participants"
    capacity: number;           // real number of seats on offer
    displayBaseline: number;    // progress bar starting point, for social proof (doesn't reduce capacity)
    progressTagline?: string;   // small label over the progress bar, defaults below
    image: string;
    communityLink?: string;
    contactLabel?: string;
    contactLink?: string;
};

type ComingSoonEvent = {
    id: string;
    status: 'coming-soon';
    eyebrow: string;
    title: string;
    description: string;
    icon?: LucideIcon;           // defaults to Code2 if omitted
    notifyLabel?: string;        // defaults to "Get Notified"
    notifyLink: string;
};

type EventItem = OpenEvent | ComingSoonEvent;

const events: EventItem[] = [
    {
        id: 'pm-seminar-july-2026',
        status: 'coming-soon',
        eyebrow: 'Coming Soon',
        title: 'Product Management',
        description:
            "Master the art of building what people actually use. We're breaking down the exact frameworks used by top-tier PMs to scope, build, and ship products that scale.",
        icon: BriefcaseBusiness,
        notifyLabel: 'Get Notified',
        notifyLink: 'https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC',
    },
    {
        id: 'web-dev-session',
        status: 'coming-soon',
        eyebrow: 'Coming Soon',
        title: 'Web Development',
        description:
            'From markup to deployed product — a hands-on session for anyone ready to build for the web. Dates and registration open soon.',
        icon: Code2,
        notifyLabel: 'Get Notified',
        notifyLink: 'https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC',
    },
    {
        id: 'ai-engineering-session',
        status: 'coming-soon',
        eyebrow: 'Coming Soon',
        title: 'AI Engineering',
        description:
            'From prompts to production — learn how to build, deploy, and scale AI-powered systems. A deep dive into the tools and thinking behind modern AI engineering.',
        icon: Cpu,
        notifyLabel: 'Get Notified',
        notifyLink: 'https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC',
    },
    {
        id: 'graphics-design',
        status: 'coming-soon',
        eyebrow: 'Coming Soon',
        title: 'Graphic Design',
        description:
            'Master the tools and principles behind compelling visuals. From typography to layout, learn how to communicate ideas through design that actually works.',
        icon: Palette,
        notifyLabel: 'Get Notified',
        notifyLink: 'https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC',
    },
    {
        id: 'brand-identity',
        status: 'coming-soon',
        eyebrow: 'Coming Soon',
        title: 'Brand Identity',
        description:
            'Learn how to build brand systems that last. From logo logic to brand voice and guidelines, this session covers what it takes to make a brand unforgettable.',
        icon: Fingerprint,
        notifyLabel: 'Get Notified',
        notifyLink: 'https://chat.whatsapp.com/FC0z0jih9b032oLHQmmDAC',
    },
];

function getAvailabilityLabel(percentage: number, isFull: boolean) {
    if (isFull) return 'Fully Booked';
    if (percentage >= 85) return 'Almost Full';
    if (percentage >= 60) return 'Filling Fast';
    return 'Open For Registration';
}

export default function EventsContent() {
    const openEvents = events.filter((e): e is OpenEvent => e.status === 'open');
    const comingSoonEvents = events.filter((e): e is ComingSoonEvent => e.status === 'coming-soon');

    const [registrationCounts, setRegistrationCounts] = useState<Record<string, number>>(
        () => Object.fromEntries(openEvents.map((e) => [e.id, e.displayBaseline]))
    );
    const [activeEvent, setActiveEvent] = useState<OpenEvent | null>(null);
    const [regData, setRegData] = useState({ name: '', email: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [regError, setRegError] = useState<string | null>(null);

    useEffect(() => {
        fetchAllCounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAllCounts = async () => {
        const results = await Promise.all(
            openEvents.map(async (event) => {
                try {
                    const { count, error } = await supabase
                        .from('event_registrations')
                        .select('*', { count: 'exact', head: true })
                        .eq('event_id', event.id);
                    if (error) throw error;
                    return [event.id, Math.min(event.capacity, event.displayBaseline + (count ?? 0))] as const;
                } catch (err) {
                    console.error(`Error fetching count for ${event.id}:`, err);
                    return [event.id, event.displayBaseline] as const;
                }
            })
        );
        setRegistrationCounts(Object.fromEntries(results));
    };

    const refreshCount = async (event: OpenEvent) => {
        try {
            const { count, error } = await supabase
                .from('event_registrations')
                .select('*', { count: 'exact', head: true })
                .eq('event_id', event.id);
            if (error) throw error;
            setRegistrationCounts((prev) => ({
                ...prev,
                [event.id]: Math.min(event.capacity, event.displayBaseline + (count ?? 0)),
            }));
        } catch (err) {
            console.error('Error fetching count:', err);
        }
    };

    const handleRegSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeEvent) return;
        setIsSubmitting(true);
        setRegError(null);

        try {
            const { error } = await supabase
                .from('event_registrations')
                .insert([
                    {
                        event_id: activeEvent.id,
                        name: regData.name.trim(),
                        email: regData.email.trim().toLowerCase(),
                        phone: regData.phone.trim(),
                    },
                ]);

            if (error) throw error;

            setIsSuccess(true);
            refreshCount(activeEvent);
            setTimeout(() => {
                setActiveEvent(null);
                setIsSuccess(false);
                setRegData({ name: '', email: '', phone: '' });
            }, 3000);
        } catch (err: any) {
            console.error('Error registering:', err);
            // Postgres unique_violation
            if (err?.code === '23505') {
                setRegError('This email is already registered for this event.');
            } else {
                setRegError('Something went wrong. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero section */}
            <section className="relative pt-16 md:pt-24 lg:pt-32 pb-20! overflow-hidden bg-ink!">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue/20 rounded-full blur-[120px] pointer-events-none" />

                <MaxWidthWrapper className="relative z-10 text-center!">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4! py-1.5! mb-6!"
                    >
                        <Calendar className="w-4 h-4 text-blue" />
                        <span className="font-display font-bold uppercase tracking-widest text-blue text-xs">
                            The HQ Events
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display font-black uppercase text-2xl md:text-4xl lg:text-5xl text-canvas leading-tight mb-8!"
                    >
                        Connect. Learn. <br /> <span className="text-blue">Evolve.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-body text-canvas/90 text-sm md:text-lg max-w-6xl mx-auto leading-relaxed"
                    >
                        The HQ isn't just a platform; it's a movement. Join our upcoming sessions to bridge the gap between theory and high-impact execution.
                    </motion.p>
                </MaxWidthWrapper>
            </section>

            {/* Open / featured events */}
            {openEvents.map((event) => (
                <FeaturedEventSection
                    key={event.id}
                    event={event}
                    registrationCount={registrationCounts[event.id] ?? event.displayBaseline}
                    onRegister={() => setActiveEvent(event)}
                />
            ))}

            {/* Coming soon events */}
            {comingSoonEvents.length > 0 && (
                <section className="pt-10! md:pt-16 pb-20! md:pb-28! relative">
                    <MaxWidthWrapper>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10!"
                        >
                            <p className="font-display font-bold uppercase tracking-[0.15em] text-blue text-xs mb-3!">
                                On The Horizon
                            </p>
                            <h2 className="font-display text-center font-black uppercase text-lg md:text-2xl lg:text-4xl text-ink">
                                The Prof ASAP (African Skill Acquisition Programme)
                            </h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6!">
                            {comingSoonEvents.map((event, i) => (
                                <ComingSoonCard
                                    key={event.id}
                                    event={event}
                                    index={i}
                                    spanFull={comingSoonEvents.length % 2 !== 0 && i === comingSoonEvents.length - 1}
                                />
                            ))}
                        </div>
                    </MaxWidthWrapper>
                </section>
            )}

            {/* Registration Modal — shared by all open events */}
            <AnimatePresence>
                {activeEvent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4!">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSubmitting && setActiveEvent(null)}
                            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-canvas rounded-3xl p-8! md:p-12! shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveEvent(null)}
                                className="absolute top-6! right-6! p-2! hover:bg-ink/5 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {isSuccess ? (
                                <div className="text-center py-8!">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6!">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="font-display font-black uppercase text-3xl text-ink mb-4!">Seat Secured!</h3>
                                    <p className="font-body text-ink/60 text-lg">
                                        You will be notified when the event is about to start. See you there!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8!">
                                        <h3 className="font-display font-black uppercase text-3xl text-ink mb-2!">Secure Your Seat</h3>
                                        <p className="font-body text-ink/60">
                                            Join the {activeEvent.title} {activeEvent.titleAccent}. The event time will be sent to you directly — we just need your details.
                                        </p>
                                    </div>

                                    <form onSubmit={handleRegSubmit} className="space-y-4!">
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-blue transition-colors" size={20} />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Full Name"
                                                value={regData.name}
                                                onChange={(e) => setRegData((prev) => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-ink/5 border border-ink/10 rounded-xl py-4! pl-12! pr-4! text-ink focus:outline-none focus:border-blue/50 transition-all"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-blue transition-colors" size={20} />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                value={regData.email}
                                                onChange={(e) => setRegData((prev) => ({ ...prev, email: e.target.value }))}
                                                className="w-full bg-ink/5 border border-ink/10 rounded-xl py-4! pl-12! pr-4! text-ink focus:outline-none focus:border-blue/50 transition-all"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-blue transition-colors" size={20} />
                                            <input
                                                required
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={regData.phone}
                                                onChange={(e) => setRegData((prev) => ({ ...prev, phone: e.target.value }))}
                                                className="w-full bg-ink/5 border border-ink/10 rounded-xl py-4! pl-12! pr-4! text-ink focus:outline-none focus:border-blue/50 transition-all"
                                            />
                                        </div>

                                        {regError && (
                                            <p className="text-red-400 text-sm font-body">{regError}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue hover:bg-blue-mid text-white font-display font-black uppercase tracking-widest py-5! rounded-xl transition-all duration-300 flex items-center justify-center gap-2! shadow-lg shadow-blue/20 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Confirm Registration'}
                                            {!isSubmitting && <ArrowRight size={20} />}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ---------- Sub-components (generic — read from event objects only) ---------- */

function FeaturedEventSection({
    event,
    registrationCount,
    onRegister,
}: {
    event: OpenEvent;
    registrationCount: number;
    onRegister: () => void;
}) {
    const isPast = new Date() > new Date(event.eventDateTime);
    const filledPercentage = Math.round((registrationCount / event.capacity) * 100);
    const isFull = registrationCount >= event.capacity;
    const availabilityLabel = getAvailabilityLabel(filledPercentage, isFull);

    return (
        <section className="pt-10! md:pt-16 lg:pt-24 pb-10! relative">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16! items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-3! py-1! bg-orange/10 border border-orange/20 rounded-md mb-6!">
                            <span className="font-display font-bold uppercase text-[10px] tracking-[0.2em] text-orange">
                                {isPast ? 'Past Event' : event.eyebrow}
                            </span>
                        </div>
                        <h2 className="font-display font-black uppercase text-4xl md:text-5xl text-ink leading-none mb-6!">
                            {event.title} <br /> <span className="text-blue">{event.titleAccent}</span>
                        </h2>
                        <p className="font-body text-ink/70 text-lg leading-relaxed mb-8! max-w-lg">
                            {event.description}
                        </p>

                        <div className="space-y-4! mb-10!">
                            <div className="flex items-center gap-4 text-ink/80">
                                <div className="w-10 h-10 rounded-full bg-blue/10 flex-shrink-0 flex items-center justify-center text-blue">
                                    <MapPin size={18} />
                                </div>
                                <span className="font-display font-semibold">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-ink/80">
                                <div className="w-10 h-10 rounded-full bg-blue/10 flex-shrink-0 flex items-center justify-center text-blue">
                                    <Clock size={18} />
                                </div>
                                <span className="font-display font-semibold">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-4 text-ink/80">
                                <div className="w-10 h-10 rounded-full bg-blue/10 flex-shrink-0 flex items-center justify-center text-blue">
                                    <Users size={18} />
                                </div>
                                <span className="font-display font-semibold">{event.participantsLabel}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4! mb-8!">
                            {isPast ? (
                                <div className="inline-flex items-center gap-3! bg-ink/10 border border-ink/20 rounded-full px-6! py-4! text-ink/50 font-display font-black uppercase tracking-wider text-sm">
                                    <span className="w-2 h-2 rounded-full bg-ink/30" />
                                    Event Has Ended
                                </div>
                            ) : isFull ? (
                                <div className="inline-flex items-center gap-3! bg-red-500/10 border border-red-500/20 rounded-full px-6! py-4! text-red-400 font-display font-black uppercase tracking-wider text-sm">
                                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                    Event Fully Booked
                                </div>
                            ) : (
                                <button
                                    onClick={onRegister}
                                    className="group bg-ink text-canvas hover:bg-blue transition-all duration-500 px-8! py-4! rounded-full font-display font-black uppercase tracking-wider flex items-center gap-3!"
                                >
                                    Secure My Seat
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </button>
                            )}
                            {event.communityLink && (
                                <a
                                    href={event.communityLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group border-2 border-ink text-ink hover:bg-ink hover:text-white transition-all duration-500 px-8! py-4! rounded-full font-display font-black uppercase tracking-wider flex items-center gap-3!"
                                >
                                    Join The Community
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </a>
                            )}
                        </div>

                        {!isPast && (
                            <div className="space-y-2 mb-6!">
                                <p className="font-body text-ink/80 text-sm md:text-base flex items-start gap-2!">
                                    <span className="w-2 h-2 rounded-full bg-blue flex-shrink-0 mt-1.5!" />
                                    The exact time of the event will be communicated to all registered attendees — that's why we collect your contact details.
                                </p>
                            </div>
                        )}

                        {event.contactLink && (
                            <div className="space-y-2!">
                                <p className="font-body text-ink/70 text-sm md:text-base flex items-center gap-2!">
                                    <span className="w-2 h-2 rounded-full bg-blue" />
                                    Have questions or want to know more about the event?
                                </p>
                                <p className="font-body text-ink/70 text-sm md:text-base">
                                    For partnerships or inquiries, reach out via WhatsApp: <a href={event.contactLink} target="_blank" className="text-blue font-bold hover:underline">{event.contactLabel}</a>
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-ink rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-blue/20 mix-blend-overlay" />
                            <img
                                src={event.image}
                                alt={`${event.title} ${event.titleAccent}`}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-8! left-8! right-8!">
                                <div className="flex items-center gap-3! mb-4!">
                                    <Zap className="text-blue fill-current" size={24} />
                                    <span className="font-display font-bold uppercase tracking-widest text-canvas text-sm">
                                        {event.progressTagline ?? 'Charge Your Career'}
                                    </span>
                                </div>
                                {!isPast && (
                                    <>
                                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${filledPercentage}%` }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-blue"
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2!">
                                            <span className="text-xs md:text-sm font-display font-bold text-canvas/40 uppercase">Registration Progress</span>
                                            <span className="text-xs md:text-sm font-display font-bold text-blue uppercase">
                                                {availabilityLabel}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <EventCommentForm event={event} />
            </MaxWidthWrapper>
        </section>
    );
}

function EventCommentForm({ event }: { event: OpenEvent }) {
    const isPast = new Date() > new Date(event.eventDateTime);
    const kind: 'comment' | 'feedback' = isPast ? 'feedback' : 'comment';

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('event_comments').insert([{
                event_id: event.id,
                name: name.trim(),
                message: message.trim(),
                kind,
            }]);
            if (error) throw error;
            setName('');
            setMessage('');
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 4000);
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-16! pt-12! border-t border-ink/10">
            <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-ink mb-2!">
                {isPast ? 'Share Your Feedback' : 'Comments & Thoughts'}
            </h3>
            <p className="font-body text-ink/60 mb-8! max-w-2xl">
                {isPast
                    ? 'This event has wrapped up — tell us how it went.'
                    : 'Got a question or something on your mind before the event? Drop it below.'}
            </p>

            <form onSubmit={handleSubmit} className="bg-ink/5 border border-ink/10 rounded-2xl p-6! md:p-8! space-y-4! max-w-2xl">
                <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-canvas border border-ink/10 rounded-xl py-3! px-4! text-ink focus:outline-none focus:border-blue/50 transition-all"
                />
                <textarea
                    required
                    rows={3}
                    placeholder={isPast ? 'Share your feedback about the event...' : 'Share your thoughts or questions...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-canvas border border-ink/10 rounded-xl py-3! px-4! text-ink focus:outline-none focus:border-blue/50 transition-all resize-none"
                />
                {submitError && <p className="text-red-400 text-sm font-body">{submitError}</p>}
                {isSuccess && <p className="text-green-500 text-sm font-body">Submitted successfully!</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-ink text-canvas hover:bg-blue transition-all duration-300 px-6! py-3! rounded-full font-display font-black uppercase tracking-wider text-sm disabled:opacity-50"
                >
                    {isSubmitting ? 'Submitting...' : isPast ? 'Submit Feedback' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
}

function ComingSoonCard({ event, index, spanFull }: { event: ComingSoonEvent; index: number; spanFull?: boolean }) {
    const Icon = event.icon ?? Code2;
    const accents = [
        { bg: 'bg-blue/10', border: 'border-blue/20', text: 'text-blue', glow: 'bg-blue/10' },
        { bg: 'bg-orange/10', border: 'border-orange/20', text: 'text-orange', glow: 'bg-orange/10' },
        { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', glow: 'bg-purple-500/10' },
        { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', glow: 'bg-green-500/10' },
        { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', glow: 'bg-pink-500/10' },
    ];
    const accent = accents[index % accents.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl bg-ink border border-white/8 flex flex-col p-8! group hover:border-white/20 transition-colors duration-500${
                spanFull ? ' md:col-span-2' : ''
            }`}
        >
            {/* Glow blob */}
            <div className={`absolute -top-16 -right-16 w-48 h-48 ${accent.glow} rounded-full blur-[80px] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl ${accent.bg} border ${accent.border} flex items-center justify-center ${accent.text} mb-6! flex-shrink-0`}>
                <Icon size={26} />
            </div>

            {/* Tag */}
            <div className={`inline-flex items-center gap-1.5 px-2.5! py-1! ${accent.bg} border ${accent.border} rounded-md mb-4! w-fit`}>
                <span className={`w-1.5 h-1.5 rounded-full ${accent.text} bg-current`} />
                <span className={`font-display font-bold uppercase text-[10px] tracking-[0.2em] ${accent.text}`}>
                    {event.eyebrow}
                </span>
            </div>

            <h3 className="font-display font-black uppercase text-xl md:text-2xl text-white leading-tight mb-3!">
                {event.title}
            </h3>
            <p className="font-body text-canvas/80 text-sm md:text-base leading-relaxed flex-1 mb-8!">
                {event.description}
            </p>

            <a
                href={event.notifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/btn self-start flex items-center gap-2! border ${accent.border} ${accent.text} hover:${accent.bg} transition-all duration-300 px-5! py-2.5! rounded-full font-display font-black uppercase tracking-wider text-xs`}
            >
                {event.notifyLabel ?? 'Get Notified'}
                <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={14} />
            </a>
        </motion.div>
    );
}