import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollSave() {
  const location = useLocation();

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(location.pathname);
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      sessionStorage.setItem(location.pathname, currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return null;
}

export default ScrollSave;
