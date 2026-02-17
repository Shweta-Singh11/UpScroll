import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ title, description, bgColor, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(path)}
      className={`${bgColor} aspect-square p-8 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-lg rounded-2xl border-4 border-black dark:border-white group`}
    >
      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-black group-hover:italic transition-all">
        {title}
      </h3>
      <p className="text-sm font-bold text-black/80 leading-relaxed">
        {description}
      </p>
      
    </div>
  );
};

export default ActivityCard;