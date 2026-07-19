import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "marchelino@example.com"; // Ganti dengan email asli jika ada

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-16 bg-white dark:bg-transparent transition-colors duration-300 w-full">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center tracking-wide text-gray-900 dark:text-white">Contact Me</h2>
        
        {/* Quick Copy Email */}
        <div className="flex flex-col items-center justify-center mb-10">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Feel free to reach out via email</p>
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-sm">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{email}</span>
            <div className="relative flex items-center">
              <button 
                onClick={handleCopy}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-600 dark:text-gray-300 focus:outline-none"
                title="Copy Email"
              >
                {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
              </button>
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-[10px] px-2 py-1 rounded shadow-md pointer-events-none animate-fade-in-out">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form action="https://formspree.io/f/mzbnwgvw" method="POST" className="space-y-4">
          <input 
            name="name" 
            required 
            type="text" 
            placeholder="Name" 
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors" 
          />
          <input 
            name="email" 
            required 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors" 
          />
          <textarea 
            name="message" 
            required 
            rows="5" 
            placeholder="Your message..." 
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors" 
          />
          <button 
            type="submit" 
            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;