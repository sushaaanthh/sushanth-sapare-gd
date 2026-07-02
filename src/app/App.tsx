import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowUpRight, Menu, X, Mail, Send,
  Instagram, Linkedin, Github, ExternalLink,
  ChevronLeft, ChevronRight, Sparkles, XCircle
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
  { label: "Publicity", id: "publicity" },
  { label: "Campaigns", id: "campaigns" },
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
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=280&h=380&fit=crop&auto=format",
    style: { top: "12%", left: "58%", rotate: -5 },
    delay: 0,
  },
  {
    img: "https://images.unsplash.com/photo-1524781289445-ddf8ad4f31fe?w=240&h=340&fit=crop&auto=format",
    style: { top: "5%", left: "74%", rotate: 4 },
    delay: 0.15,
  },
  {
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=220&h=300&fit=crop&auto=format",
    style: { top: "50%", left: "62%", rotate: 3 },
    delay: 0.3,
  },
  {
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=280&fit=crop&auto=format",
    style: { top: "45%", left: "79%", rotate: -3 },
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
  category: string;
  year: string;
  role: string;
  color: string;
  img: string;
  tall: boolean;
  description: string;
}

const PUBLICITY_CAMPAIGNS: CampaignItem[] = [
  {
    id: 1,
    title: "Game Changer",
    category: "Film Publicity",
    year: "2024",
    role: "Lead Designer",
    color: "#FF5B3D",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1100&fit=crop&auto=format",
    tall: true,
    description: "Spearheaded the theatrical publicity design and visual identity for this pan-India blockbuster. Developed high-impact theatrical posters, teaser graphics, and digital countdown assets designed to evoke cinematic scale and intensity."
  },
  {
    id: 2,
    title: "Keedaa Cola",
    category: "Film Campaign",
    year: "2023",
    role: "Poster Designer",
    color: "#F2D16B",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop&auto=format",
    tall: false,
    description: "Crafted quirky, stylized character posters and promotional title cards reflecting the film's eccentric crime-comedy tone. Focused on vibrant color theory and unconventional typography."
  },
  {
    id: 3,
    title: "Kaantha",
    category: "Brand Identity",
    year: "2024",
    role: "Creative Director",
    color: "#A78BFA",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=1100&fit=crop&auto=format",
    tall: true,
    description: "Directed the complete visual design system from pre-release announcement posters to official theatrical standees, establishing an atmospheric and moody visual narrative."
  },
  {
    id: 4,
    title: "Bootcut Balaraju",
    category: "Film Publicity",
    year: "2023",
    role: "Graphic Designer",
    color: "#34D399",
    img: "https://images.unsplash.com/photo-1574267432553-4a9628a49e11?w=800&h=600&fit=crop&auto=format",
    tall: false,
    description: "Designed vibrant, mass-appeal theatrical posters and digital banners celebrating rustic energy and energetic character dynamics."
  },
  {
    id: 5,
    title: "Kishkindhapuri",
    category: "Film Campaign",
    year: "2024",
    role: "Visual Designer",
    color: "#F97316",
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=1100&fit=crop&auto=format",
    tall: true,
    description: "Formulated mythical and mysterious visual artworks for promotional campaigns, blending textured illustrations with dramatic lighting."
  },
  {
    id: 6,
    title: "Rathnam",
    category: "Motion Graphics",
    year: "2024",
    role: "Motion Designer",
    color: "#EC4899",
    img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop&auto=format",
    tall: false,
    description: "Produced high-energy action release posters and animated title reveals for digital promotions and theatrical display screens."
  },
  {
    id: 7,
    title: "Gam Gam Ganesha",
    category: "Film Publicity",
    year: "2023",
    role: "Poster Designer",
    color: "#F2D16B",
    img: "https://images.unsplash.com/photo-1524781289445-ddf8ad4f31fe?w=800&h=1100&fit=crop&auto=format",
    tall: true,
    description: "Designed festival-themed release posters and engaging character introduction cards with dynamic typography and celebratory palettes."
  },
  {
    id: 8,
    title: "Raakaasa",
    category: "Film Campaign",
    year: "2024",
    role: "Lead Designer",
    color: "#FF5B3D",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b05c7ff?w=800&h=600&fit=crop&auto=format",
    tall: false,
    description: "Created gritty, high-contrast promotional creatives and title treatments emphasizing tension and cinematic thrill."
  },
  {
    id: 9,
    title: "Makutam",
    category: "Brand Identity",
    year: "2023",
    role: "Designer",
    color: "#60A5FA",
    img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=1100&fit=crop&auto=format",
    tall: true,
    description: "Executed royal and regal title layouts, key art concepts, and promotional social collaterals."
  },
  {
    id: 10,
    title: "Don Bosko",
    category: "Film Publicity",
    year: "2024",
    role: "Graphic Designer",
    color: "#A78BFA",
    img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop&auto=format",
    tall: false,
    description: "Designed sleek, modern promotional posters and character posters tailored for urban youth audiences."
  },
  {
    id: 11,
    title: "17 YORC",
    category: "Social Campaign",
    year: "2024",
    role: "Visual Designer",
    color: "#34D399",
    img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=1100&fit=crop&auto=format",
    tall: true,
    description: "Delivered cohesive visual storytelling assets from announcement flyers to countdown story templates across digital channels."
  },
];

const SOCIAL_MEDIA_CAMPAIGNS = [
  {
    id: 1,
    brand: "Loukya Entertainments",
    abbr: "LE",
    category: "Production House Marketing",
    color: "#FF5B3D",
    description: "End-to-end social media creative direction for feature film announcements, festival greetings, behind-the-scenes countdowns, and audience engagement contests.",
    carouselPlaceholders: [
      { title: "Title Announcement", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=500&fit=crop&auto=format" },
      { title: "Teaser Countdown", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop&auto=format" },
      { title: "Release Day Banner", img: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=500&h=500&fit=crop&auto=format" },
    ]
  },
  {
    id: 2,
    brand: "Pink Elephant Pictures",
    abbr: "PEP",
    category: "Digital Campaign Strategy",
    color: "#F2D16B",
    description: "Designed vibrant promotional tiles, Instagram story series, cast reveals, and motion graphic reels driving substantial organic fan interactions.",
    carouselPlaceholders: [
      { title: "Character Reveal 01", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&auto=format" },
      { title: "Music Video Promo", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop&auto=format" },
      { title: "Milestone Celebration", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop&auto=format" },
    ]
  },
  {
    id: 3,
    brand: "AHA TV",
    abbr: "AHA",
    category: "OTT Platform Creatives",
    color: "#A78BFA",
    description: "Created high-converting digital thumbnails, web banners, premiere countdown cards, and interactive weekend watch lists for regional OTT releases.",
    carouselPlaceholders: [
      { title: "Weekend Watchlist", img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&h=500&fit=crop&auto=format" },
      { title: "Streaming Now Hero", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop&auto=format" },
      { title: "Top 10 Spotlight", img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&h=500&fit=crop&auto=format" },
    ]
  },
  {
    id: 4,
    brand: "AMC Engineering College",
    abbr: "AMC",
    category: "Institutional Brand & Events",
    color: "#34D399",
    description: "Formulated engaging campus fest campaigns, admission spotlight infographics, cultural fest posters, and student leadership announcements.",
    carouselPlaceholders: [
      { title: "Cultural Fest Key Art", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=500&fit=crop&auto=format" },
      { title: "Campus Life Spotlight", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=500&fit=crop&auto=format" },
      { title: "Symposium Promo", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=500&fit=crop&auto=format" },
    ]
  },
];

const SKILL_GROUPS = [
  {
    category: "Adobe Creative Suite",
    color: "#31A8FF",
    skills: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro", "Lightroom", "Adobe XD"],
  },
  {
    category: "UI/UX",
    color: "#F24E1E",
    skills: ["Figma"],
  },
  {
    category: "Creative",
    color: "#FF5B3D",
    skills: [
      "Brand Identity",
      "Typography",
      "Poster Design",
      "Motion Graphics",
      "Visual Storytelling",
      "Film Publicity",
      "Social Media Design",
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
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(9,9,9,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "background 0.5s, backdrop-filter 0.5s, border 0.5s",
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
          <span className="text-xl font-black text-white tracking-tight" style={{ fontFamily: DISPLAY_FONT }}>
            SS<span className="text-[#FF5B3D]">.</span>
          </span>
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

        <div className="hidden lg:block">
          <motion.a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5B3D] text-white text-sm font-bold rounded-full"
            whileHover={{ scale: 1.04, backgroundColor: "#ff7b63" }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
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

        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-black leading-[0.82] tracking-tighter text-white"
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
        <div className="overflow-hidden mb-10 lg:mb-14">
          <motion.h1
            className="font-black leading-[0.82] tracking-tighter"
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
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
        >
          <div className="flex items-center gap-5">
            <div className="w-px h-14 bg-white/15" />
            <div className="h-7 overflow-hidden flex flex-col">
              <span className="text-xs text-[#9E9E9E] tracking-widest uppercase mb-1">Graphic Designer</span>
              <div className="overflow-hidden h-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={specialty}
                    className="block text-base font-semibold text-white/90"
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {SPECIALTIES[specialty]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <motion.a
              href="#publicity"
              onClick={(e) => scrollToSection(e, "publicity")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5B3D] text-white font-bold text-sm rounded-full"
              whileHover={{ scale: 1.04, gap: "10px" }}
              whileTap={{ scale: 0.96 }}
            >
              View Portfolio <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex items-center px-6 py-3 border border-white/15 text-white font-bold text-sm rounded-full backdrop-blur-sm"
              whileHover={{ borderColor: "rgba(255,255,255,0.4)", scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              Let's Work Together
            </motion.a>
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
        <SectionLabel label="01 — About" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] max-w-[460px] rounded-2xl overflow-hidden bg-[#141414]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format"
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
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#171717] group mb-6"
      style={{ breakInside: "avoid" }}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(campaign)}
      whileHover={{ y: -6 }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: campaign.tall ? "3/4" : "4/3" }}>
        <motion.img
          src={campaign.img}
          alt={campaign.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.09 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${campaign.color}22 0%, transparent 60%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold border"
              style={{
                color: campaign.color,
                borderColor: `${campaign.color}40`,
                background: `${campaign.color}15`,
              }}
            >
              {campaign.category}
            </span>
            <span className="text-xs text-white/40">{campaign.year}</span>
          </div>
          <h3
            className="font-black text-white leading-tight"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
          >
            {campaign.title}
          </h3>
          <motion.p
            className="text-sm text-white/60 mt-1"
            animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            {campaign.role} • Click to expand preview
          </motion.p>
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
}

function PublicityCampaigns() {
  const [selected, setSelected] = useState<CampaignItem | null>(null);

  return (
    <section id="publicity" className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="02 — Publicity Campaigns" />

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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
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

      {/* Expandable Modal Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative z-10 max-w-4xl w-full bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 bg-black flex items-center justify-center overflow-hidden min-h-[320px] md:min-h-[500px]">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold border"
                      style={{
                        color: selected.color,
                        borderColor: `${selected.color}40`,
                        background: `${selected.color}15`,
                      }}
                    >
                      {selected.category}
                    </span>
                    <span className="text-xs text-white/40">{selected.year}</span>
                  </div>

                  <h3
                    className="text-4xl lg:text-5xl font-black text-white mb-2"
                    style={{ fontFamily: DISPLAY_FONT }}
                  >
                    {selected.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#FF5B3D] mb-6">{selected.role}</p>

                  <div className="border-t border-white/[0.08] pt-6 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] mb-2.5">
                      Campaign Overview
                    </h4>
                    <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                      {selected.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.08] text-xs text-white/40">
                  <span>Theatrical Film Archive</span>
                  <span>Sushanth Sapare Design</span>
                </div>
              </div>
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
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<{ [key: number]: number }>({
    1: 0, 2: 0, 3: 0, 4: 0
  });

  const nextSlide = (id: number, len: number) => {
    setActiveCarouselIndex(prev => ({ ...prev, [id]: (prev[id] + 1) % len }));
  };

  const prevSlide = (id: number, len: number) => {
    setActiveCarouselIndex(prev => ({ ...prev, [id]: (prev[id] - 1 + len) % len }));
  };

  return (
    <section id="campaigns" className="py-28 lg:py-44" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="03 — Social Media Campaigns" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14 lg:mb-20">
          <div>
            <h2
              className="font-black leading-[0.88] tracking-tight text-white"
              style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              DIGITAL & SOCIAL<br />
              <span className="text-[#F2D16B]">STRATEGIES</span>
            </h2>
          </div>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-md lg:self-end">
            Distinct from theatrical posters, these comprehensive social media campaigns drive brand engagement across production houses, OTT platforms, and institutional organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SOCIAL_MEDIA_CAMPAIGNS.map((brandItem, i) => {
            const currentSlide = activeCarouselIndex[brandItem.id] || 0;
            const activeHolder = brandItem.carouselPlaceholders[currentSlide];

            return (
              <motion.div
                key={brandItem.id}
                className="bg-[#171717] border border-white/[0.08] rounded-3xl p-6 lg:p-8 flex flex-col justify-between group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ borderColor: `${brandItem.color}35` }}
              >
                <div>
                  {/* Brand Header */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black"
                        style={{ background: `${brandItem.color}18`, color: brandItem.color, fontFamily: DISPLAY_FONT }}
                      >
                        {brandItem.abbr}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white leading-snug">{brandItem.brand}</h3>
                        <span className="text-xs text-[#9E9E9E]">{brandItem.category}</span>
                      </div>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ background: `${brandItem.color}15`, color: brandItem.color }}
                    >
                      Social Campaign
                    </span>
                  </div>

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                    {brandItem.description}
                  </p>
                </div>

                {/* Interactive Carousel Placeholder */}
                <div className="bg-[#101010] border border-white/[0.05] rounded-2xl p-4 overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white/50 tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F2D16B]" /> Campaign Carousel Showcase
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => prevSlide(brandItem.id, brandItem.carouselPlaceholders.length)}
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 transition-colors"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-white/50 px-2 font-mono">
                        {currentSlide + 1} / {brandItem.carouselPlaceholders.length}
                      </span>
                      <button
                        onClick={() => nextSlide(brandItem.id, brandItem.carouselPlaceholders.length)}
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 transition-colors"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black group/carousel">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={activeHolder.img}
                        alt={activeHolder.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{activeHolder.title}</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 bg-black/60 px-2 py-0.5 rounded">
                        Carousel Slide #{currentSlide + 1}
                      </span>
                    </div>
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
// 5. SKILLS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" ref={ref} className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="04 — Skills" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-14 lg:mb-20">
          <h2
            className="font-black leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            EXPERTISE &<br />
            <span className="text-[#31A8FF]">CRAFT</span>
          </h2>
          <p className="text-[#9E9E9E] text-lg leading-relaxed self-end">
            Specialized tools and creative methodologies honed across industry-leading Adobe design software, interactive UI/UX environments, and visual storytelling disciplines.
          </p>
        </div>

        <div className="space-y-12">
          {SKILL_GROUPS.map((group, gIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gIdx * 0.15, duration: 0.7 }}
              className="bg-[#141414] border border-white/[0.06] rounded-3xl p-8 lg:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
                <h3 className="text-xl font-bold text-white tracking-wide uppercase font-mono text-sm">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    className="px-5 py-3 rounded-2xl bg-[#1d1d1d] border border-white/[0.08] text-sm sm:text-base font-semibold text-white/90 cursor-default flex items-center gap-2.5 transition-all duration-300 shadow-sm"
                    whileHover={{
                      y: -4,
                      scale: 1.04,
                      borderColor: group.color,
                      backgroundColor: "#242424",
                      boxShadow: `0 8px 20px -6px ${group.color}35`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
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
        <SectionLabel label="05 — Experience" />

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
        <SectionLabel label="06 — Contact" />

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
          <span className="text-2xl font-black text-white" style={{ fontFamily: DISPLAY_FONT }}>
            SS<span className="text-[#FF5B3D]">.</span>
          </span>
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
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
