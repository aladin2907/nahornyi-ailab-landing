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
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, onClick, type = 'button', disabled = false }, ref) => {
    const baseClasses = 'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[--accent] focus:ring-offset-2 focus:ring-offset-[--background]';
    
    const variants = {
      primary: 'glass-intense text-[--foreground] magnetic-button ripple pulse-glow',
      secondary: 'border border-[--subtle] hover:border-[--accent] glass-hover shimmer magnetic-button',
      ghost: 'hover:bg-[--glass] hover:text-[--accent] magnetic-button'
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={disabled ? {} : { y: -4, scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;