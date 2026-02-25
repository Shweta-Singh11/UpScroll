import React from 'react';

const StorySection = () => {
  return (
    <section className='py-20 px-6 bg-white border-b border-gray-100'>
        <div className="max-w-6xl mx-auto ">
            {/* Narrative Header */}
            <div className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-indigo-600"></span>
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-indigo-600">
              The Origin
            </h2>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic text-gray-900 uppercase leading-[0.9]">
            Beyond the 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400 pr-4"> Loop
            </span>
          </h1>
        </div>

            {/* Main Narrative Content */}
            <div className="space-y-10 text-lg md:text-xl text-zinc-900 leading-relaxed font-light">
                <p>
                <strong className="text-black font-bold">UpScroll</strong> didn't start in a boardroom; it started with a question about 
                how we interact with the digital world. We realized that most platforms 
                were built to keep you scrolling down, lost in an endless loop of noise 
                designed to harvest attention. We wanted to build something different—a 
                platform that helps you scroll up.
                </p>

                <p>
                Our mission is to elevate the digital experience by prioritizing clarity 
                and intent. We believe technology should serve your will, not your 
                impulses. What began as a late-night collaboration between 
                <span className="text-black font-bold"> Shweta Singh</span> and 
                <span className="text-black font-bold"> Tusharika Srivastava</span> found its soul 
                through the craft of our architects and storytellers.
                </p>

                <p>
                Today, UpScroll is a testament to the idea that clean design and rigorous 
                logic can coexist beautifully. We aren't just building a platform; 
                we're architecting a digital sanctuary that respects your time, your 
                focus, and your unique journey. We are here to reclaim the depth of 
                human potential, one pixel at a time.
                </p>
            </div>

            {/* Decorative Accent */}
            <div className="mt-20 pt-10 border-t border-zinc-800">
                <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
                Established 2026 — Crafted for Focus.
                </p>
            </div>
            
        </div>
    </section>
    
  );
};

export default StorySection;