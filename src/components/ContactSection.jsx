import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaPaperPlane, FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import MapComponent from './MapComponent';
import Footer from './Footer';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactMessage: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation matching the legacy constraints shown in screenshot
    const errors = [];
    if (!formData.contactName.trim()) {
      errors.push("Please enter your name.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim() || !emailRegex.test(formData.contactEmail)) {
      errors.push("Please enter a valid email address.");
    }

    if (formData.contactMessage.trim().length < 15) {
      errors.push("Your message should have at least 15 characters.");
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join('\n'));
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const bodyParams = new URLSearchParams();
      bodyParams.append('contactName', formData.contactName);
      bodyParams.append('contactEmail', formData.contactEmail);
      bodyParams.append('contactMessage', formData.contactMessage);

      const response = await fetch('/sendEmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyParams.toString()
      });

      const responseText = await response.text();

      if (response.ok && responseText.trim() === 'OK') {
        setStatus('success');
        setFormData({ contactName: '', contactEmail: '', contactMessage: '' });
      } else {
        const cleanMsg = responseText.replace(/<br\s*\/?>/gi, '\n');
        setErrorMsg(cleanMsg || 'Server error. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full select-text flex flex-col items-center">
      {/* Contact Section Content (Light gray bg-[#f2f2f2] background) */}
      <section className="w-full bg-[#f2f2f2] pt-12 md:pt-16 relative overflow-hidden flex flex-col items-center text-center">
        {/* Over div: 50% width overlay on the right with 4% black opacity */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-black/5 z-0 pointer-events-none" />

        {/* Mail visual divider icon */}
        <div
          className="relative z-10 w-[52px] h-[52px] mt-8 bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/icons/mail-icon.svg')" }}
        />
        <h2 className="relative z-10 text-[#3f3f46] font-serif italic text-2xl mt-1.5 mb-12 px-5">
          Drop me a line
        </h2>

        {/* 1. Form Container Card (60% white opacity) */}
        <div className="w-full max-w-4xl mx-auto bg-white/60 border border-[#d9d9da]/50 p-8 md:p-10 rounded-none mb-[70px] relative z-10 text-left">
          {status === 'success' && (
            <div className="bg-[#6BD57E] text-white text-[16px] text-center p-5 mb-5 font-sans leading-relaxed whitespace-pre-line rounded-none">
              Your message was sent successfully, thank you!
            </div>
          )}

          {status === 'error' && (
            <div className="bg-[#FF6F6F] text-white text-[16px] text-center p-5 mb-5 font-sans leading-relaxed whitespace-pre-line rounded-none">
              {errorMsg}
            </div>
          )}

          {status !== 'success' && (
            <form onSubmit={handleSubmit} className="w-full">
              {/* Name & Email horizontal row */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 w-full mb-4">
                <div className="w-full sm:w-[48%]">
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    placeholder="Name"
                    className="w-full bg-transparent border border-[#d9d9da] text-[#3f3f46] text-sm p-5 focus:bg-[#f4f4f4] focus:border-[#3f3f46] focus:outline-none transition-all duration-300 rounded-none placeholder-[#3f4047] font-sans"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full sm:w-[48%]">
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    placeholder="Email"
                    className="w-full bg-transparent border border-[#d9d9da] text-[#3f3f46] text-sm p-5 focus:bg-[#f4f4f4] focus:border-[#3f3f46] focus:outline-none transition-all duration-300 rounded-none placeholder-[#3f4047] font-sans"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="w-full mb-4">
                <textarea
                  id="contactMessage"
                  name="contactMessage"
                  placeholder="Message"
                  className="w-full bg-transparent border border-[#d9d9da] text-[#3f3f46] text-base p-5 h-44 focus:bg-[#f4f4f4] focus:border-[#3f3f46] focus:outline-none transition-all duration-300 rounded-none placeholder-[#3f4047] font-sans"
                  value={formData.contactMessage}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full bg-transparent border border-[#d9d9da] text-[#3f3f46] hover:border-[#3f3f46] text-base font-bold py-5 px-4 uppercase transition-all duration-300 rounded-none flex items-center justify-center gap-1.5 cursor-pointer"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="loading loading-spinner text-[#3f3f46] loading-md"></span>
                  ) : (
                    <>
                      SEND <span className="font-sans font-light">&gt;</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 2. Address & Map Split Columns (Spans full viewport width) */}
        <div className="w-full flex flex-col lg:flex-row items-stretch select-text relative z-10">

          {/* Left Column (Address Details & Socials with Coral BG) with 50% width split background overlay */}
          <div className="w-full lg:w-1/2 bg-[#fe7c60] py-24 px-8 flex flex-col items-center justify-center relative overflow-visible z-20 min-h-[400px]">
            {/* Over div: 50% width overlay on the right with 4% black opacity (mobile/tablet only) */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-black/4 z-0 pointer-events-none lg:hidden" />

            {/* Diagonal triangle overlap slice pointing down-right over the map column */}
            <div
              className="absolute top-0 bottom-0 left-full w-0 z-10 pointer-events-none hidden lg:block"
              style={{
                borderRight: '403px solid transparent',
                borderTop: '403px solid #F4775C',
              }}
            />

            {/* Details Horizontal Grid */}
            <div className="w-full max-w-2xl relative z-20">
              <ul className="grid grid-cols-1 md:grid-cols-3 w-full gap-8 md:gap-0 items-center justify-center text-center">
                {/* Location */}
                <li className="flex flex-col items-center justify-center md:border-r md:border-[#f3f3f3]/30 px-4">
                  <FaMapMarkerAlt className="w-8 h-8 text-white opacity-90 mb-3" />
                  <h4 className="text-[#f3f3f3] !font-sans text-[13px] font-bold uppercase tracking-widest mt-1.5 leading-snug">
                    Lima, Peru
                  </h4>
                </li>

                {/* Phone */}
                <li className="flex flex-col items-center justify-center md:border-r md:border-[#f3f3f3]/30 px-4">
                  <FaPhone className="w-8 h-8 text-white opacity-90 mb-3" />
                  <h4 className="text-[#f3f3f3] !font-sans text-[13px] font-bold uppercase tracking-widest mt-1.5 leading-snug">
                    +51 989 953 522
                  </h4>
                </li>

                {/* Email */}
                <li className="flex flex-col items-center justify-center px-4">
                  <FaPaperPlane className="w-8 h-8 text-white opacity-90 mb-3" />
                  <h4 className="text-[#f3f3f3] !font-sans text-[13px] font-bold uppercase tracking-widest mt-1.5 leading-snug">
                    juan@timana.net
                  </h4>
                </li>
              </ul>
            </div>

            {/* Social profiles circles */}
            <div className="pt-12 relative z-20">
              <ul className="flex items-center justify-center gap-4">
                <li>
                  <a
                    href="https://linkedin.com/in/juantimana"
                    target="_blank"
                    rel="noreferrer"
                    className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-[#fe7c60] hover:!text-[#fe7c60] hover:scale-105 transition-all duration-300 shadow-sm"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zietbukuel"
                    target="_blank"
                    rel="noreferrer"
                    className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-[#fe7c60] hover:!text-[#fe7c60] hover:scale-105 transition-all duration-300 shadow-sm"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/51989953522"
                    target="_blank"
                    rel="noreferrer"
                    className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-[#fe7c60] hover:!text-[#fe7c60] hover:scale-105 transition-all duration-300 shadow-sm"
                    aria-label="WhatsApp Contact"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (Interactive Leaflet Map) */}
          <div className="w-full lg:w-1/2 min-h-[400px] relative z-0">
            <MapComponent />
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
