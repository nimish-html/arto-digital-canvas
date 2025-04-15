import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative my-16 overflow-hidden">
      <div className="logo-text">DESIGNER</div>
      <div className="absolute left-0 top-0 h-full flex items-center">
        <div className="vertical-text">
          DON'T DIE CURIOUS
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full flex items-center">
        <div className="vertical-text">
          MAKE COOL STUFF
        </div>
      </div>
    </div>
  );
};

export default Logo;