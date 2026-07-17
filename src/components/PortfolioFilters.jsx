import React from 'react';

const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'category-1', label: 'Web Architecture' },
  { id: 'category-2', label: 'Full-Stack Apps' },
  { id: 'category-3', label: 'Open Source' },
  { id: 'category-4', label: 'DevOps & Infra' }
];

export default function PortfolioFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 mb-12 relative z-10 px-4">
      {filterCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onFilterChange(cat.id)}
          className={`font-sans font-light text-[13px] uppercase tracking-wider px-5 py-2.5 rounded-none border-0 transition-all duration-300 cursor-pointer ${
            activeFilter === cat.id
              ? 'bg-[#3f3f46] text-white'
              : 'bg-[#f3f3f3] text-[#777] hover:bg-[#404148] hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
