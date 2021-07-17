import { ReactNode } from 'react';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Layout;
