import React from 'react';

type CategoryPillProps = {
  label: string;
};

const CategoryPill = ({ label }: CategoryPillProps) => {
  return (
    <span className="rounded-full border border-brand-secondary/30 bg-brand-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
      {label}
    </span>
  );
};

export default CategoryPill;
