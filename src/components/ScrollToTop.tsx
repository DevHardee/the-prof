import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Use a slight delay to ensure the page has rendered and height is calculated
        // This is more robust than an immediate call which might be ignored if the page is still loading
        const scrollToTop = () => {
            window.scrollTo(0, 0);
            // Fallbacks for layout variations
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

        // 1. Immediate
        scrollToTop();
        
        // 2. Short delay for React render cycle
        const t1 = setTimeout(scrollToTop, 10);
        
        // 3. Medium delay for layout/image baseline shifts
        const t2 = setTimeout(scrollToTop, 150);
        
        // 4. Long delay for slow loading assets
        const t3 = setTimeout(scrollToTop, 400);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [pathname]);

    return null;
}
