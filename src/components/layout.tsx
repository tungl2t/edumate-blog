import { ReactNode, useEffect, useState } from 'react';
import { Progress } from '@chakra-ui/react';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', () => setIsLoading(false));
  }, []);

  return (
    <>
      <Header />
      {isLoading && (
        <Progress
          size="xs"
          colorScheme="yellow"
          isIndeterminate
          position="fixed"
          top="60px"
          zIndex={2}
          w="100%"
        />
      )}
      <main>{children}</main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Layout;
