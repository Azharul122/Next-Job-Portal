import React from 'react';

interface GradientIconProps {
    style:string
id:string;
  icon: React.ReactNode; 
  gradientStart: string; 
  gradientEnd: string; 
  size?: string; 
  className?: string; 
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
