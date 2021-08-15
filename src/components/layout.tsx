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
  return (
    <>
      <main>{children}</main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Layout;
