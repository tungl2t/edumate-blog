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
      color="black"
      position="fixed"
      bottom="70px"
      right="30px"
      background="blackAlpha.50"
      w={{ base: 7, lg: 8 }}
      h={{ base: 7, lg: 8 }}
    />
  ) : null;
};
export default ScrollToTop;
