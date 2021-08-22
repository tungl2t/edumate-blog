import { useEffect, useState } from 'react';
import { Icon } from '@chakra-ui/icons';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 750) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <Icon
      as={IoIosArrowUp}
      cursor="pointer"
      onClick={scrollToTop}
      color="white"
      position="fixed"
      bottom="75px"
      right="15px"
      background="#B7791F"
      boxShadow="0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f"
      w={{ base: 7, lg: 8 }}
      h={{ base: 7, lg: 8 }}
    />
  ) : null;
};
export default ScrollToTop;
