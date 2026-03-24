import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "", variant = 'dark' }: LogoProps) {
  const brandGreen = '#10b981'; 
  
  return (
    <div className={`flex items-center justify-start ${className}`}>
      <svg
        viewBox="0 0 320 180"
        className="h-16 w-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMid meet"
      >
        <title>Foot Rush Shoecare Logo</title>
        
        {/* The Shoe/Lace Loop - White in the image */}
        <path
          d="M185 10 C145 10 130 50 130 80 C130 110 150 130 180 130 C210 130 240 140 260 160 L280 150 C260 120 230 110 200 110 C170 110 160 90 160 80 C160 60 170 40 190 40 C210 40 220 60 220 80 L240 80 C240 40 220 10 185 10Z"
          fill={variant === 'light' ? '#ffffff' : brandGreen}
        />
        
        {/* The Shoe Bottom Part */}
        <path
          d="M180 130 C160 140 150 155 160 165 L260 165 C270 155 260 140 240 130 C220 125 200 125 180 130Z"
          fill={variant === 'light' ? '#ffffff' : brandGreen}
        />
        
        {/* Shoe Details (Laces) */}
        <path
          d="M190 145 L215 145 M195 155 L220 155"
          stroke={variant === 'light' ? brandGreen : '#ffffff'}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* The Tilted White Rectangle for "FOOT RUSH" */}
        <path
          d="M30 60 L145 50 L135 145 L20 155 Z"
          fill={variant === 'light' ? '#ffffff' : brandGreen}
        />
        
        {/* "FOOT RUSH" Text - Green on White */}
        <text
          transform="rotate(-4, 85, 100)"
          x="38"
          y="95"
          fill={variant === 'light' ? brandGreen : '#ffffff'}
          style={{
            fontFamily: 'Arial Black, sans-serif',
            fontWeight: 900,
            fontSize: '28px',
            letterSpacing: '-1.5px'
          }}
        >
          FOOT
        </text>
        <text
          transform="rotate(-4, 85, 100)"
          x="35"
          y="125"
          fill={variant === 'light' ? brandGreen : '#ffffff'}
          style={{
            fontFamily: 'Arial Black, sans-serif',
            fontWeight: 900,
            fontSize: '28px',
            letterSpacing: '-1.5px'
          }}
        >
          RUSH
        </text>

        {/* "SHOECARE" Text - White on Green (or Green on White depending on variant) */}
        <text
          x="40"
          y="175"
          fill={variant === 'light' ? '#ffffff' : brandGreen}
          style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '3px'
          }}
        >
          SHOECARE
        </text>
      </svg>
    </div>
  );
}
