import Header from '@/components/header';
import { debounce } from 'lodash-es';
import React, { useCallback, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const MyContext = React.createContext<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const handleSearchString = (event: string) => {
    // const debouncedSearchString = debounce(() => console.log(event), 1000),
    //   [];
    // debouncedSearchString();
    setSearchString(event);
  };
  return (
    <>
      <Header changeSearchString={handleSearchString} />
      <MyContext.Provider value={searchString}>
        <main>{children}</main>
      </MyContext.Provider>
    </>
  );
};

export default Layout;
