// components/GradientIcon.tsx
import React from 'react';

interface GradientIconProps {
    style:string
id:string;
  icon: React.ReactNode; // The icon to render
  gradientStart: string; // Start color of the gradient
  gradientEnd: string; // End color of the gradient
  size?: string; // Tailwind size class (e.g., "text-4xl")
  className?: string; // Additional classes for customization
}

const GradientIcon: React.FC<GradientIconProps> = ({
  icon,
  gradientStart,
  gradientEnd,
  size = 'text-xl',
  className,
  id,
}) => {
  return (
    <div className={className}>
      <svg style={{ display: 'none' }}>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>
      </svg>
      
        {icon}
      
    </div>
  );
};

export default GradientIcon;
