import React from 'react';

type CategoryPillProps = {
  label: string;
};

const CategoryPill = ({ label }: CategoryPillProps) => {
  return (
    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900">
      {label}
    </span>
  );
};

export default CategoryPill;
