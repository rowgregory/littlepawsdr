import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface MotionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'button' | 'ghost' | 'underline' | 'scale' | 'slide';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  external?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
}

const MotionLink: FC<MotionLinkProps> = ({
  href,
  children,
  className = '',
  variant = 'default',
  size = 'md',
  color = 'primary',
  external = false,
  disabled = false,
  icon,
  iconPosition = 'right',
  onClick,
  whileHover,
  whileTap,
  transition,
  ...props
}) => {
  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Color variants
  const colorClasses = {
    primary: 'text-blue-600 hover:text-blue-700',
    secondary: 'text-gray-600 hover:text-gray-700',
    accent: 'text-purple-600 hover:text-purple-700',
    success: 'text-green-600 hover:text-green-700',
    warning: 'text-yellow-600 hover:text-yellow-700',
    danger: 'text-red-600 hover:text-red-700',
  };

  const buttonColorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    accent: 'bg-purple-600 hover:bg-purple-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // Variant styles and animations
  const variants = {
    default: {
      className: `inline-flex items-center font-medium transition-colors ${colorClasses[color]}`,
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.2 },
    },
    button: {
      className: `inline-flex items-center font-medium rounded-lg transition-colors ${sizeClasses[size]} ${buttonColorClasses[color]}`,
      whileHover: { scale: 1.05, y: -1 },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2 },
    },
    ghost: {
      className: `inline-flex items-center font-medium rounded-lg border-2 transition-all ${sizeClasses[size]} border-${
        color === 'primary'
          ? 'blue'
          : color === 'secondary'
          ? 'gray'
          : color === 'accent'
          ? 'purple'
          : color === 'success'
          ? 'green'
          : color === 'warning'
          ? 'yellow'
          : 'red'
      }-600 ${colorClasses[color]} hover:bg-${
        color === 'primary'
          ? 'blue'
          : color === 'secondary'
          ? 'gray'
          : color === 'accent'
          ? 'purple'
          : color === 'success'
          ? 'green'
          : color === 'warning'
          ? 'yellow'
          : 'red'
      }-50`,
      whileHover: { scale: 1.03, borderWidth: 3 },
      whileTap: { scale: 0.97 },
      transition: { duration: 0.2 },
    },
    underline: {
      className: `inline-flex items-center font-medium relative ${colorClasses[color]}`,
      whileHover: { y: -1 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.2 },
    },
    scale: {
      className: `inline-flex items-center font-medium ${colorClasses[color]}`,
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.9 },
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    slide: {
      className: `inline-flex items-center font-medium ${colorClasses[color]}`,
      whileHover: { x: 5 },
      whileTap: { x: 2 },
      transition: { duration: 0.2 },
    },
  };

  const variantConfig = variants[variant];
  const combinedClassName = `${variantConfig.className} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`.trim();

  // Merge custom animations with defaults
  const finalWhileHover = whileHover || variantConfig.whileHover;
  const finalWhileTap = whileTap || variantConfig.whileTap;
  const finalTransition = transition || variantConfig.transition;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <motion.span
          className='mr-2'
          animate={{ rotate: variant === 'scale' ? [0, 10, -10, 0] : 0 }}
          transition={{ duration: 2, repeat: variant === 'scale' ? Infinity : 0 }}
        >
          {icon}
        </motion.span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <motion.span
          className='ml-2'
          animate={{
            x: variant === 'slide' ? [0, 3, 0] : 0,
            rotate: variant === 'scale' ? [0, 10, -10, 0] : 0,
          }}
          transition={{
            duration: variant === 'slide' ? 1.5 : 2,
            repeat: variant === 'slide' || variant === 'scale' ? Infinity : 0,
          }}
        >
          {icon}
        </motion.span>
      )}
      {variant === 'underline' && (
        <motion.div
          className='absolute bottom-0 left-0 right-0 h-0.5 bg-current origin-left'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );

  const MotionComponent = motion.a;
  const linkProps = {
    href,
    target: external ? '_blank' : undefined,
    rel: external ? 'noopener noreferrer' : undefined,
  };

  return (
    <MotionComponent
      {...linkProps}
      className={combinedClassName}
      whileHover={disabled ? {} : finalWhileHover}
      whileTap={disabled ? {} : finalWhileTap}
      transition={finalTransition}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {content}
    </MotionComponent>
  );
};

export default MotionLink;
