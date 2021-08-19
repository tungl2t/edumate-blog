import { ReactNode } from 'react';
import NextLink from 'next/link';

type Props = {
  path: string;
  children?: ReactNode;
};

export const EdumateLink = ({ path, children }: Props) => {
  return path ? <NextLink href={path}>{children}</NextLink> : <>{children}</>;
};
