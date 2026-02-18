import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ title, description, bgColor, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(path)}
      className={`${bgColor} aspect-square p-8 flex flex-col justify-center items-center text-center cursor-pointer  duration-300 shadow-2xl hover:scale-105 transition-transform  rounded-2xl border-4 border-black dark:border-white group`}
    >
      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-black group-hover:scale-105 transition-transform">
        {title}
      </h3>
      <p className="text-sm font-bold text-black/80 leading-relaxed">
        {description}
      </p>
      
    </div>
  );
};

export default ActivityCard;