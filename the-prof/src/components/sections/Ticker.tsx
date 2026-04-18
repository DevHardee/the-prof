import MaxWidthWrapper from "../MaxWidthWrapper";

interface TickerItem {
    text: string;
    accent: 'orange' | 'blue' | false;
}

const tickerItems: TickerItem[] = [
    { text: 'Think Better', accent: false },
    { text: '✳', accent: 'orange' },
    { text: 'See Clearly', accent: false },
    { text: '⚡', accent: 'blue' },
    { text: 'Move Differently', accent: false },
    { text: '✳', accent: 'orange' },
    { text: 'Knowledge Is Free.', accent: false },
    { text: '⚡', accent: 'blue' },
    { text: 'Growth Is Earned', accent: false },
    { text: '✳', accent: 'orange' },
    { text: 'Charge Your Brain', accent: false },
    { text: '⚡', accent: 'blue' },
    { text: '1 Idea. 1 Decision. 1 Shift.', accent: false },
    { text: '✳', accent: 'orange' },
];

export default function Ticker() {
    return (
        <MaxWidthWrapper>
            <div className="w-full bg-ink overflow-hidden py-4 flex" aria-hidden="true">
                <div className="flex whitespace-nowrap animate-[ticker-scroll_28s_linear_infinite] hover:[animation-play-state:paused] w-max">
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                        <span
                            key={i}
                            className={`font-display font-bold uppercase tracking-[0.18em] text-xs px-4 flex-shrink-0 ${item.accent === 'orange' ? 'text-orange' : item.accent === 'blue' ? 'text-blue-mid' : 'text-canvas'
                                }`}
                        >
                            {item.text}
                        </span>
                    ))}
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
