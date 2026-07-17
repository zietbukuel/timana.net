import React from 'react';
import { FaGamepad, FaCar } from 'react-icons/fa';

export default function FunFactsSection({ funBgImage }) {
  return (
    <section
      className="w-full py-4 px-2 md:py-10 md:px-5 bg-cover bg-center overflow-hidden flex justify-center fun-facts"
      style={{ backgroundImage: `url(${funBgImage || '/img/fun-bg.jpg'})` }}
    >
      <ul className="flex justify-between w-full md:w-10/12 max-w-6xl list-none p-0 m-0">
        <li className="w-[20%] text-center text-white py-2 border-r-2 border-white my-8 flex flex-col justify-center items-center">
          <h3 className="!font-serif text-[18px] md:text-[28px] lg:text-[40px] font-normal m-0 leading-none">30+</h3>
          <h5 className="font-sans text-[6px] md:text-[12px] lg:text-[13px] uppercase tracking-wider mt-2.5 opacity-80">Happy Clients</h5>
        </li>
        <li className="w-[20%] text-center text-white py-2 border-r-2 border-white my-8 flex flex-col justify-center items-center">
          <h3 className="!font-serif text-[18px] md:text-[28px] lg:text-[40px] font-normal m-0 leading-none flex items-center justify-center h-[18px] md:h-[28px] lg:h-[40px]">
            <FaGamepad className="w-[18px] h-[18px] md:w-[28px] md:h-[28px] lg:w-[40px] lg:h-[40px]" />
          </h3>
          <h5 className="font-sans text-[6px] md:text-[12px] lg:text-[13px] uppercase tracking-wider mt-2.5 opacity-80">Gamer</h5>
        </li>
        <li className="w-[20%] text-center text-white py-2 border-r-2 border-white my-8 flex flex-col justify-center items-center">
          <h3 className="!font-serif text-[18px] md:text-[28px] lg:text-[40px] font-normal m-0 leading-none">40+</h3>
          <h5 className="font-sans text-[6px] md:text-[12px] lg:text-[13px] uppercase tracking-wider mt-2.5 opacity-80">Projects Done</h5>
        </li>
        <li className="w-[20%] text-center text-white py-2 border-r-2 border-white my-8 flex flex-col justify-center items-center">
          <h3 className="!font-serif text-[18px] md:text-[28px] lg:text-[40px] font-normal m-0 leading-none flex items-center justify-center h-[18px] md:h-[28px] lg:h-[40px]">
            <FaCar className="w-[18px] h-[18px] md:w-[28px] md:h-[28px] lg:w-[40px] lg:h-[40px]" />
          </h3>
          <h5 className="font-sans text-[6px] md:text-[12px] lg:text-[13px] uppercase tracking-wider mt-2.5 opacity-80">Car Enthusiast</h5>
        </li>
        <li className="w-[20%] text-center text-white py-2 border-r-0 my-8 flex flex-col justify-center items-center">
          <h3 className="!font-serif text-[18px] md:text-[28px] lg:text-[40px] font-normal m-0 leading-none">200+</h3>
          <h5 className="font-sans text-[6px] md:text-[12px] lg:text-[13px] uppercase tracking-wider mt-2.5 opacity-80">Coffee Cups</h5>
        </li>
      </ul>
    </section>
  );
}
