import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import TestimonialSlider from './TestimonialSlider';
import FunFactsSection from './FunFactsSection';
import Footer from './Footer';
import PortfolioFilters from './PortfolioFilters';

export default function PortfolioSection({ projectCategories = [], projects = [], testimonials = [] }) {
  const [filter, setFilter] = useState('all');
  const [displayedFilter, setDisplayedFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setIsTransitioning(true);

    setTimeout(() => {
      setDisplayedFilter(newFilter);
      setIsTransitioning(false);
    }, 250); // 250ms matches transition duration
  };

  const filteredItems = displayedFilter === 'all'
    ? projects
    : projects.filter(item => item.categories.includes(displayedFilter));

  return (
    <div className="w-full select-text flex flex-col items-center">
      {/* 1. Portfolio Grid Section (Off-white #f9f9f9 background) */}
      <section className="w-full bg-[#f9f9f9] py-12 md:py-16 flex flex-col items-center">

        {/* Category filters using flat sharp buttons */}
        <PortfolioFilters activeFilter={filter} onFilterChange={handleFilterChange} filterCategories={projectCategories} />

        {/* WIDER Grid Items (w-full) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-11/12 md:w-[80%] mx-auto relative z-10">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveProject(item)}
              className={`group relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-[#3f3f46] to-[#05abe0] shadow-md hover:shadow-xl cursor-pointer transform transition-all duration-250 ease-in-out ${isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
            >
              <img
                src={item.thumb}
                alt={item.part1 + ' ' + item.part2}
                className="w-[calc(100%+60px)] max-w-none h-full object-cover transition-all duration-350 -translate-x-[30px] opacity-90 group-hover:translate-x-0 group-hover:opacity-40"
              />

              {/* Semi-transparent dark overlay (60% black) in default state, fades out on hover to reveal roxy gradient */}
              <div className="absolute inset-0 bg-black/60 z-10 transition-opacity duration-350 group-hover:opacity-0" />

              {/* Inner thin white border box inside the card on hover */}
              <div className="absolute inset-[25px] border border-white opacity-0 -translate-x-[20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-350 pointer-events-none z-20" />

              {/* Roxy hover captions */}
              <div className="absolute inset-0 p-8 flex flex-col justify-start z-10 text-left pointer-events-none">
                <h2 className="text-white text-xl sm:text-3xl font-sans uppercase tracking-wider mb-1.5 pt-[22%] pl-1.5 leading-snug">
                  {item.isPart1Bold ? (
                    <>
                      <span className="font-extrabold">{item.part1}</span> {item.part2}
                    </>
                  ) : (
                    <>
                      {item.part1} <span className="font-extrabold">{item.part2}</span>
                    </>
                  )}
                </h2>

                <p className="text-white text-[14px] font-sans tracking-wide pl-1.5 opacity-0 -translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-350 delay-75 leading-relaxed uppercase">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Testimonials Section (Light gray #f2f2f2 background) with 50% width split background overlay */}
      <section className="w-full bg-[#f2f2f2] py-12 md:py-16 flex flex-col items-center relative overflow-hidden">
        {/* Over div: 50% width overlay on the right with 4% black opacity */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-black/4 z-0 pointer-events-none" />

        {/* Smile visual divider icon */}
        <div
          className="relative z-10 w-[52px] h-[52px] mt-8 bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/icons/smile.svg')" }}
        />
        <h2 className="relative z-10 text-[#3f3f46] font-serif italic text-2xl mt-1.5 mb-2 px-5">
          Some of my happy clients
        </h2>
        <div className="relative z-10 w-full">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* 3. Fun Facts Section */}
      <FunFactsSection />

      {/* 4. Footer */}
      <Footer />

      {/* DaisyUI Dialog Modal (Light Themed) */}
      {activeProject && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl bg-white text-gray-800 p-0 overflow-hidden relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-20 text-white bg-black/40 hover:bg-black/70 border-none"
              aria-label="Close modal"
            >
              ✕
            </button>

            <img
              src={activeProject.large}
              alt={activeProject.part1 + ' ' + activeProject.part2}
              className="w-full h-auto object-cover max-h-[430px] border-b border-gray-100"
            />

            <div className="p-6 md:p-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 uppercase tracking-wider">
                {activeProject.part1} {activeProject.part2}
              </h2>
              <div className="badge bg-[#50626C] border-[#50626C] text-white font-bold px-3 py-2.5 text-xs uppercase tracking-widest">
                {activeProject.subtitle}
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {activeProject.desc}
              </p>

              {activeProject.tech && (
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  <span class="text-gray-900 font-bold">Technical Execution:</span> {activeProject.tech}
                </p>
              )}

              {activeProject.url && (
                <div className="pt-6">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center border-2 border-[#3f3f46] text-[#3f3f46] hover:!text-white bg-transparent hover:bg-[#3f3f46] transition-all duration-300 rounded-none w-full max-w-[235px] mx-auto py-2.5 text-center uppercase text-sm font-semibold tracking-wider hover:no-underline select-none"
                  >
                    <span className="group-hover:text-white transition-colors duration-300">{activeProject.urlText}</span>
                    <span className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2.5 transition-all duration-300 ease-in-out overflow-hidden flex items-center shrink-0">
                      <FaPaperPlane className="w-3.5 h-3.5 text-white" />
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-xs">
            <button onClick={() => setActiveProject(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
