/**
 * Central GSAP setup.
 * Registers plugins once so every module imports from here instead of
 * re-registering. Keeps the scroll-animation language consistent.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
