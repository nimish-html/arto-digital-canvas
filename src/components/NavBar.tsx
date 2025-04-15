import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <div className="mr-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#6D5BDC" strokeWidth="2"/>
            <circle cx="16" cy="16" r="7" fill="#6D5BDC"/>
            <circle cx="22" cy="10" r="2" fill="#6D5BDC"/>
          </svg>
        </div>
        <div className="flex space-x-2">
          <button className="nav-button">Works</button>
          <button className="nav-button">About</button>
          <button className="nav-button">Feed</button>
        </div>
      </div>
      
      <div className="status-badge">
        Currently: booking projects for Apr, 2025 →
      </div>
      
      <div className="flex items-center">
        <div className="flex -space-x-2">
          <img src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=150&h=150&q=80&crop=faces&fit=crop" className="w-8 h-8 rounded-full border-2 border-white" alt="Profile" />
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop" className="w-8 h-8 rounded-full border-2 border-white" alt="Profile" />
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&q=80&crop=faces&fit=crop" className="w-8 h-8 rounded-full border-2 border-white" alt="Profile" />
          <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop" className="w-8 h-8 rounded-full border-2 border-white" alt="Profile" />
        </div>
        <button className="ml-2 text-sm text-purple-dark font-medium">+ 15 others</button>
      </div>
    </nav>
  );
};

export default NavBar;