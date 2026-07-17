import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import Footer from './Footer';
import SkillCircle from './SkillCircle';

export default function ResumeSection() {
  const skills = [
    { name: 'Frontend & UI Architecture', value: 90 },
    { name: 'SCSS / Modern CSS', value: 95 },
    { name: 'JavaScript Ecosystem', value: 90 },
    { name: 'Core PHP', value: 90 },
    { name: 'Drupal System Building', value: 95 },
    { name: 'WordPress Engineering', value: 95 },
    { name: 'Laravel Ecosystem', value: 85 },
    { name: 'DevOps & CI/CD', value: 90 },
    { name: 'Linux & Server Admin', value: 95 },
  ];

  const education = [
    {
      school: 'Universidad Esan',
      degree: "Bachelor's degree",
      period: '2019-2024',
      field: 'Computer Engineering'
    },
    {
      school: 'ISIL - Instituto San Ignacio',
      degree: "Associate's degree",
      period: '2007-2011',
      field: 'Network Engineering'
    },
    {
      school: 'Sistemas UNI',
      degree: 'Linux Expert',
      period: '2005-2006',
      field: 'Computer Technology/Computer Systems Technology'
    },
    {
      school: 'Sistemas UNI',
      degree: 'Professional Web Designer',
      period: '2005-2006',
      field: 'Web/Multimedia Management and Webmaster'
    }
  ];

  const employment = [
    {
      company: 'Codexa S.A.C',
      role: 'Senior Full Stack & Systems Engineer',
      period: 'Jun 2025 - Present',
      description: 'Architected and engineered the core full-stack layout for a scalable, multi-tenant SaaS platform from inception, utilizing high-performance backend frameworks. My work focused on integrating intelligent local AI Agent orchestration workflows via secure API gateways while provisioning and hardening virtualized Linux production servers with automated deployment pipelines to ensure maximum system uptime and data layer optimization.'
    },
    {
      company: 'Plan Left, LLC',
      role: 'Senior Web Developer',
      period: 'Nov 2014 - Jul 2026',
      description: 'Architected and delivered scalable enterprise full-stack web applications using custom PHP, Drupal, and WordPress engineering. Spearheaded front-end performance optimizations and backend caching strategies to drastically reduce database friction, while mentoring junior engineering talent and establishing rigorous code review standards to elevate overall team velocity.'
    },
    {
      company: 'BettyBets',
      role: 'Full Stack Developer',
      period: 'Mar 2021 - Apr 2025',
      description: 'Architected and delivered scalable enterprise full-stack web applications using custom PHP, Drupal, and WordPress engineering. Spearheaded front-end performance optimizations and backend caching strategies to drastically reduce database friction, while mentoring junior engineering talent and establishing rigorous code review standards to elevate overall team velocity.'
    },
    {
      company: 'DRLP.net',
      role: 'Webmaster and Server Admin',
      period: 'Jan 2011 - Aug 2017',
      description: 'Developed custom web applications and structured responsive interfaces using PHP, JavaScript, and the PhalconPHP framework backend. Managed end-to-end Linux server system administration, handled data layer migrations to new platforms with minimal downtime, and optimized assets to sharply improve overall site speed and reliability.'
    },
    {
      company: 'SoftBrilliance S.A.C',
      role: 'Junior Web Developer',
      period: 'May 2014 - Nov 2014',
      description: 'Developed clean, responsive page layouts and navigation tools by utilizing HTML, CSS, and mobile-first design principles. Managed organized code repositories using Git to facilitate seamless team collaboration, while handling routine technical troubleshooting requests to resolve user problems and optimize layout bugs.'
    },
    {
      company: 'iMailUnlimited, LLC',
      role: 'Junior Systems Administrator & Developer',
      period: 'Jan 2012 - Apr 2014',
      description: 'Engineered a custom automated deployment application using PHP and CodeIgniter to orchestrate infrastructure provisioning, leveraging SSH bridges to automatically spin up Linux Containers (LXC) and deploy high-volume PowerMTA environments. Managed the end-to-end administration, configuration, and optimization of enterprise SMTP servers tailored for mass email marketing, while developing custom API integrations and frontend email templates to ensure deliverability and platform reliability.'
    },
    {
      company: 'Digital Networks del Perú S.A.C',
      role: 'Web Developer & Systems Administrator',
      period: 'Jan 2006 - Jan 2012',
      description: 'Collaborated directly with clients to define project requirements and deliver customized web and server solutions that addressed distinct business goals. Managed multiple development tracks simultaneously under tight deadlines, adapting quickly to changing parameters while maintaining high organization and strong attention to detail across infrastructure deployments.'
    }
  ];

  const recognition = [
    {
      title: 'E-Commerce Conference - UNMSM',
      role: 'Speaker',
      location: 'Lima, Perú',
      description: 'Introduced aspiring business owners to the world of online selling, breaking down simple platforms, secure payment options, and the essential steps to launching a successful digital storefront.'
    },
    {
      title: 'UI/UX Conference - UNMSM',
      role: 'Speaker',
      location: 'Lima, Perú',
      description: 'Shared how simple, clean layout choices and user-friendly design make a website feel trustworthy, helping beginners build digital pages that are easy for their customers to navigate.'
    },
    {
      title: 'SEO Conference - UNMSM',
      role: 'Speaker',
      location: 'Lima, Perú',
      description: 'Demystified how search engines work using simple, everyday language, showing local entrepreneurs how to structure their websites so customers in their area can easily find them online.'
    }
  ];

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
