/**
 * Animation Configuration
 * Neo-brutalist motion system with snappy, mechanical easing curves
 */

// Easing curves for neo-brutalist feel
export const easings = {
  // Snappy bounce/overshoot
  snapBounce: [0.68, -0.55, 0.27, 1.55],
  
  // Fast-out-slow-in (elegant snap)
  fastOutSlowIn: [0.16, 1, 0.3, 1],
  
  // Sharp entrance
  sharpIn: [0.9, 0.1, 0.8, 0.2],
  
  // Mechanical, no easing (linear)
  mechanical: [0.42, 0, 0.58, 1],
};

// Duration presets
export const durations = {
  micro: 0.15,      // 150ms - micro interactions
  short: 0.25,      // 250ms - button press, quick transitions
  medium: 0.35,     // 350ms - card reveals, form transitions
  standard: 0.4,    // 400ms - section reveals
  long: 0.6,        // 600ms - page transitions, complex animations
  extraLong: 0.8,   // 800ms - page transitions
};

// Stagger configs
export const staggerConfigs = {
  // Grid stagger (cards reveal one after another)
  grid: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },
  
  // Hero stagger (tight, snappy)
  heroElements: {
    staggerChildren: 0.08,
    delayChildren: 0.05,
  },
  
  // Text stagger (line by line or word by word)
  textLine: {
    staggerChildren: 0.06,
    delayChildren: 0.15,
  },
  
  // Nav links
  navLinks: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },
};

// Animation variants (reusable motion patterns)
export const variants = {
  // Fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: durations.medium },
    },
  },

  // Slide up + fade (scroll reveal)
  slideUpFade: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  },

  // Slide up with overshoot (bouncy)
  slideUpBounce: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.standard,
        ease: easings.snapBounce,
      },
    },
  },

  // Scale in with overshoot (button, badges)
  scaleInBounce: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.short,
        ease: easings.snapBounce,
      },
    },
  },

  // Drop from top (badge)
  dropDown: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.standard,
        ease: easings.snapBounce,
      },
    },
  },

  // Rotate settle (cards landing on page)
  rotateLand: {
    hidden: { opacity: 0, y: 30, rotate: -3 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  },

  // Alternate rotate settle (grid cards)
  rotateAltLand: {
    hidden: { opacity: 0, y: 30, rotate: 3 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  },

  // Color wipe (page transition)
  wipeIn: {
    hidden: { scaleX: 0, opacity: 1 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: durations.long,
        ease: "easeOut",
      },
    },
  },

  // Container for staggered children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },

  // Individual staggered child
  staggerChild: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.fastOutSlowIn,
      },
    },
  },
};

// Hover animations (for use with whileHover)
export const hoverAnimations = {
  // Card lift + shadow grow
  cardLift: {
    y: -4,
    boxShadow: "8px 8px 0px rgba(0, 0, 0, 1)",
    transition: {
      duration: durations.short,
      ease: easings.fastOutSlowIn,
    },
  },

  // Button press
  buttonPress: {
    scale: 0.98,
    boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)",
    transition: {
      duration: durations.micro,
    },
  },

  // Icon pop
  iconPop: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: durations.short,
      ease: easings.snapBounce,
    },
  },

  // Link underline slide
  linkUnderline: {
    textDecoration: "underline",
    textDecorationColor: "currentColor",
    transition: {
      duration: durations.short,
    },
  },
};

// Tap animations (for mobile)
export const tapAnimations = {
  buttonTap: {
    scale: 0.95,
  },
  cardTap: {
    y: -2,
  },
};
