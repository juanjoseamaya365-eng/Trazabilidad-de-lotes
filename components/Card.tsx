import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '', actions }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col ${className}`}>
      <div className="p-5 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-stone-500">{icon}</div>
              <h2 className="ml-3 text-lg font-semibold text-stone-700">{title}</h2>
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      </div>
      <div className="p-5 flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
