import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const DISPLAY_FONT = "'Big Shoulders Display', sans-serif";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 bg-[#090909] overflow-hidden text-white selection:bg-[#FF5B3D] selection:text-white">
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70vw 60vh at 50% 50%, rgba(255,91,61,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Background Grid Texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Subtle Faded Oversized "404" in the Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          className="font-black tracking-tighter leading-none"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: 'clamp(12rem, 38vw, 38rem)',
            WebkitTextStroke: '2px rgba(255,255,255,0.06)',
            color: 'transparent',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          404
        </motion.span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Animated Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.05]"
            style={{ fontFamily: DISPLAY_FONT }}
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            THIS PAGE NEVER MADE IT TO PRODUCTION.
          </motion.h1>
        </div>

        {/* Small Paragraph */}
        <motion.p
          className="text-[#9E9E9E] text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The page you're looking for doesn't exist, has been moved, or was never designed.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="px-7 py-4 bg-[#FF5B3D] hover:bg-[#ff7b63] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-[#FF5B3D]/20 focus:outline-none focus:ring-2 focus:ring-[#FF5B3D]/60 cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </motion.button>

          <motion.button
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                document.getElementById('publicity')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="group px-7 py-4 bg-[#171717] border border-white/15 hover:border-[#FF5B3D] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF5B3D]/60 cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-[#FF5B3D] transition-colors" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
export default NotFound;
