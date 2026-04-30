import React from 'react';

type NoticeProps = {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'error';
};

const variantStyles = {
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-rose-200 bg-rose-50 text-rose-900',
};

const Notice = ({ title, message, variant = 'info' }: NoticeProps) => {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${variantStyles[variant]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <p>{message}</p>
    </div>
  );
};

export default Notice;
