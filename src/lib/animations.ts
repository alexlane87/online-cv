import type { Variants } from "framer-motion"

/**
 * Shared animation variants for consistent transitions throughout the application
 */

// Standard fade in from bottom with slide up
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Fade in from left with slide
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Fade in from right with slide
export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

// Standard fade without movement
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

// Scale and fade animation (good for modals)
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

// Slide down from top (good for headers)
export const slideDown: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
}

// Height expansion animation (for detail views)
export const expandHeight: Variants = {
  initial: { height: 0, opacity: 0, overflow: "hidden" },
  animate: { height: "auto", opacity: 1, overflow: "hidden" },
  exit: { height: 0, opacity: 0, overflow: "hidden" },
}

// Unfurl animation for detailed content (smoother with transition)
export const unfurlAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
}

// Staggered children container
export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
}

// Staggered child item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: { opacity: 0, y: -20 },
}

/**
 * Standard transition configurations
 */
export const transitions = {
  default: { duration: 0.3, ease: "easeInOut" as const },
  slow: { duration: 0.5, ease: "easeInOut" as const },
  fast: { duration: 0.2, ease: "easeInOut" as const },
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
}

/**
 * Common hover animations
 */
export const hoverScale = {
  scale: 1.02,
  transition: transitions.fast,
}

export const hoverLift = {
  y: -2,
  scale: 1.02,
  transition: transitions.fast,
}

export const hoverGrow = {
  scale: 1.05,
  transition: transitions.fast,
}
