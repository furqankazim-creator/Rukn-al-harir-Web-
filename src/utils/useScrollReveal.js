/**
 * useScrollReveal Hook
 * Triggers animations when elements enter viewport using IntersectionObserver
 * Fires only ONCE on first entry, preventing re-triggering on subsequent scrolls
 */

import { useEffect, useRef, useState } from 'react';
import { useAnimation, useInView } from 'framer-motion';

/**
 * useGlobalReveal
 * Mounted once (in Layout) — watches every element with a `.reveal`,
 * `.reveal-left`, or `.reveal-right` class and toggles the `.visible` class
 * as it enters / leaves the viewport, so CSS reveal animations replay on
 * scroll up AND down (consistent with the Framer Motion sections).
 * Re-scans on route changes via the `key` argument.
 */
export function useGlobalReveal(key) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [key]);
}

export function useScrollReveal(threshold = 0.6, triggerOnce = true) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { 
    once: triggerOnce,
    threshold: threshold 
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [isInView, controls, triggerOnce]);

  return { ref, controls };
}

/**
 * useCountUp Hook
 * Animates numbers from 0 to target value
 * Usage: const count = useCountUp(150, isInView, 1500);
 */

export function useCountUp(endValue = 100, shouldStart = true, duration = 1200) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) {
      // Reset so the count-up replays next time it enters the viewport
      setDisplayValue(0);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Strong ease-out: fast start, and the last ~20% crawls to the target
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      const currentValue = Math.round(easeProgress * endValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [shouldStart, endValue, duration]);

  return displayValue;
}

/**
 * useParallax Hook
 * Creates parallax effect on scroll (returns offset for transform)
 * Desktop only - returns 0 on mobile
 */

export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      if (elementTop - viewportHeight < scrolled && scrolled < elementTop + elementHeight) {
        const progress = (scrolled - (elementTop - viewportHeight)) / (viewportHeight + elementHeight);
        setOffset(progress * speed * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, isMobile]);

  return { ref, offset };
}

/**
 * useReducedMotion Hook
 * Returns true if user prefers reduced motion (for accessibility)
 * Use to disable parallax, count-ups, and complex animations
 */

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
