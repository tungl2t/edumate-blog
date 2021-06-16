import Header from '@/components/header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header
        changeSearchString={(event) => {
          console.log(event);
        }}
      />
      <main>{children}</main>
    </>
  );
};

export default Layout;
