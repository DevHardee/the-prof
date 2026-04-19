import { useEffect, useState, useRef, type RefObject } from 'react';

export function useInView<T extends Element>(
    options: IntersectionObserverInit = { threshold: 0.15 }
): [RefObject<T | null>, boolean] {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            setIsInView(true);
            return;
        }

        const currentRef = ref.current;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            }
        }, options);

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.root, options.rootMargin, options.threshold]);

    return [ref, isInView];
}
