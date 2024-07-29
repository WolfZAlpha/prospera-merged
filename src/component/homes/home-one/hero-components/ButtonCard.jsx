// ButtonCard.js
import React, { useState } from 'react';

const ButtonCard = ({ href, BlueSvg, BlackSvg, text, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerClasses = `group overflow-hidden relative flex justify-center items-center py-3 aspect-[7] transition-all duration-300 ${
    isActive ? 'text-black' : 'hover:text-black text-sky-400'
  }`;

  // Update textClasses to respond to isHovered state as well
  const textClasses = `absolute z-10 p-4 text-lg font-bold drop-shadow-xl ${
    isActive || isHovered ? 'text-black' : 'text-sky-400'
  }`;


  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={containerClasses}
      onMouseEnter={() => !isActive && setIsHovered(true)}
      onMouseLeave={() => !isActive && setIsHovered(false)}
      style={{ position: 'relative' }}
    >
      {(isActive || isHovered) ? <BlueSvg className="w-full h-full pointer-events-none" /> : <BlackSvg className="w-full h-full pointer-events-none" />}
      <span className={textClasses} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {text}
      </span>
    </a>
  );
};

export default ButtonCard;
