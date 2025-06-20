// MealSection.tsx
import React, { type ReactNode } from 'react';

interface MealSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const MealSection: React.FC<MealSectionProps> = ({ title, subtitle, children }) => {
  return (
    <section className="mb-12 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
      <div className="grid gap-6">{children}</div>
    </section>
  );
};

export default MealSection;