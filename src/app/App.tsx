import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowUpRight, Menu, X, Mail, Send,
  Instagram, Linkedin, Github, ExternalLink,
} from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NAV_LINKS = ["Work", "About", "Skills", "Experience", "Contact"];

const SPECIALTIES = [
  "Film Publicity",
  "Visual Storytelling",
  "Brand Identity",
  "Motion Graphics",
  "Entertainment Marketing",
];

const PROJECTS = [
  {
    id: 1, title: "Game Changer", category: "Film Publicity", year: "2024",
    role: "Lead Designer", color: "#FF5B3D",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=800&fit=crop&auto=format",
    tall: true,
  },
  {
    id: 2, title: "Keedaa Cola", category: "Film Campaign", year: "2023",
    role: "Poster Designer", color: "#F2D16B",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=420&fit=crop&auto=format",
    tall: false,
  },
  {
    id: 3, title: "Kaantha", category: "Brand Identity", year: "2024",
    role: "Creative Director", color: "#A78BFA",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=800&fit=crop&auto=format",
    tall: true,
  },
  {
    id: 4, title: "Bootcut Balaraju", category: "Film Publicity", year: "2023",
    role: "Graphic Designer", color: "#34D399",
    img: "https://images.unsplash.com/photo-1574267432553-4a9628a49e11?w=600&h=420&fit=crop&auto=format",
    tall: false,
  },
  {
    id: 5, title: "Kishkindhapuri", category: "Film Campaign", year: "2024",
    role: "Visual Designer", color: "#F97316",
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=800&fit=crop&auto=format",
    tall: true,
  },
  {
    id: 6, title: "Rathnam", category: "Motion Graphics", year: "2024",
    role: "Motion Designer", color: "#EC4899",
    img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=420&fit=crop&auto=format",
    tall: false,
  },
  {
    id: 7, title: "Gam Gam Ganesha", category: "Film Publicity", year: "2023",
    role: "Poster Designer", color: "#F2D16B",
    img: "https://images.unsplash.com/photo-1524781289445-ddf8ad4f31fe?w=600&h=800&fit=crop&auto=format",
    tall: true,
  },
  {
    id: 8, title: "Raakaasa", category: "Film Campaign", year: "2024",
    role: "Lead Designer", color: "#FF5B3D",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b05c7ff?w=600&h=420&fit=crop&auto=format",
    tall: false,
  },
  {
    id: 9, title: "Makutam", category: "Brand Identity", year: "2023",
    role: "Designer", color: "#60A5FA",
    img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=800&fit=crop&auto=format",
    tall: true,
  },
  {
    id: 10, title: "Don Bosko", category: "Film Publicity", year: "2024",
    role: "Graphic Designer", color: "#A78BFA",
    img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=420&fit=crop&auto=format",
    tall: false,
  },
  {
    id: 11, title: "17 YORC", category: "Social Campaign", year: "2024",
    role: "Visual Designer", color: "#34D399",
    img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=800&fit=crop&auto=format",
    tall: true,
  },
];

const SKILLS = [
  { name: "Adobe Photoshop", level: "Expert" },
  { name: "Illustrator", level: "Expert" },
  { name: "InDesign", level: "Advanced" },
  { name: "After Effects", level: "Advanced" },
  { name: "Premiere Pro", level: "Advanced" },
  { name: "Lightroom", level: "Expert" },
  { name: "Adobe XD", level: "Proficient" },
  { name: "Figma", level: "Proficient" },
  { name: "Brand Identity", level: "Expert" },
  { name: "Typography", level: "Expert" },
  { name: "Motion Graphics", level: "Advanced" },
  { name: "Film Publicity", level: "Expert" },
  { name: "Visual Storytelling", level: "Expert" },
  { name: "Social Media Design", level: "Advanced" },
];

const BRANDS = [
  { name: "Loukya Entertainments", abbr: "LE" },
  { name: "Pink Elephant Pictures", abbr: "PEP" },
  { name: "AHA TV", abbr: "AHA" },
  { name: "AMC Engineering College", abbr: "AMC" },
];

const STATS = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 11, suffix: "+", label: "Feature Films" },
  { value: 4, suffix: "+", label: "Entertainment Brands" },
  { value: 100, suffix: "+", label: "Designs Delivered" },
];

const TOOLS = [
  { name: "Photoshop", short: "Ps", color: "#31A8FF" },
  { name: "Illustrator", short: "Ai", color: "#FF9A00" },
  { name: "After Effects", short: "Ae", color: "#9999FF" },
  { name: "Premiere", short: "Pr", color: "#EA77FF" },
  { name: "InDesign", short: "Id", color: "#FF3366" },
  { name: "Figma", short: "Fig", color: "#F24E1E" },
  { name: "Adobe XD", short: "Xd", color: "#FF61F6" },
];

const TIMELINE = [
  {
    company: "Ticket Factory",
    role: "Graphic Designer & Video Editor",
    period: "Oct 2023 – Sep 2025",
    highlights: ["Film publicity", "Social campaigns", "Print design", "Marketing creatives", "Motion graphics"],
  },
  {
    company: "Inovact Social",
    role: "Graphic Design Intern",
    period: "Sep 2023 – Mar 2024",
    highlights: ["Branding", "Digital campaigns", "Promotional creatives"],
  },
];

const TESTIMONIALS = [
  {
    name: "Ravi Kumar",
    role: "Producer, Loukya Entertainments",
    text: "Sushanth brings an extraordinary eye for cinematic storytelling to every project. The Game Changer campaign exceeded all our expectations in scale and impact.",
    initials: "RK",
    color: "#FF5B3D",
  },
  {
    name: "Priya Sharma",
    role: "Creative Director, Pink Elephant Pictures",
    text: "Working with Sushanth is seamless. He understands the emotional core of a film and translates it into visuals that communicate before a single word is read.",
    initials: "PS",
    color: "#F2D16B",
  },
  {
    name: "Anand Reddy",
    role: "Marketing Head, AHA TV",
    text: "His social campaigns drove engagement beyond our KPIs every time. A designer who thinks strategically while consistently delivering beautifully.",
    initials: "AR",
    color: "#A78BFA",
  },
];

const DISPLAY_FONT = "'Big Shoulders Display', sans-serif";

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
// SHARED COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999]"
      style={{
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
      }}
    />
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-14 lg:mb-20">
      <span className="text-[#FF5B3D] text-xs font-bold tracking-[0.2em] uppercase">{label}</span>
      <div className="h-px w-10 bg-[#FF5B3D]/50" />
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(value);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAV
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Nav() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 50;

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
        <a href="#" className="flex items-center">
          <span className="text-xl font-black text-white tracking-tight" style={{ fontFamily: DISPLAY_FONT }}>
            SS<span className="text-[#FF5B3D]">.</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <motion.a
            href="#contact"
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
            <div className="px-6 py-10 flex flex-col gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-4xl font-black text-white"
                  style={{ fontFamily: DISPLAY_FONT }}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link}
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
// HERO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const COLLAGE = [
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
  const my = (ry - 0.5) * 20;

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end pb-24 lg:pb-36 overflow-hidden bg-[#090909]">
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70vw 60vh at ${rx * 100}% ${ry * 100}%, rgba(255,91,61,0.07) 0%, transparent 65%)`,
          transition: "background 0.3s",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {/* Floating collage — desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {COLLAGE.map((card, i) => (
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
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Available badge */}
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

        {/* Name — two lines, second outlined */}
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

        {/* Bottom row */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
        >
          {/* Rotating specialty */}
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

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5B3D] text-white font-bold text-sm rounded-full"
              whileHover={{ scale: 1.04, gap: "10px" }}
              whileTap={{ scale: 0.96 }}
            >
              View Portfolio <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-white/15 text-white font-bold text-sm rounded-full backdrop-blur-sm"
              whileHover={{ borderColor: "rgba(255,255,255,0.4)", scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              Let's Work Together
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#FF5B3D]/60 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ABOUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="01 — About" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          {/* Portrait */}
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
              {/* Corner accents */}
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

          {/* Text + stats */}
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

            <div className="flex flex-wrap gap-2 mb-12">
              {["Movie Posters", "Film Campaigns", "Brand Identity", "Print Media", "Motion Graphics"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 border border-white/[0.08] rounded-full text-sm text-white/60 hover:border-[#FF5B3D]/30 hover:text-white/90 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

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
// SKILLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" ref={ref} className="py-28 lg:py-44" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="02 — Skills" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-14 lg:mb-20">
          <h2
            className="font-black leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            TOOLS &<br />
            <span className="text-[#F2D16B]">CRAFT</span>
          </h2>
          <p className="text-[#9E9E9E] text-lg leading-relaxed self-end">
            A toolkit built for the entertainment industry — from cinematic poster design to motion campaigns, across print, digital, and screen.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="group relative bg-[#171717] border border-white/[0.06] rounded-xl px-4 py-5 overflow-hidden cursor-default"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.03, borderColor: "rgba(255,91,61,0.28)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,91,61,0.07) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <div className="text-sm font-semibold text-white mb-1">{skill.name}</div>
                <div className="text-xs text-[#9E9E9E]">{skill.level}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FEATURED WORK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#171717] group"
      style={{ breakInside: "avoid" }}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: project.tall ? "3/4" : "4/3" }}
      >
        <motion.img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.09 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Color overlay on hover */}
        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${project.color}18 0%, transparent 55%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold border"
              style={{
                color: project.color,
                borderColor: `${project.color}35`,
                background: `${project.color}12`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-white/35">{project.year}</span>
          </div>
          <h3
            className="font-black text-white leading-tight"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            }}
          >
            {project.title}
          </h3>
          <motion.p
            className="text-sm text-white/55 mt-1"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3 }}
          >
            {project.role}
          </motion.p>
        </div>

        {/* Arrow badge */}
        <motion.div
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="03 — Featured Work" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14 lg:mb-20">
          <h2
            className="font-black leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            SELECTED<br />
            <span className="text-[#FF5B3D]">PROJECTS</span>
          </h2>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-sm lg:self-end">
            11 feature films. 4 entertainment brands. Every frame designed to capture attention and tell a story at first glance.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="mb-4">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BRANDS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Brands() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-28 lg:py-40 border-y border-white/[0.05]" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="04 — Clients" />

        <h2
          className="font-black leading-[0.88] tracking-tight text-white mb-14 lg:mb-20"
          style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
        >
          ENTERTAINMENT<br />
          <span className="text-[#F2D16B]">BRANDS</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              className="group relative bg-[#171717] border border-white/[0.06] rounded-2xl p-8 lg:p-10 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: "rgba(242,209,107,0.22)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(242,209,107,0.06) 0%, transparent 70%)" }}
              />
              <div
                className="text-5xl font-black text-white/15 group-hover:text-[#F2D16B]/50 transition-colors duration-500"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {brand.abbr}
              </div>
              <div className="text-center text-sm font-medium text-[#9E9E9E] group-hover:text-white/80 transition-colors duration-300">
                {brand.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TIMELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-28 lg:py-44 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="05 — Experience" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
          <h2
            className="font-black leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            CAREER<br />
            <span className="text-[#FF5B3D]">JOURNEY</span>
          </h2>

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.company}
                className="flex gap-6 lg:gap-8"
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left column: dot + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#FF5B3D] mt-1.5 flex-shrink-0"
                    style={{ boxShadow: "0 0 10px rgba(255,91,61,0.5)" }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
                  />
                  {i < TIMELINE.length - 1 && (
                    <motion.div
                      className="w-px bg-[#FF5B3D]/20 my-2 flex-1"
                      style={{ originY: 0, minHeight: "60px" }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-14">
                  <div className="text-xs text-[#FF5B3D] font-bold tracking-[0.15em] uppercase mb-2">
                    {item.period}
                  </div>
                  <h3
                    className="font-black text-white mb-1"
                    style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
                  >
                    {item.company}
                  </h3>
                  <p className="text-[#9E9E9E] text-sm mb-5">{item.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-sm px-3 py-1.5 bg-[#171717] border border-white/[0.06] rounded-full text-white/55"
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
// PHILOSOPHY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-36 lg:py-56 overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* BG word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <motion.span
          className="font-black text-white whitespace-nowrap"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(8rem, 28vw, 26rem)",
            color: "rgba(255,255,255,0.018)",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          DESIGN
        </motion.span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-[#FF5B3D] leading-none font-black -ml-2 select-none"
          style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(5rem, 10vw, 10rem)", lineHeight: 0.7 }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          "
        </motion.div>

        <div className="overflow-hidden">
          <motion.blockquote
            className="font-black text-white tracking-tight leading-[1.05] max-w-5xl mt-4"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            }}
            initial={{ y: "60%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            I believe every design should tell a story before a single word is read.
          </motion.blockquote>
        </div>

        <motion.div
          className="flex items-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="w-8 h-px bg-[#FF5B3D]" />
          <span className="text-[#9E9E9E] text-sm">Sushanth Sapare — Design Philosophy</span>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOOLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Tools() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-28 lg:py-40 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="06 — Software" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-14 lg:mb-20">
          <h2
            className="font-black leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            CREATIVE<br />
            <span className="text-[#FF5B3D]">ARSENAL</span>
          </h2>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-xs lg:self-end">
            Industry-standard tools mastered for film, print, digital, and motion.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="group flex flex-col items-center gap-3 p-5 bg-[#171717] border border-white/[0.06] rounded-2xl cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.06, borderColor: `${tool.color}35` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black"
                style={{
                  background: `${tool.color}18`,
                  color: tool.color,
                  fontFamily: DISPLAY_FONT,
                  transition: "transform 0.3s",
                }}
              >
                {tool.short}
              </div>
              <span className="text-xs text-[#9E9E9E] text-center group-hover:text-white/80 transition-colors duration-300">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TESTIMONIALS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-28 lg:py-44" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel label="07 — Testimonials" />

        <h2
          className="font-black leading-[0.88] tracking-tight text-white mb-14 lg:mb-20"
          style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
        >
          WHAT<br />
          <span className="text-[#F2D16B]">CLIENTS SAY</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="relative rounded-2xl p-7 lg:p-8 overflow-hidden"
              style={{
                background: "rgba(23,23,23,0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: `${t.color}22` }}
            >
              {/* Quote mark deco */}
              <div
                className="absolute top-3 right-5 font-black leading-none opacity-[0.08] select-none"
                style={{ fontFamily: DISPLAY_FONT, fontSize: "7rem", color: t.color }}
              >
                "
              </div>

              <div className="relative">
                <p className="text-white/75 text-base leading-relaxed mb-8">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${t.color}22`, color: t.color, fontFamily: DISPLAY_FONT }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-[#9E9E9E] text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTACT
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
      {/* BG word */}
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
        <SectionLabel label="08 — Contact" />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Left */}
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
              <span className="text-[#FF5B3D]">WORTH<br />REMEMBERING.</span>
            </h2>
            <p className="text-[#9E9E9E] text-lg leading-relaxed mb-10">
              Open to film projects, brand campaigns, motion work, and creative collaborations. Let's bring your vision to life.
            </p>

            <div className="space-y-4 mb-10">
              <a
                href="mailto:sushanthsapare@gmail.com"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-[#171717] border border-white/[0.08] rounded-full flex items-center justify-center group-hover:border-[#FF5B3D]/35 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">sushanthsapare@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: ExternalLink, label: "Behance" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 bg-[#171717] border border-white/[0.08] rounded-full flex items-center justify-center text-white/45 hover:text-white hover:border-white/25 transition-all duration-300"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
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
                placeholder="Film campaign, brand identity, motion design..."
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
// FOOTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#090909] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span
          className="text-2xl font-black text-white"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          SS<span className="text-[#FF5B3D]">.</span>
        </span>

        <p className="text-[#9E9E9E] text-sm text-center">
          © 2024 Sushanth Sapare. Crafted with precision.
        </p>

        <div className="flex items-center gap-4">
          {[Linkedin, Instagram, Github, ExternalLink].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              className="text-white/30 hover:text-white/80 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  return (
    <div className="bg-[#090909] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <GrainOverlay />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <FeaturedWork />
      <Brands />
      <Timeline />
      <Philosophy />
      <Tools />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
