import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const email = "marchelinokurniawan321@gmail.com"; // Ganti dengan email asli jika ada

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mzbnwgvw", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-transparent border border-[#E5E7EB] dark:border-[#1F2937] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-slate-800 dark:focus:border-slate-300 transition-colors duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-16 bg-white dark:bg-transparent transition-colors duration-300 w-full relative z-10 overflow-hidden">
      <motion.div 
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-wide text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Feel free to reach out directly via email or the form below.</p>
        </motion.div>
        
        {/* Quick Copy Email */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-12">
          <div className="relative flex items-center gap-3 bg-gray-50/50 dark:bg-slate-900/30 border border-gray-200 dark:border-gray-800 px-5 py-2.5 rounded-full transition-colors duration-300">
            <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{email}</span>
            <div className="relative flex items-center">
              <button 
                onClick={handleCopy}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300 focus:outline-none group"
                title="Copy Email"
              >
                {copied ? <FiCheck className="text-green-500" /> : <FiCopy className="group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />}
              </button>
              
              <AnimatePresence>
                {copied && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-medium px-3 py-1.5 rounded shadow-lg pointer-events-none whitespace-nowrap"
                  >
                    Copied to Clipboard! ✨
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <input 
                name="name" 
                required 
                type="text" 
                placeholder="Name" 
                className={inputClasses} 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input 
                name="email" 
                required 
                type="email" 
                placeholder="Email Address" 
                className={inputClasses} 
              />
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants}>
            <textarea 
              name="message" 
              required 
              rows="5" 
              placeholder="Your message..." 
              className={`${inputClasses} resize-none`}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className="group relative w-full bg-gray-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium py-3.5 rounded-lg transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2 text-green-400 dark:text-green-600"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Sent Successfully!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;