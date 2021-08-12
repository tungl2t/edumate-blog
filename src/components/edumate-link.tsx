import { ReactNode } from 'react';
import NextLink from 'next/link';

type Props = {
  href: string;
  children?: ReactNode;
};

export const EdumateLink = ({ href, children }: Props) => {
  return href ? <NextLink href={href}>{children}</NextLink> : <>{children}</>;
};
