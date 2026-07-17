import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "I'm grateful for collaborating with Juan on my web store. His expertise and dedication resulted in a remarkable shopping experience that exceeded my expectations. Juan's exceptional design skills and professionalism set him apart. I'm thrilled with the final outcome and highly recommend him for top-notch web development services.",
    author: "Jorge Quezada"
  },
  {
    quote: "I am thrilled with the custom web app created by Juan. His technical expertise and attention to detail resulted in an efficient and tailored solution for my business. From understanding my requirements to delivering a user-friendly interface, Juan showcased professionalism and commitment throughout the process. I highly recommend his services to anyone seeking a skilled web developer.",
    author: "Xavier Palma"
  },
  {
    quote: "Working with Juan to create my WordPress site has been a pleasure. His expertise and attention to detail have exceeded my expectations. The seamless functionality and captivating design truly showcase Juan's talent. His professionalism and dedication to delivering exceptional results are evident throughout the process. I highly recommend Juan for anyone in need of a skilled WordPress developer.",
    author: "Alice Cosmetic Ink Perú"
  }
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [dragShift, setDragShift] = useState(0);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const dragStart = useRef(null);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);

  // Autoplay timer
  useEffect(() => {
    if (isDraggingState) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isDraggingState]);

  const handleStart = (clientX) => {
    isDragging.current = true;
    setIsDraggingState(true);
    dragStart.current = clientX;
    dragOffset.current = 0;
  };

  const handleMove = (clientX) => {
    if (!isDragging.current || dragStart.current === null) return;
    const offset = clientX - dragStart.current;
    dragOffset.current = offset;
    setDragShift(offset);
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false);

    const threshold = 60; // 60px swipe threshold
    const offset = dragOffset.current;

    setDragShift(0);
    dragStart.current = null;
    dragOffset.current = 0;

    if (offset < -threshold) {
      // Swiped left -> Next slide
      setCurrent((prev) => (prev + 1) % testimonials.length);
    } else if (offset > threshold) {
      // Swiped right -> Previous slide
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Event handlers
  const onMouseDown = (e) => {
    // Avoid firing on details clicks or buttons
    if (e.button !== 0) return; // Left click only
    handleStart(e.clientX);
  };

  const onMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const onTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* Slides */}
      <div className="w-full text-center min-h-[180px] flex items-center justify-center overflow-hidden">
        {testimonials.map((item, index) => {
          const isActive = index === current;
          const style = isActive
            ? {
              transform: `translateX(${dragShift}px)`,
              transition: isDraggingState ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }
            : {};

          return (
            <div
              key={index}
              style={style}
              className={`transition-all duration-700 ease-in-out absolute w-full max-w-3xl flex flex-col items-center ${isActive
                ? 'opacity-100 translate-y-0 relative pointer-events-auto'
                : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
            >
              <blockquote className="text-[#3f3f46] text-base md:text-lg italic font-serif leading-relaxed max-w-2xl text-center mb-6 pointer-events-none">
                "{item.quote}"
              </blockquote>
              <cite className="text-[#3f3f46] font-bold not-italic uppercase tracking-widest text-sm md:text-base pointer-events-none">
                — {item.author}
              </cite>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="flex gap-2.5 mt-8 z-10">
        {testimonials.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={(e) => {
              e.stopPropagation(); // Avoid triggering drag parent events
              setCurrent(index);
            }}
            className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 cursor-pointer ${index === current
              ? 'bg-[#50626C] border-[#50626C] scale-110 shadow-md shadow-[#50626C]/30'
              : 'border-gray-300 bg-black/10 hover:bg-black/20'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
