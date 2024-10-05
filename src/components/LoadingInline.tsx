'use client'

interface LoadingInlineProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingInline: React.FC<LoadingInlineProps> = ({ size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'loading-sm' : size === 'md' ? 'loading-md' : 'loading-lg';

  return (
    <span className={`loading loading-ring ${sizeClass}`}></span>
  );
}

export default LoadingInline;
