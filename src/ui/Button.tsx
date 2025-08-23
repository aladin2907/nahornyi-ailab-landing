'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    children, 
    onClick, 
    type = 'button', 
    disabled = false,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-haspopup': ariaHaspopup,
    ...props
  }, ref) => {
    const baseClasses = 'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[--accent] focus:ring-offset-2 focus:ring-offset-[--background] disabled:opacity-50 cursor-not-allowed touch-feedback mobile-animation';
    
    const variants = {
      primary: 'glass-intense text-[--foreground] magnetic-button ripple pulse-glow',
      secondary: 'border border-[--subtle] hover:border-[--accent] glass-hover shimmer magnetic-button',
      ghost: 'hover:bg-[--glass] hover:text-[--accent] magnetic-button'
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[44px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[48px]'
    };
    
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={disabled ? {} : { y: -4, scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-haspopup={ariaHaspopup}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;