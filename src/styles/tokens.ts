export const tokens = {
  colors: {
    background: '#0B0B0F',
    text: '#EDEDED',
    accent: '#00FFF0', // neon-cyan
    secondary: '#8A7CFF', // violet
    subtle: 'rgba(237, 237, 237, 0.1)', // low alpha grid/lines
    glass: 'rgba(255, 255, 255, 0.05)' // elevated glass hover
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    tracking: '-0.02em', // tight tracking
    display: {
      fontSize: 'clamp(3rem, 8vw, 8rem)',
      lineHeight: '0.9',
      fontWeight: '700'
    },
    heading: {
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      lineHeight: '1.1',
      fontWeight: '600'
    },
    body: {
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    small: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
      lineHeight: '1.5',
      fontWeight: '400'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '8rem',
    xxl: '16rem'
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px'
  },
  grid: {
    columns: 12,
    gap: '2rem',
    maxWidth: '1200px'
  },
  performance: {
    targetFpsDesktop: 60,
    targetFpsMobile: 30,
    frameTimeTarget: 8, // ms
    samplingDuration: 3000 // ms
  }
} as const;