import React, { useState, useEffect } from 'react';
import { FaUser, FaFileAlt, FaBriefcase, FaPaperPlane, FaTimes, FaArrowDown } from 'react-icons/fa';
import ProfileSection from './ProfileSection';
import ResumeSection from './ResumeSection';
import PortfolioSection from './PortfolioSection';
import ContactSection from './ContactSection';

const tabPaths = ['profile', 'resume', 'portfolio', 'contact'];

export default function PageContainer({
  initialActivePanel,
  projectCategories = [],
  projects = [],
  education = [],
  employment = [],
  testimonials = [],
  skills = [],
  recognition = [],
  meImage,
  funBgImage,
  bg2Image,
  bg4Image,
  panelImages
}) {
  const panels = [
    {
      id: 0,
      title: 'Profile',
      menuDesc: 'A Brief About Me...',
      icon: FaUser,
      bgColorClass: 'bg-brand-profile',
      bgSmall: panelImages?.profile?.small || '/img/img-1-small.jpg',
      bgLarge: panelImages?.profile?.large || '/img/img-1-large.jpg',
      Component: ProfileSection
    },
    {
      id: 1,
      title: 'Resume',
      menuDesc: 'My Academic Qualifications...',
      icon: FaFileAlt,
      bgColorClass: 'bg-brand-resume',
      bgSmall: panelImages?.resume?.small || '/img/img-2-small.jpg',
      bgLarge: panelImages?.resume?.large || '/img/img-2-large.jpg',
      Component: ResumeSection
    },
    {
      id: 2,
      title: 'Portfolio',
      menuDesc: 'Some of My Work...',
      icon: FaBriefcase,
      bgColorClass: 'bg-brand-portfolio',
      bgSmall: panelImages?.portfolio?.small || '/img/img-3-small.jpg',
      bgLarge: panelImages?.portfolio?.large || '/img/img-3-large.jpg',
      Component: PortfolioSection
    },
    {
      id: 3,
      title: 'Contact',
      menuDesc: 'Ways to Reach Me...',
      icon: FaPaperPlane,
      bgColorClass: 'bg-brand-contact',
      bgSmall: panelImages?.contact?.small || '/img/img-4-small.jpg',
      bgLarge: panelImages?.contact?.large || '/img/img-4-large.jpg',
      Component: ContactSection
    }
  ];

  const getPanelProps = (component) => {
    if (component === ResumeSection) {
      return { education, employment, skills, recognition, bg2Image };
    }
    if (component === PortfolioSection) {
      return { projectCategories, projects, testimonials, funBgImage };
    }
    if (component === ProfileSection) {
      return { meImage, bg4Image, funBgImage };
    }
    return {};
  };

  const initialIndex = initialActivePanel ? tabPaths.indexOf(initialActivePanel.toLowerCase()) : -1;
  const [activeTab, setActiveTab] = useState(initialIndex !== -1 ? initialIndex : null);
  const [isLoaded, setIsLoaded] = useState(initialIndex !== -1 ? true : false);
  const [loadedPanels, setLoadedPanels] = useState([
    initialIndex !== -1 ? true : false,
    initialIndex !== -1 ? true : false,
    initialIndex !== -1 ? true : false,
    initialIndex !== -1 ? true : false
  ]);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive media query tracker
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 1023px)');
    const listener = () => setIsMobile(media.matches);
    listener();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Sync loaded status of panels if one is pre-opened on mount
  useEffect(() => {
    if (initialIndex !== -1) {
      setIsLoaded(true);
      setLoadedPanels([true, true, true, true]);
    }
  }, [initialIndex]);

  // Preloader and staggered captions fly-in sequence
  useEffect(() => {
    if (initialIndex !== -1) return;
    const timer = setTimeout(() => {
      setIsLoaded(true);

      panels.forEach((panel, idx) => {
        setTimeout(() => {
          setLoadedPanels((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }, idx * 150);
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [initialIndex]);

  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
    if (typeof window !== 'undefined') {
      if (tabIndex === null) {
        window.history.pushState(null, '', '/');
      } else {
        const path = tabPaths[tabIndex];
        window.history.pushState(null, '', `/${path}/`);
      }
    }
  };

  // Browser Back/Forward buttons navigation listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      const index = tabPaths.indexOf(path);
      if (index !== -1) {
        setActiveTab(index);
      } else {
        setActiveTab(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handlePanelScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newOpacity = Math.max(0, 1 - scrollTop / 300);
    setScrollOpacity(newOpacity);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    changeTab(null);
    setScrollOpacity(1);
  };

  const handleScrollDown = (e) => {
    e.preventDefault();
    if (activeTab === null) return;
    const scrollContainer = document.getElementById(`scroll-content-${activeTab}`);
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const isAnyActive = activeTab !== null;

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#101524]">
      {/* 1. Preloader overlay */}
      {!isLoaded && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      {/* 2. Sliding Panels Container */}
      <div className="relative w-full h-full">
        {panels.map((panel) => {
          const Icon = panel.icon;
          const isActive = activeTab === panel.id;
          const isSibling = isAnyActive && activeTab !== panel.id;
          const isPanelLoaded = loadedPanels[panel.id];

          // Replicating position classes dynamically using Tailwind utility parameters
          let positionStyleClass = 'absolute transition-all duration-500 ease-in-out overflow-hidden ';

          if (isMobile) {
            // Mobile positions
            if (!isAnyActive) {
              if (panel.id === 0) positionStyleClass += 'top-0 h-1/4 w-full';
              if (panel.id === 1) positionStyleClass += 'top-[25vh] h-1/4 w-full';
              if (panel.id === 2) positionStyleClass += 'top-[50vh] h-1/4 w-full';
              if (panel.id === 3) positionStyleClass += 'top-[75vh] h-1/4 w-full';

              // Load animations
              positionStyleClass += isPanelLoaded ? ' translate-x-0 opacity-100' : ' -translate-x-full opacity-0';
            } else if (isActive) {
              positionStyleClass += 'top-0 left-0 w-full h-full z-20';
            } else {
              positionStyleClass += 'top-0 h-0 w-full opacity-0 pointer-events-none';
            }
          } else {
            // Desktop positions
            if (!isAnyActive) {
              if (panel.id === 0) positionStyleClass += 'left-0 w-1/4 h-full';
              if (panel.id === 1) positionStyleClass += 'left-[25vw] w-1/4 h-full';
              if (panel.id === 2) positionStyleClass += 'left-[50vw] w-1/4 h-full';
              if (panel.id === 3) positionStyleClass += 'left-[75vw] w-1/4 h-full';

              // Load animations
              positionStyleClass += isPanelLoaded ? ' translate-x-0 opacity-100' : ' -translate-x-[20px] opacity-0';
            } else if (isActive) {
              positionStyleClass += 'left-0 top-0 w-full h-full z-20';
            } else {
              positionStyleClass += 'md:w-0 w-full opacity-0 pointer-events-none';
            }
          }

          const bgImg = isMobile ? panel.bgSmall : panel.bgLarge;

          let bgImageClass = "absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none z-0 ";
          if (isSibling) {
            bgImageClass += "opacity-0 scale-95";
          } else if (isActive) {
            bgImageClass += "opacity-100 scale-100";
          } else {
            bgImageClass += "opacity-100 scale-110 group-hover/panel:scale-100";
          }

          let overlayClass = "absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none z-0 ";
          if (isActive) {
            overlayClass += "opacity-5";
          } else {
            overlayClass += "opacity-75";
            if (!isAnyActive) {
              overlayClass += " group-hover/panel:opacity-0";
            }
          }

          let menuDescClass = "font-serif italic text-sm text-white/70 mt-1.5 transition-opacity duration-500 px-6 ";
          if (isActive) {
            menuDescClass += "opacity-100";
          } else if (isAnyActive) {
            menuDescClass += "opacity-0 hidden";
          } else {
            menuDescClass += "opacity-0 group-hover/panel:opacity-100";
          }

          return (
            <section
              key={panel.id}
              onClick={() => !isAnyActive && changeTab(panel.id)}
              className={`group/panel ${positionStyleClass} ${panel.bgColorClass} ${!isAnyActive ? 'cursor-pointer' : ''}`}
            >
              {/* Parallax background image */}
              <div
                className={bgImageClass}
                style={{ backgroundImage: `url(${bgImg})` }}
              />
              {/* Overlay Layer to dim the background */}
              <div className={overlayClass} />

              {/* Header Title block */}
              <header
                style={{ opacity: isActive ? scrollOpacity : 1 }}
                className={`absolute left-0 z-10 w-full text-center transition-all duration-500 pointer-events-none select-none ${isActive
                  ? 'top-[45vh] -translate-y-1/2'
                  : 'top-1/2 -translate-y-1/2'
                  }`}
              >
                <div className="flex flex-col items-center">
                  {/* Icon with ripple animation effect on teaser hover */}
                  <span className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white transition-all duration-500 shadow-[0_0_0_25px_transparent] group-hover/panel:shadow-[0_0_0_0_rgba(255,255,255,0.15)] group-hover/panel:bg-white/20 pointer-events-none">
                    <Icon className="w-8 h-8" />
                  </span>
                  <h2 className="!font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-wider">
                    {panel.title}
                  </h2>
                  {/* Teaser Description displayed on hover */}
                  <p className={menuDescClass}>
                    {panel.menuDesc}
                  </p>
                </div>
              </header>

              {/* Expanded Content Scrollable Container */}
              {isActive && (
                <div
                  id={`scroll-content-${panel.id}`}
                  onScroll={handlePanelScroll}
                  className="absolute inset-0 w-full h-full overflow-y-auto z-10 select-text scroll-smooth"
                >
                  {/* Visual gap so content starts below the landing fold */}
                  <div className="w-full h-screen pointer-events-none" />
                  {/* Real content */}
                  <div className="relative z-10 bg-[#f2f2f2] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border-t border-[#ddd]">
                    <panel.Component {...getPanelProps(panel.Component)} />
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* 3. Global Close & Scroll Controls */}
      {isAnyActive && (
        <>
          {/* Close button */}
          <button
            onClick={handleClose}
            className="fixed top-8 right-8 z-50 btn btn-circle btn-ghost border border-white/25 text-white bg-black/40 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            title="Close Panel"
            aria-label="Close current panel"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Scroll Down button */}
          <button
            onClick={handleScrollDown}
            style={{ opacity: scrollOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 btn btn-circle btn-ghost border border-white/25 text-white bg-black/40 hover:bg-white/20 animate-bounce transition-all duration-300"
            title="Scroll Down"
            aria-label="Scroll down to content"
          >
            <FaArrowDown className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
