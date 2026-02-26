import React from "react";
const Journal = () => {
  return (
    <div className="min-h-[80vh] pt-32 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
        Journal
      </h1>
      <p className="text-xl text-zinc-500 font-medium mb-12">
        A placeholder for your Journalling.
      </p>

      <div className="p-20 border-4 border-dashed border-zinc-300 rounded-3xl text-zinc-400 font-bold uppercase">
        Coming Soon
      </div>
    </div>
  );
};

export default Journal;
