import React from 'react';
import ActivityCard from '../components/ui/Activities'; 

const Home = () => {
  const activities = [
    {
      title: "Memory & Logic",
      description: "Chal Game khel",
      bgColor: "bg-blue-300", 
      path: "/activities/logic"
    },
    {
      title: "Fact Station",
      description: "Train your Brain",
      bgColor: "bg-blue-300",
      path: "/activities/fact-station"
    },
    {
      title: "Creative Writing",
      description: "Literary talent dikhao ",
      bgColor: "bg-blue-300",
      path: "/activities/caption"
    }
  ];

  return (
    <div className="pb-20">
      <div className="py-24 text-center">
        <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none">
          Doom
        </h1>
        <p className="mt-6 text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
          arey bhai kuch kuch likh dena website ke bare me chudail
        </p>
      </div>
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {activities.map((act, index) => (
            <ActivityCard key={index} {...act} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;