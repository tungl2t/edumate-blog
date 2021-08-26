import { ReactNode } from 'react';

import ScrollToTop from '@/components/scroll-to-top';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
