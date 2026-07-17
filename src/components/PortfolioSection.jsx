import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import TestimonialSlider from './TestimonialSlider';
import FunFactsSection from './FunFactsSection';
import Footer from './Footer';
import PortfolioFilters from './PortfolioFilters';

const portfolioItems = [
  {
    id: 0,
    categories: ['category-2'],
    part1: 'Codexa',
    part2: 'Express',
    isPart1Bold: true,
    subtitle: 'Proprietary SaaS Architecture',
    thumb: '/img/portfolio/thumb/project_codexa_thumb.jpg',
    large: '/img/portfolio/project_codexa.jpg',
    desc: 'Architected and engineered the entire full-stack layout for a scalable, multi-tenant Software-as-a-Service platform from inception. The core engineering challenge was designing a robust backend architecture capable of isolation and handling heavy, concurrent database loads without impacting performance or site reliability.',
    tech: 'Built utilizing high-performance backend frameworks, secure RESTful APIs, and optimized database indexing. I provisioned and hardened the bare-metal and virtualized production servers, configuring reverse proxies, automated patch management, and automated deployment pipelines to maximize uptime.',
    url: 'https://codexa.pe',
    urlText: 'See Live'
  },
  {
    id: 1,
    categories: ['category-1'],
    part1: 'Alice',
    part2: 'Cosmetic Ink',
    isPart1Bold: true,
    subtitle: 'Cosmetic Ink Store',
    thumb: '/img/portfolio/thumb/project_alice_thumb.jpg',
    large: '/img/portfolio/project_alice.jpg',
    desc: 'A custom e-commerce solution built natively on Laravel tailored specifically for the Peruvian market constraints. Unlike traditional bloated e-commerce systems, this platform features an optimized, hyper-simplified checkout workflow designed to maximize conversion rates by stripping out unnecessary multi-step friction.',
    tech: 'Engineered using a clean repository pattern in Laravel, focusing on lightweight database queries and direct payment gateway integrations. While active business rollout is currently on hold, the core transactional architecture and database layers are fully functional.',
    url: null,
    urlText: null
  },
  {
    id: 2,
    categories: ['category-1'],
    part1: 'Nagata',
    part2: 'Racing',
    isPart1Bold: true,
    subtitle: 'Racing Team',
    thumb: '/img/portfolio/thumb/project_nagata_thumb.jpg',
    large: '/img/portfolio/project_nagata.jpg',
    desc: 'The complete web architecture and data hub for an automotive performance organization. Built to handle heavy localized traffic spikes during event rollouts, focusing on rendering speeds and reliable caching setups.',
    tech: 'Implemented a mobile-first responsive frontend tightly coupled with a highly optimized backend CMS layout. The site serves as the primary digital touchpoint for community orchestration, media delivery, and brand alignment.',
    url: 'https://nagataracing.com',
    urlText: 'See Live'
  },
  {
    id: 3,
    categories: ['category-2', 'category-4'],
    part1: 'Runcloud',
    part2: 'Integration',
    isPart1Bold: false,
    subtitle: 'Runcloud Infrastructure Automation Bridge',
    thumb: '/img/portfolio/thumb/project_runcloud_thumb.jpg',
    large: '/img/portfolio/project_runcloud.jpg',
    desc: 'A comprehensive system integration layer consisting of custom PHP libraries and a developer CLI tool. It acts as an automated, programmatic bridge between enterprise CMS platforms (WordPress/Drupal) and core hosting infrastructure via the Runcloud API.',
    tech: 'Built to give development teams direct control over server provisioning, automated staging site management, database replication, and system configurations directly from their development environments, eliminating manual server configuration bottlenecks.',
    url: null,
    urlText: null
  },
  {
    id: 4,
    categories: ['category-3'],
    part1: 'Open Source',
    part2: 'WordPress Starter Framework',
    isPart1Bold: true,
    subtitle: 'Open Source Software',
    thumb: '/img/portfolio/thumb/project_wptheme_thumb.jpg',
    large: '/img/portfolio/project_wptheme.jpg',
    desc: 'A completely sanitized, production-ready development framework published under the GPL license. Built independently to act as a highly optimized boilerplate utility to maximize scaffolding velocity while maintaining rigid engineering standards.',
    tech: 'Features strict data escaping protocols, a highly modular registry system for native Advanced Custom Fields (ACF) blocks, clean BEM-compliant styling architecture, and an automated shell script to instantly handle project re-namespacing.',
    url: 'https://github.com/zietbukuel/boilerplate-theme',
    urlText: 'View GitHub Repository'
  },
  {
    id: 5,
    categories: ['category-2', 'category-3', 'category-4'],
    part1: 'SSH',
    part2: 'Config Manager CLI Tool',
    isPart1Bold: true,
    subtitle: 'CLI Utility',
    thumb: '/img/portfolio/thumb/project_sshmngr_thumb.jpg',
    large: '/img/portfolio/project_sshmngr.jpg',
    desc: 'A lightweight, practical Python command-line utility engineered to solve a personal bottleneck: managing complex, expanding SSH configuration files across dozens of distinct client staging and production servers.',
    tech: 'Built with a focus on simplicity and rapid execution, this tool automates the validation, organization, and parsing of localized SSH configurations. It proves that simple, focused automation is always better than manual configuration management.',
    url: 'https://github.com/zietbukuel/ssh-config-manager',
    urlText: 'View GitHub Repository'
  },
  {
    id: 6,
    categories: ['category-4'],
    part1: 'Ansible',
    part2: 'Playbooks',
    isPart1Bold: false,
    subtitle: 'Automated Bare-Metal Deployment Infrastructure',
    thumb: '/img/portfolio/thumb/project_ansible_thumb.jpg',
    large: '/img/portfolio/project_ansible.jpg',
    desc: 'A personal suite of custom Ansible playbooks built independently to automate the provisioning, security hardening, and deployment management of virtualized and bare-metal Linux servers.',
    tech: 'Automates the entire process of deploying clean server stacks, configuring secure reverse proxies, setting up automated patch management, and maintaining isolated configurations across development, staging, and live production pipelines.',
    url: 'https://github.com/zietbukuel/ansible-playbooks',
    urlText: 'View GitHub Repository'
  },
  {
    id: 7,
    categories: ['category-3'],
    part1: 'A11y',
    part2: 'Shield',
    isPart1Bold: false,
    subtitle: 'Accessibility scanner for Wordpress websites',
    thumb: '/img/portfolio/thumb/project_a11yshield_thumb.jpg',
    large: '/img/portfolio/project_a11yshield.jpg',
    desc: 'An experimental, lightweight WordPress plugin designed to dynamically detect and shield websites from front-end accessibility violations. Instead of relying on heavy third-party overlays that degrade performance, a11y-shield works at the core level to sanitize and correct output markup, helping sites meet strict WCAG and ADA compliance standards without sacrificing site speed.',
    tech: 'Built to dynamically scan and repair contrast, labels, and aria attributes during output generation, providing a fast and clean solution.',
    url: 'https://github.com/zietbukuel/a11y-shield',
    urlText: 'View GitHub Repository'
  }
];

export default function PortfolioSection() {
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
    ? portfolioItems
    : portfolioItems.filter(item => item.categories.includes(displayedFilter));

  return (
    <div className="w-full select-text flex flex-col items-center">
      {/* 1. Portfolio Grid Section (Off-white #f9f9f9 background) */}
      <section className="w-full bg-[#f9f9f9] py-12 md:py-16 flex flex-col items-center">

        {/* Category filters using flat sharp buttons */}
        <PortfolioFilters activeFilter={filter} onFilterChange={handleFilterChange} />

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
          <TestimonialSlider />
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
