"use client";
import { useRef, useEffect, useState, useCallback, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { useIsMobile } from "@/hooks/use-mobile";
import NebulaLayer from "./hero-globe/NebulaLayer";
import HUDGridLayer from "./hero-globe/HUDGridLayer";

const StarfieldLayer = dynamic(() => import("./hero-globe/StarfieldLayer"), {
  ssr: false,
});
const ParticleTrails = dynamic(() => import("./hero-globe/ParticleTrails"), {
  ssr: false,
});
const GlobeScene = dynamic(() => import("./hero-globe/GlobeScene"), {
  ssr: false,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

const DraggableMoon = ({ isMobile }: { isMobile: boolean }) => {
  const size = isMobile ? 45 : 100;
  const moonRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const [initialized, setInitialized] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (moonRef.current) {
      const parent = moonRef.current.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const initial = {
          x: rect.width - size - rect.width * 0.08,
          y: rect.height * 0.08,
        };
        posRef.current = initial;
        moonRef.current.style.left = `${initial.x}px`;
        moonRef.current.style.top = `${initial.y}px`;
        setInitialized(true);
      }
    }
  }, [size]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const x = e.clientX - offsetRef.current.x;
      const y = e.clientY - offsetRef.current.y;
      posRef.current = { x, y };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (moonRef.current) {
          moonRef.current.style.left = `${x}px`;
          moonRef.current.style.top = `${y}px`;
        }
      });
    };

    const onUp = (e: PointerEvent) => {
      draggingRef.current = false;
      if (moonRef.current) {
        try {
          moonRef.current.releasePointerCapture(e.pointerId);
        } catch (_e) {
          // releasePointerCapture may fail if pointer was already released
        }
      }
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    moonRef.current?.setPointerCapture(e.pointerId);
  }, []);

  return (
    <div
      ref={moonRef}
      className="absolute z-[6] cursor-grab active:cursor-grabbing"
      style={{
        width: size,
        height: size,
        opacity: initialized ? 1 : 0,
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onPointerDown={onPointerDown}
    >
      <Image
        src="/textures/moon-clean.png"
        alt=""
        width={500}
        height={500}
        draggable={false}
        className="w-full h-full object-cover"
        style={{
          borderRadius: "50%",
          filter: "brightness(1.2) contrast(1.1)",
          boxShadow:
            "0 0 20px 5px rgba(200,210,230,0.15), 0 0 40px 12px rgba(180,200,220,0.06)",
          clipPath: "circle(47%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const HeroSection = () => {
  const { openContactDialog } = useContactDialog();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const mouseTarget = useRef({ x: 0, y: 0 });

  const starfieldRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const animFrame = useRef<number>(0);
  const currentParallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseTarget.current = { x, y };
    },
    [prefersReducedMotion, isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    mouseTarget.current = { x: 0, y: 0 };
  }, []);

  // rAF parallax loop
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    const tick = () => {
      const lerp = 0.1;
      currentParallax.current.x +=
        (mouseTarget.current.x - currentParallax.current.x) * lerp;
      currentParallax.current.y +=
        (mouseTarget.current.y - currentParallax.current.y) * lerp;
      const cx = currentParallax.current.x;
      const cy = currentParallax.current.y;

      if (starfieldRef.current)
        starfieldRef.current.style.transform = `translate(${cx * 3}px, ${cy * 3}px)`;
      if (nebulaRef.current)
        nebulaRef.current.style.transform = `translate(${cx * 6}px, ${cy * 6}px)`;
      if (hudRef.current)
        hudRef.current.style.transform = `translate(${cx * 10}px, ${cy * 10}px)`;
      if (globeWrapRef.current)
        globeWrapRef.current.style.transform = `translate(${cx * 16}px, ${cy * 16}px)`;

      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame.current);
  }, [prefersReducedMotion, isMobile]);

  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 25 });

  const line1Words = "Transform. Automate.".split(" ");
  const line2Words = "Scale Without Limits.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh]  md:min-h-[100vh] flex flex-col justify-center overflow-hidden"
      style={{ background: "hsl(var(--hero-bg))" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 1: Starfield */}
      {!isMobile && (
        <div
          ref={starfieldRef}
          className="absolute inset-0 will-change-transform z-[5]"
        >
          {!prefersReducedMotion && <StarfieldLayer />}
        </div>
      )}

      {/* Layer 2: Nebula */}
      <div ref={nebulaRef} className="absolute inset-0 will-change-transform">
        <NebulaLayer />
      </div>

      {/* Layer 2.5: Particle Trails */}
      {!isMobile && (
        <div className="absolute inset-0 z-[1]">
          {!prefersReducedMotion && <ParticleTrails />}
        </div>
      )}

      {/* Layer 3: HUD grid */}
      <div ref={hudRef} className="absolute inset-0 will-change-transform">
        {!prefersReducedMotion && <HUDGridLayer />}
      </div>

      {/* Moon */}
      <DraggableMoon isMobile={isMobile} />

      {/* Globe */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="absolute w-full h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 15%, hsl(25 70% 50% / 0.3) 40%, hsl(25 80% 70% / 0.6) 50%, hsl(25 70% 50% / 0.3) 60%, transparent 85%)",
            filter: "blur(1px)",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: easeOut }}
        />
        <motion.div
          className="absolute w-full h-[20px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 20%, hsl(25 70% 50% / 0.06) 40%, hsl(25 80% 60% / 0.12) 50%, hsl(25 70% 50% / 0.06) 60%, transparent 80%)",
            filter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
        />
        <div
          ref={globeWrapRef}
          className="
    relative will-change-transform pointer-events-auto
    w-[70vw] h-[70vw]
    md:w-[55vw] md:h-[55vw]
    max-w-[780px] max-h-[780px]
  "
        >
          <GlobeScene
            key={isMobile ? "mobile" : "desktop"}
            mouseTarget={mouseTarget}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-bg)/0.9)] via-[hsl(var(--hero-bg)/0.5)] md:via-[hsl(var(--hero-bg)/0.2)] to-[hsl(var(--hero-bg)/0.3)] md:to-transparent pointer-events-none z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-[hsl(var(--hero-bg))] to-transparent pointer-events-none z-[4]" />
      <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-[hsl(var(--hero-bg)/0.4)] to-transparent pointer-events-none z-[4]" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-5 sm:px-8 pt-20 sm:pt-28 md:pt-36 pb-10 sm:pb-16 md:pb-20 flex-1 flex items-center pointer-events-none"
        style={{
          y: prefersReducedMotion ? 0 : smoothContentY,
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
      >
        <div className="max-w-3xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6, ease: easeOut }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold tracking-[0.25em] uppercase text-primary">
              AI-Powered Digital Transformation
            </span>
          </motion.div>

          <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-hero-foreground leading-[1.08] tracking-[-0.03em]">
            <span className="block">
              {line1Words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.6,
                    ease: easeOut,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block mt-2">
              {line2Words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em] text-shimmer"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.07,
                    duration: 0.6,
                    ease: easeOut,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: easeOut }}
            className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-hero-foreground/60 max-w-xl leading-relaxed font-light"
          >
            We engineer AI-driven digital transformation, intelligent
            automation, and revenue growth platforms for enterprises ready to
            lead, not follow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: easeOut }}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button
              onClick={openContactDialog}
              className="w-full sm:w-auto group"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all shadow-[0_0_40px_-8px_hsl(var(--primary)/0.6)] group-hover:shadow-[0_0_60px_-5px_hsl(var(--primary)/0.7)]"
              >
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.span>
            </button>
            <Link
              href="/digital-transformation"
              className="w-full sm:w-auto group"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 border border-hero-foreground/20 text-hero-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:border-hero-foreground/50 hover:bg-hero-foreground/5 transition-all backdrop-blur-sm"
              >
                Explore AI Transformation
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
