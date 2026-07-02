import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowUpRight, Menu, X, Mail, Send,
  Instagram, Linkedin, Github, ExternalLink,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { GrainOverlay } from "./components/ui/grain-overlay";
import { SectionLabel } from "./components/ui/section-label";
import { AnimatedCounter } from "./components/ui/animated-counter";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA & CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DISPLAY_FONT = "'Big Shoulders Display', sans-serif";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Publicity Design", id: "publicity" },
  { label: "SM Campaigns", id: "campaigns" },
  { label: "Fan Arts", id: "fan-arts" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const SPECIALTIES = [
  "Film Publicity Designer",
  "Brand Identity",
  "Motion Graphics",
  "Graphic Designer",
];

const HERO_COLLAGE = [
  {
    img: "/hero/hero-section-1.jpg",
    style: { top: "18%", left: "57%", rotate: -5 },
    delay: 0,
  },
  {
    img: "/hero/hero-section-2.jpg",
    style: { top: "15%", left: "73%", rotate: 4 },
    delay: 0.15,
  },
  {
    img: "/hero/hero-section-3.jpg",
    style: { top: "54%", left: "61%", rotate: 3 },
    delay: 0.3,
  },
  {
    img: "/hero/hero-section-4.jpg",
    style: { top: "49%", left: "78%", rotate: -3 },
    delay: 0.45,
  },
];

const STATS = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 11, suffix: "+", label: "Feature Films" },
  { value: 4, suffix: "+", label: "Entertainment Brands" },
  { value: 100, suffix: "+", label: "Designs Delivered" },
];

export interface CampaignItem {
  id: number;
  title: string;
  year: string;
  img: string;
  description: string;
}

const PUBLICITY_CAMPAIGNS: CampaignItem[] = [
  {
    id: 1,
    title: "Game Changer",
    year: "2025",
    img: "/publicity/game-changer.jpg",
    description: "Milestone & Countdown Posters",
  },
  {
    id: 2,
    title: "Keedaa Cola",
    year: "2023",
    img: "/publicity/keedaa-cola.jpg",
    description: "Announcement Posters",
  },
  {
    id: 3,
    title: "Kaantha",
    year: "2025",
    img: "/publicity/kaantha-reel-thumb.jpg",
    description: "Reel Thumb & Google Ads Posters",
  },
  {
    id: 4,
    title: "Kishkindhapuri",
    year: "2025",
    img: "/publicity/kishkindhapuri-2dtg.jpg",
    description: "Countdown Posters",
  },
  {
    id: 5,
    title: "Don Bosko",
    year: "2026",
    img: "/publicity/don-bosko.jpg",
    description: "Onboarding Posters",
  },
  {
    id: 6,
    title: "Rathnam",
    year: "2024",
    img: "/publicity/rathnam-reel.jpg",
    description: "Reel Thumb & Public Rxn Videos",
  },
  {
    id: 7,
    title: "Makutam",
    year: "2026",
    img: "/publicity/makutam-hd.jpg",
    description: "Announcement, Wishes & Review Posters",
  },
  {
    id: 8,
    title: "Raakaasa",
    year: "2026",
    img: "/publicity/raakaasa.jpg",
    description: "Onboarding Posters",
  },
  {
    id: 9,
    title: "Gam Gam Ganesha",
    year: "2024",
    img: "/publicity/gam-gam-ganesha-spotify-backdrop.jpg",
    description: "Story Posts & Spotify Backdrops",
  },
  {
    id: 10,
    title: "17 YORC",
    year: "2024",
    img: "/publicity/17-yorc.jpg",
    description: "17 Years of Ram Charan in Indian Cinema Trend Poster Campaign",
  },
  {
    id: 11,
    title: "Con Kaun",
    year: "2025",
    img: "/publicity/con-kaun.jpg",
    description: "Concept Poster",
  },
  {
    id: 12,
    title: "Maya (2025)",
    year: "2025",
    img: "/publicity/maya-poster.jpg",
    description: "Concept Poster, PreLook & Motion Graphics",
  },
];

export interface SocialMediaCampaignItem {
  id: number;
  brand: string;
  type: string;
  images: string[];
}

const SOCIAL_MEDIA_CAMPAIGNS: SocialMediaCampaignItem[] = [
  {
    id: 1,
    brand: "Pink Elephant Pictures",
    type: "Film Production Company",
    images: [
      "/social-campaigns/pinkele1.jpg",
      "/social-campaigns/pinkele2.jpg",
      "/social-campaigns/pinkele3.jpg",
    ],
  },
  {
    id: 2,
    brand: "Loukya Entertainments",
    type: "Film Production Company",
    images: [
      "/social-campaigns/loukya1.jpg",
      "/social-campaigns/loukya2.jpg",
      "/social-campaigns/loukya3.jpg",
    ],
  },
  {
    id: 3,
    brand: "Sreemaya Entertainments",
    type: "Film Production Company",
    images: [
      "/social-campaigns/sreemaya1.jpg",
      "/social-campaigns/sreemaya2.jpg",
      "/social-campaigns/sreemaya3.jpg",
    ],
  },
  {
    id: 4,
    brand: "AMC Engineering College",
    type: "Educational Institution",
    images: [
      "/social-campaigns/amc1.jpg",
      "/social-campaigns/amc2.jpg",
      "/social-campaigns/amc3.jpg",
      "/social-campaigns/amc4.jpg",
    ],
  },
  {
    id: 5,
    brand: "London Kids Pre-School",
    type: "Educational Institution",
    images: [
      "/social-campaigns/london-kids1.jpg",
      "/social-campaigns/london-kids2.jpg",
      "/social-campaigns/london-kids3.jpg",
      "/social-campaigns/london-kids4.jpg",
      "/social-campaigns/london-kids5.jpg",
      "/social-campaigns/london-kids6.jpg",
    ],
  },
  {
    id: 6,
    brand: "Inovact Social",
    type: "Networking App",
    images: [
      "/social-campaigns/inovact1.jpg",
      "/social-campaigns/inovact2.jpg",
    ],
  },
];

export interface FanArtItem {
  id: number;
  title: string;
  img: string;
}

const FAN_ARTS: FanArtItem[] = [
  { id: 1, title: "Peddi", img: "/fan-arts/fanart1-peddi.jpg" },
  { id: 2, title: "Obsession", img: "/fan-arts/fanart2-obsession.jpg" },
  { id: 3, title: "Orange", img: "/fan-arts/fanart3-orange.jpg" },
  { id: 4, title: "Peddi 200 Days", img: "/fan-arts/fanart4-peddi200dtg.jpg" },
  { id: 5, title: "OG", img: "/fan-arts/fanart5-og.jpg" },
  { id: 6, title: "Coolie", img: "/fan-arts/fanart6-coolie.jpg" },
  { id: 7, title: "HHVM Wishes", img: "/fan-arts/fanart7-hhvmwishes.jpg" },
];

const SKILL_GROUPS = [
  {
    category: "Poster Design",
    description: "Movie publicity, branding and print creatives.",
    skills: [
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Lightroom",
      "Canva",
    ],
  },
  {
    category: "Motion Design",
    description: "Motion graphics and animation workflows.",
    skills: [
      "After Effects",
      "Adobe XD",
      "Figma",
    ],
  },
  {
    category: "Video Editing",
    description: "Editing cinematic promotional content.",
    skills: [
      "Premiere Pro",
      "CapCut",
    ],
  },
  {
    category: "Web Design",
    description: "Interactive interfaces and responsive experiences.",
    skills: [
      "Figma",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
    ],
  },
];

const EXPERIENCE_TIMELINE = [
  {
    company: "Ticket Factory",
    role: "Graphic Designer & Video Editor",
    period: "October 2023 – September 2025",
    descriptionPlaceholder: "Spearheaded visual publicity and digital marketing campaigns across theatrical film releases. Designed high-impact movie posters, motion graphics teasers, promotional social assets, and print collaterals while collaborating closely with film producers and marketing directors.",
    highlights: ["Film publicity", "Social campaigns", "Print design", "Marketing creatives", "Motion graphics"],
  },
  {
    company: "Inovact Social",
    role: "Graphic Design Intern",
    period: "September 2023 – March 2024",
    descriptionPlaceholder: "Developed core brand identities, digital promotional creatives, and social media campaign graphics. Collaborated with creative strategists to enhance audience engagement across multiple digital platforms.",
    highlights: ["Branding", "Digital campaigns", "Promotional creatives"],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOOKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVIGATION BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Nav() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const scrolled = scrollY > 50;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(9, 9, 9, 0.88)" : "rgba(15, 15, 15, 0.65)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,0.6)" : "0 4px 20px -5px rgba(0,0,0,0.35)",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="flex items-center"
        >
          <img
            src="/icons/ss-icon-photo.png"
            alt="Sushanth Sapare Logo"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`relative text-sm transition-colors duration-300 tracking-wide py-2 ${isActive ? "text-white font-bold" : "text-white/50 hover:text-white font-medium"
                  }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5B3D] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <button
          className="lg:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden border-t border-white/5"
            style={{ background: "rgba(9,9,9,0.98)", backdropFilter: "blur(20px)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-3xl font-black text-white flex items-center justify-between"
                  style={{ fontFamily: DISPLAY_FONT }}
                  onClick={(e) => scrollToSection(e, item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className={activeId === item.id ? "text-[#FF5B3D]" : "text-white"}>{item.label}</span>
                  {activeId === item.id && <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B3D]" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. HERO SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Hero() {
  const { x, y } = useMousePosition();
  const [specialty, setSpecialty] = useState(0);
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSpecialty((p) => (p + 1) % SPECIALTIES.length), 2600);
    return () => clearInterval(t);
  }, []);

  const rx = vp.w ? x / vp.w : 0.5;
  const ry = vp.h ? y / vp.h : 0.5;
  const mx = (rx - 0.5) * 30;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end pb-24 lg:pb-36 overflow-hidden bg-[#090909]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70vw 60vh at ${rx * 100}% ${ry * 100}%, rgba(255,91,61,0.07) 0%, transparent 65%)`,
          transition: "background 0.3s",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {HERO_COLLAGE.map((card, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#171717]"
            style={{
              ...card.style,
              width: "clamp(140px, 15vw, 230px)",
              rotate: card.style.rotate,
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              x: mx * (i % 2 === 0 ? 0.06 : -0.06),
              scale: 1,
            }}
            transition={{
              opacity: { delay: 0.8 + card.delay, duration: 0.7 },
              scale: { delay: 0.8 + card.delay, duration: 0.7 },
              y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
              x: { duration: 0.8, ease: "easeOut" },
            }}
          >
            <img
              src={card.img}
              alt="Portfolio work"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          className="inline-flex items-center gap-2.5 mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5B3D]" style={{ boxShadow: "0 0 8px #FF5B3D" }} />
          <span className="text-[#9E9E9E] text-xs tracking-[0.18em] uppercase font-semibold">
            Available for projects
          </span>
        </motion.div>

        <div className="overflow-hidden pt-5 -mt-5 pb-2 mb-2">
          <motion.h1
            className="font-black leading-[0.86] tracking-tighter text-white"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(3.5rem, 13vw, 13rem)",
            }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            SUSHANTH
          </motion.h1>
        </div>
        <div className="overflow-hidden pt-5 -mt-5 pb-2 mb-10 lg:mb-14">
          <motion.h1
            className="font-black leading-[0.86] tracking-tighter"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(3.5rem, 13vw, 13rem)",
              WebkitTextStroke: "2px rgba(255,255,255,0.22)",
              color: "transparent",
            }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            SAPARE
          </motion.h1>
        </div>

        <motion.div
          className="flex items-center gap-5 pt-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
        >
          <div className="w-1.5 h-8 bg-[#FF5B3D] rounded-full shadow-lg shadow-[#FF5B3D]/50" />
          <div className="overflow-hidden h-9 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={specialty}
                className="block text-xl sm:text-2xl font-bold tracking-wide text-white/90 leading-none"
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -32, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {SPECIALTIES[specialty]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. ABOUT SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="01 — ABOUT" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] max-w-[460px] rounded-2xl overflow-hidden bg-[#141414]">
              <img
                src="/about/about-section-photo.png"
                alt="Sushanth Sapare"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(0.85) contrast(1.1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/70 via-[#090909]/10 to-transparent" />
              <div className="absolute top-5 left-5 w-10 h-10 border-t-[3px] border-l-[3px] border-[#FF5B3D]" />
              <div className="absolute bottom-5 right-5 w-10 h-10 border-b-[3px] border-r-[3px] border-[#FF5B3D]" />
            </div>

            <motion.div
              className="absolute -bottom-4 lg:-right-8 right-0 bg-[#171717] border border-white/[0.08] rounded-2xl px-6 py-5"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="text-4xl font-black text-[#FF5B3D] leading-none"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                <AnimatedCounter value={2} suffix="+" />
              </div>
              <div className="text-xs text-[#9E9E9E] mt-1 whitespace-nowrap">Years of Excellence</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-black leading-[0.88] tracking-tight text-white mb-8"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              }}
            >
              CRAFTING<br />
              <span className="text-[#FF5B3D]">CINEMA</span><br />
              IN PIXELS
            </h2>

            <p className="text-[#9E9E9E] text-lg leading-relaxed mb-5">
              Creative Graphic Designer with 2+ years of experience specializing in film publicity, entertainment marketing, branding, and social media campaigns.
            </p>
            <p className="text-[#9E9E9E] text-lg leading-relaxed mb-9">
              Worked with production houses, entertainment brands, startups, and educational institutions — creating movie posters, film campaigns, brand identities, and motion graphics that tell stories before a word is read.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-l-2 border-[#FF5B3D]/25 pl-5">
                  <div
                    className="font-black text-white leading-none mb-1.5"
                    style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#9E9E9E] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. PUBLICITY CAMPAIGNS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PublicityCampaignCard: React.FC<{
  campaign: CampaignItem;
  index: number;
  onSelect: (campaign: CampaignItem) => void;
}> = ({ campaign, index, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#171717] group shadow-xl"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(campaign)}
      whileHover={{ y: -6 }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <motion.img
          src={campaign.img}
          alt={campaign.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
          <span className="text-xs font-bold text-[#FF5B3D] tracking-widest uppercase mb-1.5">
            {campaign.year}
          </span>
          <h3
            className="font-black text-white leading-tight mb-2"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.75rem, 3vw, 2.4rem)" }}
          >
            {campaign.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium line-clamp-2">
            {campaign.description}
          </p>
        </div>

        <motion.div
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

function PublicityCampaigns() {
  const [selected, setSelected] = useState<CampaignItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <section id="publicity" className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="02 — PUBLICITY CAMPAIGNS" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14 lg:mb-20">
          <div>
            <h2
              className="font-black leading-[0.88] tracking-tight text-white"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              FILM PUBLICITY<br />
              <span className="text-[#FF5B3D]">ARCHIVE</span>
            </h2>
          </div>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-md lg:self-end">
            A dedicated showcase of theatrical campaign posters and visual publicity designed for blockbuster feature films. Click any card to preview full details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PUBLICITY_CAMPAIGNS.map((campaign, i) => (
            <PublicityCampaignCard
              key={campaign.id}
              campaign={campaign}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Clean Fullscreen Modal Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setSelected(null)}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              className="relative z-10 flex flex-col items-center justify-center max-w-5xl max-h-[90vh] pointer-events-none"
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl max-h-[80vh] border border-white/10 pointer-events-auto">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-auto h-auto max-h-[80vh] object-contain block mx-auto"
                />
              </div>
              <h3
                className="font-black text-white mt-4 text-center tracking-wide pointer-events-auto"
                style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                {selected.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. SOCIAL MEDIA CAMPAIGNS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SocialMediaCampaigns() {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<{ [key: number]: number }>({});

  const nextSlide = (id: number, len: number) => {
    setActiveCarouselIndex(prev => ({ ...prev, [id]: ((prev[id] || 0) + 1) % len }));
  };

  const prevSlide = (id: number, len: number) => {
    setActiveCarouselIndex(prev => ({ ...prev, [id]: ((prev[id] || 0) - 1 + len) % len }));
  };

  return (
    <section id="campaigns" className="py-28 lg:py-44" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="03 — SOCIAL MEDIA CAMPAIGNS" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14 lg:mb-20">
          <div>
            <h2
              className="font-black leading-[0.88] tracking-tight text-white"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              SOCIAL MEDIA<br />
              <span className="text-[#FF5B3D]">CAMPAIGNS</span>
            </h2>
          </div>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-md lg:self-end">
            A curated showcase of comprehensive social media campaigns and digital strategies designed for leading film production houses, networking apps, and educational institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SOCIAL_MEDIA_CAMPAIGNS.map((brandItem, i) => {
            const currentSlide = activeCarouselIndex[brandItem.id] || 0;
            const activeImage = brandItem.images[currentSlide] || brandItem.images[0];

            return (
              <motion.div
                key={brandItem.id}
                className="bg-[#171717] border border-white/[0.08] rounded-3xl p-6 lg:p-8 flex flex-col justify-between group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ borderColor: "rgba(255, 91, 61, 0.35)" }}
              >
                <div>
                  {/* Clean Brand Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white leading-snug tracking-wide mb-1.5">
                      {brandItem.brand}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#FF5B3D]">
                      {brandItem.type}
                    </span>
                  </div>
                </div>

                {/* Interactive Carousel */}
                <div className="bg-[#101010] border border-white/[0.05] rounded-2xl p-4 overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white/50 tracking-wider uppercase">
                      Campaign Showcase
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => prevSlide(brandItem.id, brandItem.images.length)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-white/60 px-2 font-mono">
                        {currentSlide + 1} / {brandItem.images.length}
                      </span>
                      <button
                        onClick={() => nextSlide(brandItem.id, brandItem.images.length)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black group/carousel" style={{ aspectRatio: "4/5" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={activeImage}
                        alt={`${brandItem.brand} slide ${currentSlide + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/carousel:scale-1.05"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. FAN ARTS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FanArtCard: React.FC<{
  art: FanArtItem;
  index: number;
  onSelect: (art: FanArtItem) => void;
}> = ({ art, index, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#171717] group shadow-xl"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(art)}
      whileHover={{ y: -6 }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <motion.img
          src={art.img}
          alt={art.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
          <h3
            className="font-black text-white leading-tight"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.75rem, 3vw, 2.4rem)" }}
          >
            {art.title}
          </h3>
        </div>

        <motion.div
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

function FanArts() {
  const [selected, setSelected] = useState<FanArtItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <section id="fan-arts" className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="04 — FAN ARTS" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14 lg:mb-20">
          <div>
            <h2
              className="font-black leading-[0.88] tracking-tight text-white"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              FAN<br />
              <span className="text-[#FF5B3D]">ARTS</span>
            </h2>
          </div>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-md lg:self-end">
            A curated collection of personal fan art projects, concept posters, and creative explorations inspired by cinema, pop culture, and digital illustration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FAN_ARTS.map((art, i) => (
            <FanArtCard
              key={art.id}
              art={art}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Clean Fullscreen Modal Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setSelected(null)}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              className="relative z-10 flex flex-col items-center justify-center max-w-5xl max-h-[90vh] pointer-events-none"
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl max-h-[80vh] border border-white/10 pointer-events-auto">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-auto h-auto max-h-[80vh] object-contain block mx-auto"
                />
              </div>
              <h3
                className="font-black text-white mt-4 text-center tracking-wide pointer-events-auto"
                style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                {selected.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. SKILLS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" ref={ref} className="py-28 lg:py-44 bg-[#090909] relative overflow-hidden">
      {/* Extremely subtle background texture and glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF5B3D]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF5B3D]/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Heading & Philosophy */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <SectionLabel label="05 — SKILLS" />
            <h2
              className="font-black leading-[0.88] tracking-tight text-white mb-6"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              EXPERTISE &<br />
              <span className="text-[#31A8FF]">CRAFT</span>
            </h2>
            <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-md">
              Specialized tools and creative methodologies honed across industry-leading Adobe design software, interactive UI/UX environments, and visual storytelling disciplines.
            </p>
          </div>

          {/* Right Column: Staggered Category Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-start">
            {SKILL_GROUPS.map((group, gIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: gIdx * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -6,
                  rotate: gIdx % 2 === 0 ? 1 : -1,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
                }}
                className={`bg-[#141414] border border-white/[0.08] hover:border-[#FF5B3D]/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative overflow-hidden group ${
                  gIdx % 2 === 1 ? "sm:mt-12" : ""
                }`}
              >
                {/* Large category title */}
                <h3
                  className="font-black text-white leading-tight mb-2 tracking-wide"
                  style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.75rem, 3vw, 2.3rem)" }}
                >
                  {group.category}
                </h3>

                {/* Short one-line description */}
                <p className="text-xs sm:text-sm text-[#9E9E9E] leading-relaxed mb-5">
                  {group.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-white/[0.08] group-hover:bg-[#FF5B3D]/30 transition-colors duration-300 mb-6" />

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={`${group.category}-${skill}`}
                      className="px-4.5 py-2.5 rounded-xl bg-[#1b1b1b] border border-white/[0.08] text-xs sm:text-sm font-semibold text-white/90 cursor-default transition-all duration-300 shadow-sm"
                      whileHover={{
                        y: -3,
                        scale: 1.03,
                        borderColor: "rgba(255, 91, 61, 0.5)",
                        backgroundColor: "#222222",
                        boxShadow: "0 6px 16px -4px rgba(255, 91, 61, 0.18)",
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. EXPERIENCE SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-28 lg:py-44" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="06 — EXPERIENCE" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
          <h2
            className="font-black leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            CAREER<br />
            <span className="text-[#FF5B3D]">TIMELINE</span>
          </h2>

          <div className="space-y-0">
            {EXPERIENCE_TIMELINE.map((item, i) => (
              <motion.div
                key={item.company}
                className="flex gap-6 lg:gap-8"
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-3.5 h-3.5 rounded-full bg-[#FF5B3D] mt-1.5 flex-shrink-0"
                    style={{ boxShadow: "0 0 12px rgba(255,91,61,0.6)" }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
                  />
                  {i < EXPERIENCE_TIMELINE.length - 1 && (
                    <motion.div
                      className="w-px bg-[#FF5B3D]/25 my-2 flex-1"
                      style={{ originY: 0, minHeight: "80px" }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    />
                  )}
                </div>

                <div className="pb-16">
                  <div className="text-xs text-[#FF5B3D] font-bold tracking-[0.18em] uppercase mb-2">
                    {item.period}
                  </div>
                  <h3
                    className="font-black text-white mb-1"
                    style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
                  >
                    {item.company}
                  </h3>
                  <p className="text-[#9E9E9E] font-medium text-base mb-4">{item.role}</p>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                    {item.descriptionPlaceholder}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-semibold px-3.5 py-1.5 bg-[#171717] border border-white/[0.08] rounded-full text-white/70"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. CONTACT SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", project: "", message: "" });
    }, 4000);
  }

  const inputClass =
    "w-full bg-[#171717] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#FF5B3D]/45 transition-colors duration-300";

  return (
    <section id="contact" ref={ref} className="relative py-28 lg:py-44 bg-[#090909] overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-black whitespace-nowrap"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(8rem, 22vw, 20rem)",
            color: "rgba(255,255,255,0.015)",
          }}
        >
          CONTACT
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="07 — CONTACT" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-black leading-[0.88] tracking-tight text-white mb-8"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              LET'S CREATE<br />
              SOMETHING<br />
              <span className="text-[#FF5B3D]">MEMORABLE.</span>
            </h2>
            <p className="text-[#9E9E9E] text-lg leading-relaxed mb-10">
              Open to theatrical film campaigns, brand identity overhauls, motion graphics work, and creative collaborations. Let's make every frame extraordinary.
            </p>

            <div className="space-y-4 mb-10">
              <a
                href="mailto:sushanthsapare@gmail.com"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-11 h-11 bg-[#171717] border border-white/[0.08] rounded-full flex items-center justify-center group-hover:border-[#FF5B3D]/50 transition-colors">
                  <Mail className="w-4 h-4 text-[#FF5B3D]" />
                </div>
                <span className="text-base font-medium">sushanthsapare@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn", url: "#" },
                { Icon: Instagram, label: "Instagram", url: "#" },
                { Icon: ExternalLink, label: "Behance", url: "#" },
                { Icon: Github, label: "Portfolio", url: "#" },
              ].map(({ Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  aria-label={label}
                  className="px-4 py-2.5 bg-[#171717] border border-white/[0.08] rounded-full flex items-center gap-2 text-white/60 hover:text-white hover:border-white/25 transition-all duration-300 text-xs font-semibold"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF5B3D]" />
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#9E9E9E] tracking-[0.15em] uppercase mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-[#9E9E9E] tracking-[0.15em] uppercase mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#9E9E9E] tracking-[0.15em] uppercase mb-2">Project Type</label>
              <input
                type="text"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                placeholder="Film publicity, social campaign, branding..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-[#9E9E9E] tracking-[0.15em] uppercase mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project and vision..."
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#FF5B3D] text-white font-bold text-sm rounded-xl overflow-hidden relative"
              whileHover={{ scale: 1.01, backgroundColor: "#ff7b63" }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    Message Sent ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    Send Message <Send className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. FOOTER SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#090909] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
          className="flex items-center"
        >
          <img
            src="/icons/ss-icon-photo.png"
            alt="Sushanth Sapare Logo"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        <p className="text-[#9E9E9E] text-sm text-center">
          © 2026 | Sushanth Sapare
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {[Linkedin, Instagram, ExternalLink, Github].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-white/40 hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-[#171717] border border-white/10 hover:border-[#FF5B3D]/50 text-xs text-white font-medium transition-all duration-300 flex items-center gap-1.5"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN APP COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  return (
    <div className="bg-[#090909] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <GrainOverlay />
      <Nav />
      <Hero />
      <About />
      <PublicityCampaigns />
      <SocialMediaCampaigns />
      <FanArts />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
