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
      primary: 'glass-hover text-[--foreground] hover:scale-105',
      secondary: 'border border-[--subtle] hover:border-[--accent] hover:bg-[--glass] hover:scale-105',
      ghost: 'hover:bg-[--glass] hover:text-[--accent]'
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
        whileHover={disabled ? {} : { y: -2 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;