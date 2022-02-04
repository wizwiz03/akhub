import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/games/lower_higher') {
      window.scrollTo(0, document.body.scrollHeight, { behavior: 'smooth' });
    }
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}