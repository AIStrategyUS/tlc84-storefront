import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-cream hover:bg-ink',
  secondary: 'bg-moss text-cream hover:bg-forest',
  outline: 'border border-forest text-forest hover:bg-sage/50',
}

const BASE_CLASSES =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => (
    <button ref={ref} className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />
  ),
)
Button.displayName = 'Button'

export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return <Link className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />
}
