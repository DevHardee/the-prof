import React from 'react';

interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const MaxWidthWrapper = ({ children, className = '' }: MaxWidthWrapperProps) => {
    return (
        <div className={`container-brand ${className}`}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;