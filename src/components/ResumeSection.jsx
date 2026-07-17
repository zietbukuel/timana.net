import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import Footer from './Footer';
import SkillCircle from './SkillCircle';

export default function ResumeSection({ skills = [], education = [], employment = [], recognition = [] }) {


  return (
    <div className="w-full select-text flex flex-col items-center">
      {/* 1. Resume Timelines Section (Light gray #f2f2f2 background) */}
      <section className="w-full bg-[#f2f2f2] py-12 md:py-16 relative overflow-hidden flex flex-col items-center text-center">
        {/* Over div: 50% width overlay on the right with 4% black opacity */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-black/4 z-0 pointer-events-none" />

        {/* Cap visual divider icon */}
        <div
          className="relative z-10 w-[52px] h-[52px] mt-8 bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/icons/grad-cap.svg')" }}
        />

        <div className="relative z-10 flex flex-row w-full max-w-6xl px-4 md:px-12 mt-10 text-left gap-4 md:gap-0">
          {/* Education Timeline (Left Side - Right Aligned) */}
          <div className="w-1/2 text-right pr-4 md:pr-12 pl-2 md:pl-24">
            <h2 className="text-[#3f3f46] text-sm sm:text-lg uppercase tracking-wider mb-8 text-right border-b border-black/5 pb-3">
              - Education -
            </h2>
            <ul className="list-none p-0 m-0 space-y-8">
              {education.map((edu, idx) => (
                <li key={idx} className="block">
                  <h3 className="text-[#636368] !font-sans font-bold text-lg uppercase tracking-wider mb-1 leading-snug">
                    {edu.school}
                  </h3>
                  <h4 className="text-[#3f3f46] font-serif text-sm italic mb-1">
                    {edu.degree}
                  </h4>
                  <span className="text-[#0ed4c8] text-[13px] tracking-wider block mb-2">
                    {edu.period}
                  </span>
                  <p className="text-[#838c95] font-sans text-sm leading-[24px]">
                    {edu.field}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Employment Timeline (Right Side - Left Aligned) */}
          <div className="w-1/2 text-left pl-4 md:pl-12 pr-2 md:pr-24">
            <h2 className="text-[#3f3f46] text-sm sm:text-lg uppercase tracking-wider mb-8 text-left border-b border-black/5 pb-3 pt-0">
              - Employment -
            </h2>
            <ul className="list-none p-0 m-0 space-y-8">
              {employment.map((emp, idx) => (
                <li key={idx} className="block">
                  <h3 className="text-[#636368] !font-sans font-bold text-lg uppercase tracking-wider mb-1 leading-snug">
                    {emp.company}
                  </h3>
                  <h4 className="text-[#3f3f46] font-serif text-sm italic mb-1">
                    {emp.role}
                  </h4>
                  <span className="text-[#0ed4c8] text-[13px] tracking-wider block mb-2">
                    {emp.period}
                  </span>
                  <p className="text-[#838c95] font-sans text-sm leading-[24px]">
                    {emp.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Skills Section (Teal bg-[#0ed4c8] background) */}
      <section className="w-full bg-[#0ed4c8] py-12 md:py-16 relative overflow-hidden flex flex-col items-center text-center">
        {/* Over div: 50% width overlay on the right with 4% black opacity */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-black/4 z-0 pointer-events-none" />

        {/* Ninja visual divider icon */}
        <div
          className="relative z-10 w-[52px] h-[52px] mt-8 bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/icons/ninja.svg')" }}
        />
        <h2 className="relative z-10 text-white font-serif italic text-2xl mt-1.5 mb-12 px-5">
          My Key Skills
        </h2>

        {/* Skills Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-y-20 md:gap-y-24 gap-x-12 md:gap-x-20 max-w-6xl w-full px-6 md:px-12 justify-items-center mt-10">
          {skills.map((skill, idx) => (
            <SkillCircle key={idx} name={skill.name} value={skill.value} />
          ))}
        </div>
      </section>

      {/* 3. Recognition Section (Split Columns #bg-2.jpg + #f9f9f9) */}
      <section className="w-full flex flex-col md:flex-row items-stretch min-h-[500px]">
        {/* Left Column (rec-desc) */}
        <div
          className="w-full md:w-1/2 relative bg-cover bg-center overflow-hidden flex flex-col justify-center px-8 md:px-20 py-16"
          style={{ backgroundImage: "url('/img/bg-2.jpg')" }}
        >
          {/* Overlay to dim background */}
          <div className="absolute inset-0 bg-black/70 z-0" />

          <h2 className="relative z-10 text-white font-bold text-[32px] uppercase tracking-wider mb-6">
            Recognition
          </h2>
          <p className="relative z-10 text-white font-sans text-lg leading-[24px]">
            I believe in demystifying technology so that anyone can leverage it. Over the years, I have been invited to speak at university conferences, helping entrepreneurs and beginners understand the digital landscape. My goal is always to break down complex tech options into clear, practical roadmaps that empower people to build their first online presence and grow their businesses.
          </p>
        </div>

        {/* Right Column (rec-list) */}
        <div className="w-full md:w-1/2 bg-[#f9f9f9] flex flex-col justify-center px-8 md:px-16 py-16 relative">
          <ul className="list-none p-0 m-0 space-y-8 relative z-10">
            {recognition.map((rec, idx) => (
              <li key={idx} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#0ed4c8]/10 rounded-full flex items-center justify-center text-[#0ed4c8] shrink-0 shadow-sm border border-[#0ed4c8]/20">
                  <FaMicrophone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#636368] !font-sans font-bold text-lg uppercase tracking-wider mb-1">
                    {rec.title}
                  </h3>
                  <h5 className="text-[#0ed4c8] text-sm uppercase tracking-wider block mb-1">
                    {rec.role}
                  </h5>
                  <h4 className="text-[#838c95] font-serif text-sm">
                    {rec.location}
                  </h4>
                  <p className="font-sans text-sm leading-[24px]">
                    {rec.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
