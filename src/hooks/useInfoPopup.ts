import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useInfoPopup = () => {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const allowedPaths = ['/', '/simulacao'];

    if (allowedPaths.includes(currentPath)) {
      const storageKey = `popup_seen_${currentPath.replace('/', 'home')}`;
      const hasSeenPopup = localStorage.getItem(storageKey);

      if (!hasSeenPopup) {
        setIsInfoPopupOpen(true);
      }
    }
  }, [location.pathname]);

  const closePopup = () => {
    const currentPath = location.pathname;
    const storageKey = `popup_seen_${currentPath.replace('/', 'home')}`;
    localStorage.setItem(storageKey, 'true');
    setIsInfoPopupOpen(false);
  };

  return { isInfoPopupOpen, closePopup, setIsInfoPopupOpen };
};
