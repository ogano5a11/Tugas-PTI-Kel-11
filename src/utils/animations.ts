import gsap from 'gsap';

export const fadeInUp = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
};

export const fadeIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, delay, ease: 'power2.out' }
  );
};

export const slideInLeft = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
};

export const slideInRight = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
};

export const scaleIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.6, delay, ease: 'back.out' }
  );
};

export const staggerChildren = (parent: HTMLElement | null, delay = 0) => {
  if (!parent) return;
  const children = parent.querySelectorAll('[data-animate]');
  gsap.fromTo(
    children,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay,
      stagger: 0.1,
      ease: 'power2.out',
    }
  );
};

export const pageTransition = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
};
