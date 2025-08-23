interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenReaderOnly({ children, className = '' }: ScreenReaderOnlyProps) {
  return (
    <span 
      className={`sr-only ${className}`}
      aria-hidden="false"
    >
      {children}
    </span>
  );
}
