import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement these — framer-motion's `whileInView`/viewport
// features (and any component using them) need at least a no-op stub.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!globalThis.IntersectionObserver) globalThis.IntersectionObserver = MockObserver
if (!globalThis.ResizeObserver) globalThis.ResizeObserver = MockObserver

if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false
    },
  })
}
