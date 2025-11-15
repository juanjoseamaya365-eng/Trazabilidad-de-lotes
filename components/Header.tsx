
import React from 'react';

const CoffeeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.24 2 7 4.24 7 7V9C4.24 9 2 11.24 2 14V16C2 18.76 4.24 21 7 21H17C19.76 21 22 18.76 22 16V14C22 11.24 19.76 9 17 9V7C17 4.24 14.76 2 12 2ZM9 7C9 5.34 10.34 4 12 4S15 5.34 15 7V9H9V7ZM17 19H7C5.34 19 4 17.66 4 16V14C4 12.34 5.34 11 7 11H17C18.66 11 20 12.34 20 14V16C20 17.66 18.66 19 17 19Z" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
        <CoffeeIcon className="h-8 w-8 text-stone-700 mr-3" />
        <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
          Trazabilidad de Café
        </h1>
      </div>
    </header>
  );
};

export default Header;
