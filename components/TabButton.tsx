import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
        isActive
          ? 'bg-amber-800 text-white shadow'
          : 'bg-white text-stone-600 hover:bg-stone-200'
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
