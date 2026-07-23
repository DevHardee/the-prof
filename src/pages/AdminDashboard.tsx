import { useState, useEffect } from 'react';
import { Users, MessageSquare, Zap, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

const PAGE_SIZE = 10;

type Lead = { id: string; name: string; email: string; field_of_study: string; created_at: string };
type Registration = { id: string; name: string; email: string; phone: string; event_id: string; created_at: string };
type Comment = { id: string; name: string; message: string; event_id: string; kind: 'comment' | 'feedback'; created_at: string };

type Tab = 'leads' | 'registrations' | 'comments';

function SkeletonRow({ cols }: { cols: number }) {
    return (
        <tr>
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-4! py-3!">
                    <div className="h-4 bg-white/10 rounded animate-pulse" />
                </td>
            ))}
        </tr>
    );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16! text-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <p className="font-body text-canvas/60 text-sm">{message}</p>
            <button
                onClick={onRetry}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-canvas font-display font-bold uppercase tracking-wider text-xs px-4! py-2! rounded-lg transition-colors"
            >
                <RefreshCw size={14} /> Retry
            </button>
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16! text-center gap-3">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white/20" />
            </div>
            <p className="font-body text-canvas/40 text-sm">No {label} yet.</p>
        </div>
    );
}

function Pagination({ page, total, onPrev, onNext }: { page: number; total: number; onPrev: () => void; onNext: () => void }) {
    const totalPages = Math.ceil(total / PAGE_SIZE);
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-between pt-4! border-t border-white/10 mt-4">
            <span className="font-body text-canvas/40 text-xs">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
                <button onClick={onPrev} disabled={page === 1} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">
                    <ChevronLeft size={16} className="text-canvas" />
                </button>
                <button onClick={onNext} disabled={page === totalPages} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">
                    <ChevronRight size={16} className="text-canvas" />
                </button>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, loading }: { label: string; value: number; icon: React.ElementType; loading: boolean }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5! flex items-center gap-4">
            <div className="w-10 h-10 bg-blue/10 border border-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue" />
            </div>
            <div>
                <p className="font-body text-canvas/50 text-xs uppercase tracking-wider">{label}</p>
                {loading ? (
                    <div className="h-6 w-12 bg-white/10 rounded animate-pulse mt-1" />
                ) : (
                    <p className="font-display font-black text-canvas text-2xl">{value}</p>
                )}
            </div>
        </div>
    );
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('leads');

    const [leads, setLeads] = useState<Lead[]>([]);
    const [leadsTotal, setLeadsTotal] = useState(0);
    const [leadsPage, setLeadsPage] = useState(1);
    const [leadsLoading, setLeadsLoading] = useState(true);
    const [leadsError, setLeadsError] = useState<string | null>(null);

    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [regsTotal, setRegsTotal] = useState(0);
    const [regsPage, setRegsPage] = useState(1);
    const [regsLoading, setRegsLoading] = useState(true);
    const [regsError, setRegsError] = useState<string | null>(null);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsTotal, setCommentsTotal] = useState(0);
    const [commentsPage, setCommentsPage] = useState(1);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState<string | null>(null);

    const fetchLeads = async (page = 1) => {
        setLeadsLoading(true);
        setLeadsError(null);
        try {
            const from = (page - 1) * PAGE_SIZE;
            const { data, count, error } = await supabase
                .from('leads')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, from + PAGE_SIZE - 1);
            if (error) throw error;
            setLeads(data ?? []);
            setLeadsTotal(count ?? 0);
        } catch (err: any) {
            console.error('Leads fetch error:', err);
            console.log("Leads error:", err)
            setLeadsError(err?.message ?? 'Failed to load leads.');
        } finally {
            setLeadsLoading(false);
        }
    };

    const fetchRegistrations = async (page = 1) => {
        setRegsLoading(true);
        setRegsError(null);
        try {
            const from = (page - 1) * PAGE_SIZE;
            const { data, count, error } = await supabase
                .from('event_registrations')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, from + PAGE_SIZE - 1);
            if (error) throw error;
            setRegistrations(data ?? []);
            setRegsTotal(count ?? 0);
        } catch (err: any) {
            console.error('Registrations fetch error:', err);
            setRegsError(err?.message ?? 'Failed to load registrations.');
        } finally {
            setRegsLoading(false);
        }
    };

    const fetchComments = async (page = 1) => {
        setCommentsLoading(true);
        setCommentsError(null);
        try {
            const from = (page - 1) * PAGE_SIZE;
            const { data, count, error } = await supabase
                .from('event_comments')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, from + PAGE_SIZE - 1);
            if (error) throw error;
            setComments(data ?? []);
            setCommentsTotal(count ?? 0);
        } catch (err: any) {
            console.error('Comments fetch error:', err);
            setCommentsError(err?.message ?? 'Failed to load comments.');
        } finally {
            setCommentsLoading(false);
        }
    };

    useEffect(() => { fetchLeads(leadsPage); }, [leadsPage]);
    useEffect(() => { fetchRegistrations(regsPage); }, [regsPage]);
    useEffect(() => { fetchComments(commentsPage); }, [commentsPage]);

    const tabs: { id: Tab; label: string; icon: React.ElementType; count: number }[] = [
        { id: 'leads', label: 'TechPath Leads', icon: Zap, count: leadsTotal },
        { id: 'registrations', label: 'Event Registrations', icon: Users, count: regsTotal },
        { id: 'comments', label: 'Comments & Feedback', icon: MessageSquare, count: commentsTotal },
    ];

    const statsLoading = leadsLoading && regsLoading && commentsLoading;

    return (
        <div className="w-full relative min-h-screen flex flex-col bg-ink">
            <Navbar />

            <main className="flex-grow w-full">
                {/* Header */}
                <section className="relative pt-5! pb-10! overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[120px] pointer-events-none" />
                    <MaxWidthWrapper className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4! py-1.5! mb-6!">
                            <LayoutDashboard className="w-4 h-4 text-blue" />
                            <span className="font-display font-bold uppercase tracking-widest text-blue-mid text-xs">Admin</span>
                        </div>
                        <h1 className="font-display font-black uppercase text-2xl md:text-4xl text-canvas mb-2">Dashboard</h1>
                        <p className="font-body text-canvas/80 text-sm md:text-base">Overview of TechPath leads, event registrations, and community feedback.</p>
                    </MaxWidthWrapper>
                </section>

                <MaxWidthWrapper className="relative z-10 pb-20">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10!">
                        <StatCard label="TechPath Leads" value={leadsTotal} icon={Zap} loading={statsLoading} />
                        <StatCard label="Event Registrations" value={regsTotal} icon={Users} loading={statsLoading} />
                        <StatCard label="Comments & Feedback" value={commentsTotal} icon={MessageSquare} loading={statsLoading} />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1! mb-6! overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4! py-2.5! rounded-lg font-display font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-all flex-1 justify-center ${
                                    activeTab === tab.id
                                        ? 'bg-blue text-white shadow-lg shadow-blue/20'
                                        : 'text-canvas/50 hover:text-canvas hover:bg-white/5'
                                }`}
                            >
                                <tab.icon size={14} />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                <span className={`text-[10px] px-1.5! py-0.5! rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Table Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        {/* Leads */}
                        {activeTab === 'leads' && (
                            <div className="p-4! md:p-6!">
                                {leadsError ? (
                                    <ErrorState message={leadsError} onRetry={() => fetchLeads(leadsPage)} />
                                ) : (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm md:text-lg">
                                                <thead>
                                                    <tr className="border-b border-white/10">
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base">Name</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base">Email</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base hidden md:table-cell">Field of Study</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base hidden lg:table-cell">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {leadsLoading
                                                        ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                                                        : leads.length === 0
                                                        ? null
                                                        : leads.map((lead) => (
                                                            <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                                                <td className="px-4! py-3! font-body text-canvas">{lead.name}</td>
                                                                <td className="px-4! py-3! font-body text-canvas/70 text-xs md:text-base">{lead.email}</td>
                                                                <td className="px-4! py-3! font-body text-canvas/70 hidden md:table-cell">{lead.field_of_study}</td>
                                                                <td className="px-4! py-3! font-body text-canvas/40 text-xs hidden lg:table-cell">{formatDate(lead.created_at)}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {!leadsLoading && leads.length === 0 && <EmptyState label="leads" />}
                                        <Pagination
                                            page={leadsPage}
                                            total={leadsTotal}
                                            onPrev={() => setLeadsPage((p) => Math.max(1, p - 1))}
                                            onNext={() => setLeadsPage((p) => p + 1)}
                                        />
                                    </>
                                )}
                            </div>
                        )}

                        {/* Registrations */}
                        {activeTab === 'registrations' && (
                            <div className="p-4! md:p-6!">
                                {regsError ? (
                                    <ErrorState message={regsError} onRetry={() => fetchRegistrations(regsPage)} />
                                ) : (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm md:text-lg">
                                                <thead>
                                                    <tr className="border-b border-white/10">
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base">Name</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base">Email</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base hidden md:table-cell">Phone</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base hidden md:table-cell">Event</th>
                                                        <th className="text-left px-4! py-3! font-display font-bold uppercase tracking-wider text-canvas/40 text-xs md:text-base hidden lg:table-cell">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {regsLoading
                                                        ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                                                        : registrations.length === 0
                                                        ? null
                                                        : registrations.map((reg) => (
                                                            <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                                                <td className="px-4! py-3! font-body text-canvas">{reg.name}</td>
                                                                <td className="px-4! py-3! font-body text-canvas/70 text-xs">{reg.email}</td>
                                                                <td className="px-4! py-3! font-body text-canvas/70 hidden md:table-cell">{reg.phone}</td>
                                                                <td className="px-4! py-3! hidden md:table-cell">
                                                                    <span className="font-display font-bold uppercase text-[10px] tracking-wider text-blue bg-blue/10 border border-blue/20 px-2 py-0.5 rounded-full">
                                                                        {reg.event_id}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4! py-3! font-body text-canvas/40 text-xs hidden lg:table-cell">{formatDate(reg.created_at)}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {!regsLoading && registrations.length === 0 && <EmptyState label="registrations" />}
                                        <Pagination
                                            page={regsPage}
                                            total={regsTotal}
                                            onPrev={() => setRegsPage((p) => Math.max(1, p - 1))}
                                            onNext={() => setRegsPage((p) => p + 1)}
                                        />
                                    </>
                                )}
                            </div>
                        )}

                        {/* Comments */}
                        {activeTab === 'comments' && (
                            <div className="p-4! md:p-6!">
                                {commentsError ? (
                                    <ErrorState message={commentsError} onRetry={() => fetchComments(commentsPage)} />
                                ) : (
                                    <>
                                        {commentsLoading ? (
                                            <div className="space-y-3">
                                                {Array.from({ length: 4 }).map((_, i) => (
                                                    <div key={i} className="bg-white/5 rounded-xl p-4! space-y-2 animate-pulse">
                                                        <div className="h-3 w-24 bg-white/10 rounded" />
                                                        <div className="h-4 w-full bg-white/10 rounded" />
                                                        <div className="h-4 w-3/4 bg-white/10 rounded" />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : comments.length === 0 ? (
                                            <EmptyState label="comments or feedback" />
                                        ) : (
                                            <div className="space-y-3">
                                                {comments.map((c) => (
                                                    <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4! hover:border-white/20 transition-colors">
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <span className="font-display font-bold text-canvas text-sm md:text-lg">{c.name}</span>
                                                            <span className={`font-display font-bold uppercase text-[10px] md:text-sm tracking-wider px-2! py-0.5! rounded-full border ${
                                                                c.kind === 'feedback'
                                                                    ? 'text-orange bg-orange/10 border-orange/20'
                                                                    : 'text-blue bg-blue/10 border-blue/20'
                                                            }`}>
                                                                {c.kind}
                                                            </span>
                                                            <span className="font-display font-bold uppercase text-[10px] tracking-wider text-canvas/30 bg-white/5 border border-white/10 px-2! py-0.5! rounded-full">
                                                                {c.event_id}
                                                            </span>
                                                            <span className="font-body text-canvas/30 text-xs md:text-base ml-auto">{formatDate(c.created_at)}</span>
                                                        </div>
                                                        <p className="font-body text-canvas/70 text-sm md:text-lg leading-relaxed">{c.message}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <Pagination
                                            page={commentsPage}
                                            total={commentsTotal}
                                            onPrev={() => setCommentsPage((p) => Math.max(1, p - 1))}
                                            onNext={() => setCommentsPage((p) => p + 1)}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </MaxWidthWrapper>
            </main>

            <Footer />
        </div>
    );
}
