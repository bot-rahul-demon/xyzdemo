interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = true }: CardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 ${onClick ? 'cursor-pointer' : ''} ${hover ? 'hover:shadow-lg hover:border-primary/30 transition-all duration-200' : ''} shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
