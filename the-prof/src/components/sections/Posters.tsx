import { motion } from 'framer-motion';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Download } from 'lucide-react';

const posters = [
    { id: '01', src: '/assets/posters/Poster -01.jpg' },
    { id: '02', src: '/assets/posters/Poster -02.jpg' },
    { id: '03', src: '/assets/posters/Poster -03.jpg' },
    { id: '04', src: '/assets/posters/Poster -04.jpg' },
    { id: '05', src: '/assets/posters/Poster -05.jpg' },
    { id: '06', src: '/assets/posters/Poster -06.jpg' },
];

export default function Posters() {
    return (
        <section className="bg-canvas py-20! relative z-10 w-full overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue/10 rounded-full blur-[100px] pointer-events-none" />

            <MaxWidthWrapper className="relative z-10">
                <div className="flex flex-col items-center text-center mb-14!">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="font-display font-semibold uppercase tracking-[0.15em] text-muted text-sm md:text-lg mb-4"
                    >
                        Free Resources
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="font-display font-black uppercase text-4xl md:text-5xl md:text-6xl text-ink max-w-3xl"
                    >
                        Spread The Word
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12! w-full max-w-7xl mx-auto">
                    {posters.map((poster, idx) => (
                        <motion.div
                            key={poster.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex flex-col"
                        >
                            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-ink shadow-2xl relative">
                                <img
                                    src={poster.src}
                                    alt={`Poster ${poster.id}`}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-brand" />
                            </div>
                            <div className="mt-6! flex justify-between items-center px-2">
                                <span className="font-display font-bold uppercase tracking-wider text-ink text-lg">POSTER {poster.id}</span>
                                <a
                                    href={poster.src}
                                    download={`The-Prof-Poster-${poster.id}.jpg`}
                                    className="text-orange hover:text-blue font-display font-bold uppercase text-sm tracking-wider transition-colors flex items-center gap-2"
                                >
                                    Download
                                    <Download />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
