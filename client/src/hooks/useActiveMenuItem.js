import { useLocation } from 'react-router-dom';

const useActiveMenuItem = (link, children, exact = false) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const isActive = exact ? currentLocation === link : currentLocation.startsWith(link);

  if (children && Array.isArray(children)) {
    children?.forEach((child) => {
      const childLink = child?.props?.link;
      if (currentLocation.startsWith(childLink)) {
        return true;
      }
    });
  }
  return isActive;
};

export default useActiveMenuItem;
