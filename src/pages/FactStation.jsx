import React, { useState, useEffect } from 'react';

const FactStation = () => {
  const [fact, setFact] = useState({ text: "", id: null });
  const [loading, setLoading] = useState(true);

  const fetchBrainByte = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://10.209.220.75:8080/api/facts/random");
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const factData = await response.json(); 
      console.log("Success! The backend sent:", factData);
      setFact(factData);
      
    } 
    catch (error) {
      console.error("Failed to connect to backend:", error);
      setFact({ 
        text: "bheja khali hai", 
        id: 0 
      });
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrainByte();
  }, []);

  return (
    <div className="min-h-[80vh] pt-32 px-6 flex flex-col items-center bg-white dark:bg-black transition-colors">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-black dark:text-white">
            Fact Station
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
            Train your Brain
          </p>
        </div>

        <div className="relative mt-12 p-12 border-4 border-black dark:border-white rounded-3xl bg-emerald-100 dark:bg-emerald-900/20 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-zinc-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
              <p className="font-bold uppercase tracking-widest text-sm">Synchronizing...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <span className="text-4xl">🧠</span>
              <p className="text-2xl md:text-3xl font-bold italic leading-tight text-zinc-900 dark:text-zinc-100">
                "{fact.text}"
              </p>
              
            </div>
          )}
        </div>

        <button 
          onClick={fetchBrainByte}
          disabled={loading}
          className="mt-12 px-10 py-4 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Next Brain Byte"}
        </button>

      </div>
    </div>
  );
};

export default FactStation;