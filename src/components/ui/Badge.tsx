'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'default';
  children: React.ReactNode;
  className?: string;
}

const variantMap: Record<string, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  default: 'badge-default',
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn('badge', variantMap[variant], className)}>
      {children}
    </span>
  );
}
