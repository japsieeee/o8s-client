'use client';

import { useEffect } from 'react';

export default function useNavbarHeight() {
  useEffect(() => {
    const navbar = document.querySelector('nav'); // assuming your MainNavbar renders a <nav>
    if (!navbar) return;

    const setHeight = () => {
      const h = navbar.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--navbar-height', `${h}px`);
    };

    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);
}
