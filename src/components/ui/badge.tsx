import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'soft';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';
    const variants = {
      default: 'bg-reef-100 text-reef-900 border border-reef-200',
      outline: 'border border-dusk-300 text-dusk-700',
      soft: 'bg-dusk-100 text-dusk-800',
    };
    return <span className={cn(base, variants[variant], className)} ref={ref} {...props} />;
  }
);

Badge.displayName = 'Badge';
