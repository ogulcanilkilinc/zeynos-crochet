'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'instagram';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

const sizeMap: Record<string, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

const variantMap: Record<string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  whatsapp: 'btn-whatsapp',
  instagram: 'btn-instagram',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  onClick,
  disabled = false,
  icon,
  type = 'button',
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    'btn',
    variantMap[variant],
    sizeMap[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
