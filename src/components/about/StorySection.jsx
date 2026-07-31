import React from "react";

const StorySection = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm transition-all duration-300">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-indigo-600 dark:bg-cyan-400"></span>
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-indigo-600 dark:text-cyan-400">
              The Origin
            </h2>
          </div>

          <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic text-slate-900 dark:text-white uppercase leading-[0.9]">
            Story Behind
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 pr-4">
              {" "}
              UpScroll
            </span>
          </h3>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-base md:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-light">
          <p>
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent font-extrabold">UpScroll</span> didn't
            start in a boardroom; it started with a question about how we
            interact with the digital world. We realized that most platforms
            were built to keep you scrolling down, lost in an endless loop of
            noise designed to harvest attention. We wanted to build something
            different—a platform that helps you scroll up.
          </p>

          <p>
            Our mission is to elevate the digital experience by prioritizing
            clarity and intent. We believe technology should serve your will,
            not your impulses. What began as a late-night collaboration between
            <span className="text-slate-900 dark:text-white font-bold"> Shweta Singh</span> and
            <span className="text-slate-900 dark:text-white font-bold">
              {" "}
              Tusharika Srivastava
            </span>{" "}
            found its soul through the craft of our architects and storytellers.
          </p>

          <p>
            Today, UpScroll is a testament to the idea that clean design and
            rigorous logic can coexist beautifully. We aren't just building a
            platform; we're architecting a digital sanctuary that respects your
            time, your focus, and your unique journey. We are here to reclaim
            the depth of human potential, one pixel at a time.
          </p>
        </div>

        {/* since*/}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800/80">
          <p className="text-slate-400 dark:text-zinc-500 text-sm font-medium tracking-widest uppercase">
            Established 2026 — Crafted for Focus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
