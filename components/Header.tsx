
import React from 'react';
import { BotIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BotIcon className="h-8 w-8 text-sky-600" />
            <span className="text-xl font-bold text-slate-800">
              ConstructoBot
            </span>
          </div>
          <a
            href="#chat"
            className="hidden sm:inline-block bg-sky-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300"
          >
            Perguntar Agora
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
