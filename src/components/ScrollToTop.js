import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/games/lower_higher') {
      window.scrollTo({ bottom: 0, behavior: 'smooth' });
    }
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}