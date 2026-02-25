import React from 'react';
import tusharika from "../../assets/tusharika.jpeg";
import shweta from "../../assets/shweta.jpg";

const UpScrollTeam = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">The Minds Behind UpScroll</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            A collection of strategists, storytellers, and architects building the future of digital interaction.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Shweta's Profile Card */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
              <img 
                src={shweta}
                alt="Shweta Singh" 
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">Shweta Singh</h4>
            <p className="text-indigo-600 font-medium italic mb-6">— The Interface Alchemist</p>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm lg:text-base">
              <p>
                Shweta lives in the high-stakes gap between "abstract strategy" and the screens you actually touch. As the lead builder of UpScroll, she is a self-proclaimed pixel-perfectionist who refuses to let digital tools be anything less than seamless.
              </p>
              <p>
                She believes that if a user has to think twice, the interface has already failed. Her mission is simple: build responsive, elegant spaces where ideas can breathe and user journeys are built to last.
              </p>
              <p>
                Beyond the syntax, Shweta views frontend development as a form of digital psychology. She doesn't just write components; she engineers trust. By balancing technical rigor with an obsession for micro-interactions, she ensures that UpScroll isn't just a platform—it's an experience that feels intuitively human.
              </p>
            </div>
          </div>

          {/* Tusharika's Profile Card */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg">
              <img 
                src={tusharika}
                alt="Tusharika Srivastava" 
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">Tusharika Srivastava</h4>
            <p className="text-emerald-600 font-medium italic mb-6">— The Backend Architect</p>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm lg:text-base">
              <p>
                Tusharika prioritizes logic over noise, building the resilient foundations that keep UpScroll running when others focus on the surface. A disciplined strategist who questions every edge case, she replaces chaos with clean, unbreakable architecture.
              </p>
              <p>
                Her ideology is simple: build strong foundations, avoid shortcuts, and never trust a system that “works for now.” She believes discipline beats motivation, consistency beats hype, and clean architecture is more attractive than flashy features.
              </p>
              <p>
                Ambitious and slightly stubborn about doing things the right way, she ensures the engine under the hood is as elegant as the interface above. For Tusharika, the goal isn't just to make things run—it's to make them run properly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UpScrollTeam;