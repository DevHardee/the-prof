import React from 'react';

interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const MaxWidthWrapper = ({ children, className = '' }: MaxWidthWrapperProps) => {
    return (
        <div className={`w-full max-w-[1400px] mx-auto px-6 md:px-12 ${className}`}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;