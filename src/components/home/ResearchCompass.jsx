import React, { useState } from 'react';
import { BookOpen, ExternalLink, Play, Clock } from 'lucide-react';

const categories = [
  'All',
  '🧠 Neuroplasticity',
  '🎯 Focus & Attention',
  '📱 Social Media',
  '⚡ Dopamine',
  '🧩 Addiction',
  '🌱 Digital Wellbeing',
  '📖 Habit Formation'
];

const resources = [
  {
    id: 'a1',
    title: 'Neuroplasticity and Free Will: Mastering the Art of Change',
    type: 'article',
    category: '🧠 Neuroplasticity',
    author: 'Maggie Ciskanik',
    organization: 'Magis Center',
    description: 'Explore the profound connection between neuroplasticity and free will, revealing how the brain’s capacity to change allows us to consciously reshape our thoughts, habits, and destiny.',
    url: 'https://www.magiscenter.com/blog/neuroplasticity-art-of-change?campaignid=22756906055&adgroupid=&adid=&utm_term=&utm_campaign=Faith+and+Science+Resources+-+PMax&utm_source=adwords&utm_medium=ppc&hsa_acc=8035034826&hsa_cam=22756906055&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=22760599645&gbraid=0AAAAADtwsMQcNrLELRuq3RPoYXQAJRr2-&gclid=Cj0KCQjw94bTBhDQARIsAN3vv0wPVaybCHT9_O5d2giYYv7qDrvx0wRJSP89k47F1Z72YBZJVphzB_0aAnhrEALw_wcB',
    readingTime: '5 min read',
    year: 2024
  },
  {
    id: 'a2',
    title: 'How to Focus in the Age of Distraction',
    type: 'article',
    category: '🎯 Focus & Attention',
    author: 'Tara Storozynsky',
    organization: 'Extensis',
    description: 'Learn how to train your focus, manage your daily tasks, and get more done in less time, without the struggle or the burnout.',
    url: 'https://www.extensis.com/extensis-blog/focus-in-the-age-of-distraction',
    readingTime: '7 min read',
    year: 2022
  },
  {
    id: 'a3',
    title: 'Exercise, Cognitive Training, and the Active Brain',
    type: 'article',
    category: '🧠 Neuroplasticity',
    author: 'Joyce Gomes-Osman',
    organization: 'Brain Plasticity Unit',
    description: 'A review of how physical exercise and cognitive training impact the brain’s structure and function, and how these activities can be used to improve cognitive performance.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6075983/',
    readingTime: '12 min read',
    year: 2018
  },
  {
    id: 'a4',
    title: 'Know Your Brain: Reward System & Dopamine',
    type: 'article',
    category: '⚡ Dopamine',
    author: 'Marc Dingman Ph.D.',
    organization: 'Neuroscientifically Challenged',
    description: 'A deep-dive into the neuroanatomy of dopamine pathways, highlighting how variable digital reward schedules trigger impulsive reward-seeking loops.',
    url: 'https://www.neuroscientificallychallenged.com/posts/know-your-brain-reward-system',
    readingTime: '4 min read',
    year: 2021
  },
  {
    id: 'a5',
    title: 'How the Cue-Craving-Response Loop Drives Habits',
    type: 'article',
    category: '📖 Habit Formation',
    author: 'James Clear',
    organization: 'James Clear Studio',
    description: 'Breaks down the neurological mechanisms of habit loops and how modern applications capture attention loops, with advice on rewiring behavior defaults.',
    url: 'https://jamesclear.com/three-steps-habit-change',
    readingTime: '6 min read',
    year: 2020
  },
  {
    id: 'a6',
    title: 'Screen Time and the Brain: Visual & Mental Pathways',
    type: 'article',
    category: '📱 Social Media',
    author: 'Harvard Medical Staff',
    organization: 'Harvard Medical School',
    description: 'Summarizes clinical research and neuroimaging findings on how high device screen time alters neural pathways related to adolescent social interaction and focus.',
    url: 'https://hms.harvard.edu/news/screen-time-brain',
    readingTime: '8 min read',
    year: 2022
  },
  {
    id: 'v1',
    title: 'How to improve Focus and Attention',
    type: 'video',
    category: '🎯 Focus & Attention',
    creator: 'Dr. Andrew Huberman',
    organization: 'Huberman Lab',
    description: 'An in-depth neurobiological guide analyzing how dopamine, epinephrine, and acetylcholine regulate focus, with science-based protocols for optimization.',
    url: 'https://youtu.be/5wHyklLr_FA?si=uyuhEp4n9hiqVv0W',
    thumbnail: 'https://img.youtube.com/vi/5wHyklLr_FA/mqdefault.jpg',
    duration: '12:30',
    year: 2026
  },
  {
    id: 'v2',
    title: 'How Social Media is Rotting Your Brain',
    type: 'video',
    category: '🧩 Addiction',
    creator: 'Dr. Alok Kanojia',
    organization: 'HealthyGamerGG',
    description: 'This is a summary of my experience with social media and how it has affected my life. It is not intended to be medical or professional advice.',
    url: 'https://youtu.be/eu9uvBYsPXs?si=obMkIVjshnB4mSpp',
    thumbnail: 'https://img.youtube.com/vi/eu9uvBYsPXs/mqdefault.jpg',
    duration: '32:10',
    year: 2025
  },
  {
    id: 'v3',
    title: 'How to Get Your Brain to Focus',
    type: 'video',
    category: '🌱 Digital Wellbeing',
    creator: 'Chris Bailey',
    organization: 'TEDxEastVan',
    description: 'Shares practical insights on cognitive overload, demonstrating how structured digital detox steps improve daily baseline concentration levels.',
    url: 'https://www.youtube.com/watch?v=Hu4Yvq-g7_Y',
    thumbnail: 'https://img.youtube.com/vi/Hu4Yvq-g7_Y/mqdefault.jpg',
    duration: '15:58',
    year: 2019
  },
  {
    id: 'v4',
    title: 'The Science of Making and Breaking Habits',
    type: 'video',
    category: '📖 Habit Formation',
    creator: 'Dr. Andrew Huberman',
    organization: 'Huberman Lab',
    description: 'Breaks down the neuroplasticity principles underlying routine building, discussing trigger states and neural structures that solidify positive behaviors.',
    url: 'https://youtu.be/HXuj7wAt7u8?si=VCVHW-fjFvxYBglt',
    thumbnail: 'https://img.youtube.com/vi/HXuj7wAt7u8/mqdefault.jpg',
    duration: '36:15',
    year: 2026
  },
  {
    id: 'v5',
    title: 'Cognition & Attention: Crash Course Psychology #8',
    type: 'video',
    category: '🎯 Focus & Attention',
    creator: 'Hank Green',
    organization: 'Crash Course',
    description: 'A visual, easy-to-follow guide on visual perception limits, selective attention mechanisms, and cognitive biases that direct human focus.',
    url: 'https://www.youtube.com/watch?v=jReX7qKU2yc',
    thumbnail: 'https://img.youtube.com/vi/jReX7qKU2yc/mqdefault.jpg',
    duration: '9:51',
    year: 2014
  }
];

export default function ResearchCompass() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredArticles = resources.filter((r) => {
    if (r.type !== 'article') return false;
    if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchAuthor = r.author.toLowerCase().includes(q);
      const matchOrg = r.organization.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      return matchTitle || matchAuthor || matchOrg || matchDesc;
    }
    return true;
  });

  const filteredVideos = resources.filter((r) => {
    if (r.type !== 'video') return false;
    if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchCreator = r.creator.toLowerCase().includes(q);
      const matchOrg = r.organization.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      return matchTitle || matchCreator || matchOrg || matchDesc;
    }
    return true;
  });

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-10 w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <header className="reveal-on-scroll text-center space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-cyan-400">
            Academic Foundation
          </h2>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            The Research Compass
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed font-semibold">
            Science-backed insights driving every UpScroll feature to keep your focus active.
          </p>
        </header>

        {/* Filter Controls Bar */}
        <div className="reveal-on-scroll flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto mb-6">
          {/* Resource Type Segmented Toggle */}
          <div className="flex bg-slate-100/80 dark:bg-zinc-800/40 p-1.5 rounded-full border border-slate-200/50 dark:border-zinc-700/35 w-fit shrink-0">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'article', label: 'Articles' },
              { id: 'video', label: 'Videos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${selectedType === tab.id
                  ? 'bg-white dark:bg-zinc-950 text-indigo-600 dark:text-cyan-400 shadow-sm border border-slate-200/20 dark:border-zinc-800/50'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white border border-transparent'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search focus research, articles, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-full border border-slate-200/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:border-indigo-600 dark:focus:border-cyan-400 focus:ring-1 focus:ring-indigo-600 dark:focus:ring-cyan-400/50 transition-all duration-300 outline-none text-xs font-semibold shadow-sm backdrop-blur-md"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="reveal-on-scroll flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 cursor-pointer ${selectedCategory === cat
                ? 'bg-indigo-600 dark:bg-cyan-500 border-indigo-600 dark:border-cyan-500 text-white shadow-md shadow-indigo-600/10 dark:shadow-cyan-500/20'
                : 'bg-white/40 dark:bg-zinc-800/20 border-slate-200/60 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:border-indigo-600/40 dark:hover:border-cyan-500/40 hover:bg-white dark:hover:bg-zinc-800/40'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Multi-Column Grid Layout */}
        <div className={`grid gap-8 ${selectedType === 'all' ? 'md:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto w-full'}`}>
          {/* Left Column: Articles */}
          {(selectedType === 'all' || selectedType === 'article') && (
            <div className="reveal-on-scroll glass-panel rounded-[2.5rem] border border-slate-200/50 dark:border-zinc-800/80 p-8 shadow-lg backdrop-blur-md flex flex-col gap-6 w-full">
              <div className="border-b border-slate-200/40 dark:border-zinc-800/40 pb-4">
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />
                  Research & Insights
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-black uppercase tracking-wider mt-1">Neuroscience backing our approach</p>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-full rounded-[1.8rem] border border-slate-200/40 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-800/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/50 dark:hover:border-cyan-500/50 hover:bg-white/80 dark:hover:bg-zinc-800/30 cursor-pointer relative"
                    >
                      {/* {article.featured && (
                        <div className="absolute top-4 right-4 bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-500/25 select-none">
                          ⭐ Featured
                        </div>
                      )} */}

                      <div className="space-y-3">
                        <span className="inline-block bg-slate-100 dark:bg-zinc-900/60 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 px-2 py-0.5 rounded border border-slate-200/30 dark:border-zinc-700/20">
                          {article.category}
                        </span>

                        <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors pr-16 leading-snug">
                          {article.title}
                        </h4>

                        <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-black uppercase tracking-wider">
                          {article.author} • {article.organization}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-semibold">
                          {article.description}
                        </p>

                        <div className="pt-3.5 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/65 text-[9px] font-black tracking-widest text-slate-400 dark:text-zinc-500 uppercase">
                          <div className="flex items-center gap-2">
                            <span>{article.year}</span>
                            <span>•</span>
                            <span>{article.readingTime}</span>
                          </div>
                          <div className="flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <span>Read Link</span>
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-16 text-slate-400 dark:text-zinc-500 font-black uppercase tracking-widest text-xs border border-dashed border-slate-200 dark:border-zinc-800/60 rounded-3xl p-8 bg-white/10 dark:bg-zinc-900/10">
                    No articles match your search criteria.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Column: Videos */}
          {(selectedType === 'all' || selectedType === 'video') && (
            <div className="reveal-on-scroll glass-panel rounded-[2.5rem] border border-slate-200/50 dark:border-zinc-800/80 p-8 shadow-lg backdrop-blur-md flex flex-col gap-6 w-full">
              <div className="border-b border-slate-200/40 dark:border-zinc-800/40 pb-4">
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight flex items-center gap-2">
                  <Play className="h-5 w-5 fill-indigo-600 text-indigo-600 dark:fill-cyan-400 dark:text-cyan-400" />
                  Video Learning Queue
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-black uppercase tracking-wider mt-1">Bite-sized neuroscience</p>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-full rounded-[1.8rem] border border-slate-200/40 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-800/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/50 dark:hover:border-cyan-500/50 hover:bg-white/80 dark:hover:bg-zinc-800/30 cursor-pointer relative"
                    >
                      {video.featured && (
                        <div className="absolute top-4 right-4 bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-500/25 select-none z-10">
                          ⭐ Featured
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Video Thumbnail */}
                        {video.thumbnail && (
                          <div className="relative w-full sm:w-28 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200/30 dark:border-zinc-800/50 shrink-0 group-hover:scale-[1.02] transition-transform duration-300 self-start">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                              <div className="rounded-full bg-white/95 dark:bg-zinc-950/95 p-1.5 text-indigo-600 dark:text-cyan-400 shadow-md">
                                <Play className="h-3.5 w-3.5 fill-indigo-600 dark:fill-cyan-400" />
                              </div>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/85 text-white text-[8px] font-black tracking-widest px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Clock className="h-2 w-2" />
                              {video.duration}
                            </div>
                          </div>
                        )}

                        <div className="flex-1 text-left space-y-2">
                          <span className="inline-block bg-slate-100 dark:bg-zinc-900/60 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 px-2 py-0.5 rounded border border-slate-200/30 dark:border-zinc-700/20">
                            {video.category}
                          </span>

                          <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors leading-snug pr-16">
                            {video.title}
                          </h4>

                          <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-black uppercase tracking-wider">
                            {video.creator} • {video.organization}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-semibold">
                            {video.description}
                          </p>

                          <div className="pt-3.5 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/65 text-[9px] font-black tracking-widest text-slate-400 dark:text-zinc-500 uppercase">
                            <span>{video.year}</span>
                            <div className="flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              <span>Watch Link</span>
                              <ExternalLink className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-16 text-slate-400 dark:text-zinc-500 font-black uppercase tracking-widest text-xs border border-dashed border-slate-200 dark:border-zinc-800/60 rounded-3xl p-8 bg-white/10 dark:bg-zinc-900/10">
                    No videos match your search criteria.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
