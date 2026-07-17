import React from 'react';
import { FaDrupal, FaWordpress, FaHtml5, FaCode, FaFileAlt } from 'react-icons/fa';
import FunFactsSection from './FunFactsSection';
import Footer from './Footer';

export default function ProfileSection() {
  return (
    <div className="w-full text-[#3f538e] select-text">
      {/* 1. About Me Block (f2f2f2 background on profile-image, bg-4.jpg background on bio) */}
      <section className="flex flex-col md:flex-row w-full bg-[#f2f2f2] about-me min-h-[550px] relative z-1">
        {/* Left Column: Avatar & Name block */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 py-10 md:pl-[8.33%] z-10">
          <div className="mb-4 p-2.5 w-[150px] pp-container">
            <img
              src="/img/me.jpg"
              alt="Juan Timaná"
              className="w-full h-auto rounded-full border-[5px] border-[#E8E8E8] shadow-[0_0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0_0_12px_rgba(0,0,0,0.1)]"
            />
          </div>
          <h2 className="text-[#50626C] !font-sans font-bold text-[54px] md:text-[72px] xl:text-[96px] tracking-[1px] leading-[0.8em] uppercase m-0 text-left flex flex-col">
            <span>Juan</span>
            <span>Timaná</span>
          </h2>
          <h3 className="text-[#4c4c50] !font-serif text-[14px] md:text-[16px] xl:text-[21px] leading-[1.8em] mt-2.5 pt-2.5 text-left relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[110px] before:h-[1px] before:bg-[#4c4c50]">
            Senior Full Stack & Systems Engineer
          </h3>
        </div>

        {/* Right Column: Bio text with bg-4.jpg background and 65% white overlay */}
        <div
          className="w-full md:w-1/2 relative min-h-[850px] md:min-h-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/bg-4.jpg')" }}
        >
          {/* Overlay color layer */}
          <div className="absolute inset-0 bg-white/65 z-0" />

          {/* Bio text container */}
          <div className="relative z-10 px-8 py-12 md:py-16 md:px-12 xl:py-[70px] xl:px-[30px] w-full md:w-11/12 lg:w-10/12 lg:pl-16 xl:max-w-5xl text-[#555] font-sans text-base tracking-[0.5px] leading-[22px] space-y-6">
            <h3 className="text-[#3f3f46] !font-sans text-xl uppercase leading-[28px]">
              Crafting Engineering Excellence Through Code & Systems
            </h3>
            <p>
              Welcome to my digital portfolio. I am a seasoned full-stack engineer with over a
              decade of experience building reliable web applications, managing backend logic, and
              structuring clean developer workflows.
            </p>
            <p>
              My specialty is creating software solutions that don't just look good—they work hard
              for your business operations. With deep expertise across frameworks like Laravel,
              Drupal, and WordPress, I handle projects with a focus on stability and performance.
              Whether you need an optimized custom application layout from scratch, a secure API
              integration, or specialized functionality that off-the-shelf tools can't provide,
              I've got you covered.
            </p>
            <p>
              What makes my approach different? I don't just write code—I solve business
              bottlenecks. Every application or system I build starts with understanding your
              specific infrastructure goals and scaling challenges. I've worked with dozens of
              clients over the years, delivering reliable systems on time and ensuring predictable
              development velocity.
            </p>
            <p className="font-bold text-gray-800">My technical toolkit includes:</p>
            <ul className="pl-6 space-y-2 list-disc text-[#4c4c50]">
              <li>Custom backend logic and framework development (Laravel, PHP, JavaScript)</li>
              <li>Advanced module, plugin, and theme engineering for Drupal and WordPress</li>
              <li>Server provisioning, environment orchestration, and automated deployment pipelines</li>
              <li>Modern frontend development with clean, responsive layouts and standards-compliant code</li>
            </ul>
            <p>
              I pay special attention to the details that matter—like making sure your architecture
              is secure, accessible to all users, and follows current web standards. The
              applications I build don't just run smoothly today; they're engineered cleanly so
              they are built to grow alongside your business.
            </p>
            <p>
              If you're looking for an engineer who can bring your technical vision to life and
              build for reliability, feel free to browse my portfolio to see the systems I've
              delivered. Let's talk about how we can build something extraordinary together.
            </p>

            {/* Buttons matching exactly the gray color #50626C with smooth CSS-based hovers */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:juan@timana.net"
                className="group relative flex items-center justify-center btn bg-[#50626C] border-[#50626C] hover:bg-white hover:text-[#50626C] hover:border-[#50626C] rounded-none text-xs uppercase px-12 py-3.5 font-bold transition-all duration-300 h-auto min-h-0 select-none !text-white hover:!text-[#50626C] overflow-hidden"
              >
                <span>Hire Me</span>
                <span className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-0 group-hover:right-6 group-hover:opacity-100 transition-all duration-300 ease-in-out flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-white group-hover:text-[#50626C] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center btn bg-[#50626C] border-[#50626C] hover:bg-white hover:text-[#50626C] hover:border-[#50626C] rounded-none text-xs uppercase px-12 py-3.5 font-bold transition-all duration-300 h-auto min-h-0 select-none !text-white hover:!text-[#50626C] overflow-hidden"
              >
                <span>Download Resume</span>
                <span className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-0 group-hover:right-6 group-hover:opacity-100 transition-all duration-300 ease-in-out flex items-center pointer-events-none">
                  <FaFileAlt className="w-4 h-4 text-white group-hover:text-[#50626C] transition-colors duration-300" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Section (Red background #ff6f6f) with 50% width split background overlay */}
      <section className="w-full bg-[#ff6f6f] px-6 py-12 md:px-12 md:py-20 flex flex-col items-center text-center relative overflow-hidden">
        {/* Over div: 50% width overlay on the right with 4% black opacity */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-black/4 z-0 pointer-events-none" />

        {/* Services visual divider icon */}
        <div
          className="relative z-10 w-[52px] h-[52px] mb-2 bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/icons/services-icon.svg')" }}
        />
        <h2 className="relative z-10 text-white !font-serif italic text-2xl mt-1.5 mb-16 px-5">
          Project you can offer
        </h2>

        {/* Services List Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full px-4 md:px-12">
          {/* Service Block 1 */}
          <div className="flex flex-col items-center text-center group">
            <span className="mb-6 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-[#ff6f6f] shadow-[0_0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:shadow-[0_0_0_12px_rgba(255,255,255,0.15)] cursor-pointer select-none">
              <FaDrupal className="w-8 h-8" />
            </span>
            <h3 className="text-white font-sans font-bold text-base uppercase tracking-wider mb-4">
              Drupal
            </h3>
            <p className="text-[#f9f9f9] font-sans text-sm leading-6 px-2.5">
              Custom module development, hook overrides, and site building. I focus on
              creating clean, maintainable backends for complex content management needs.
            </p>
          </div>

          {/* Service Block 2 */}
          <div className="flex flex-col items-center text-center group">
            <span className="mb-6 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-[#ff6f6f] shadow-[0_0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:shadow-[0_0_0_12px_rgba(255,255,255,0.15)] cursor-pointer select-none">
              <FaWordpress className="w-8 h-8" />
            </span>
            <h3 className="text-white font-sans font-bold text-base uppercase tracking-wider mb-4">
              WordPress
            </h3>
            <p className="text-[#f9f9f9] font-sans text-sm leading-6 px-2.5">
              Custom theme and extension development. I build production-ready setups from scratch
              using lightweight, object-oriented boilerplates instead of relying on bloated,
              off-the-shelf plugins.
            </p>
          </div>

          {/* Service Block 3 */}
          <div className="flex flex-col items-center text-center group">
            <span className="mb-6 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-[#ff6f6f] shadow-[0_0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:shadow-[0_0_0_12px_rgba(255,255,255,0.15)] cursor-pointer select-none">
              <FaHtml5 className="w-8 h-8" />
            </span>
            <h3 className="text-white font-sans font-bold text-base uppercase tracking-wider mb-4">
              Templates
            </h3>
            <p className="text-[#f9f9f9] font-sans text-sm leading-6 px-2.5">
              High-performance frontends. Turning architectural patterns and modern web standards
              into clean, accessible, and fast-loading user experiences.
            </p>
          </div>

          {/* Service Block 4 */}
          <div className="flex flex-col items-center text-center group">
            <span className="mb-6 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-[#ff6f6f] shadow-[0_0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:shadow-[0_0_0_12px_rgba(255,255,255,0.15)] cursor-pointer select-none">
              <FaCode className="w-8 h-8" />
            </span>
            <h3 className="text-white font-sans font-bold text-base uppercase tracking-wider mb-4">
              Custom Web Development
            </h3>
            <p className="text-[#f9f9f9] font-sans text-sm leading-6 px-2.5">
              Robust backend applications built natively on high-performance frameworks like
              Laravel, designed to scale with clean database modeling.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Fun Facts Section (parallax fun-bg.jpg background, inline-block items) */}
      <FunFactsSection />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
