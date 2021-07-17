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
      color="gray.600"
      position="fixed"
      bottom="45px"
      right="5px"
      w={{ base: 6, sm: 7, lg: 8 }}
      h={{ base: 6, sm: 7, lg: 8 }}
      borderRadius="full"
      boxShadow="0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f"
    />
  ) : null;
};
export default ScrollToTop;
