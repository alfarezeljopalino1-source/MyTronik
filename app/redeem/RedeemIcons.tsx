import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function ZapIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function CheckCircle2Icon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function AlertCircleIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.951 1.18-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.785-1.675-2.086-.176-.3-.019-.463.132-.612.135-.135.301-.35.451-.525.15-.176.2-.301.3-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.232-.244-.587-.492-.507-.676-.516-.175-.01-.376-.01-.576-.01-.2 0-.526.075-.802.375-.275.3-1.052 1.028-1.052 2.508 0 1.479 1.077 2.908 1.227 3.109.15.2 2.12 3.238 5.136 4.542.717.311 1.277.496 1.713.634.72.229 1.375.197 1.893.119.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.125-.275-.2-.576-.35zM12.04 2C6.519 2 2.036 6.478 2.036 12c0 1.96.568 3.79 1.55 5.342L2 22l4.823-1.547A9.924 9.924 0 0012.04 22c5.521 0 10.004-4.478 10.004-10S17.561 2 12.04 2z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

export function ShoppingBagIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

export function ClockIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 3" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function CopyIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth={2} />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function EyeIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export function EyeOffIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" />
    </svg>
  );
}
