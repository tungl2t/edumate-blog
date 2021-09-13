import Image from 'next/image';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Box, Flex, useMediaQuery, useOutsideClick } from '@chakra-ui/react';

import headerStyles from '@/styles/header.module.sass';
import { getPages } from '@/lib/api';
import PageType from '@/types/page.type';

const Header = () => {
  const [navigations, setNavigations] = useState<PageType[]>();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isLargerThan2Md] = useMediaQuery('(min-width: 896px)');
  const { asPath, locale, locales } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);
  const localeIcon = locale === 'en' ? '/flags/vi.svg' : '/flags/us.svg';

  useEffect(() => {
    const currentLocale = locale === 'en' ? 'en' : 'vi';
    const fetchData = async (locale: string) => {
      let response = (await getPages(locale)) as PageType[];
      setNavigations(response);
    };
    fetchData(currentLocale);
  }, [locale]);

  useEffect(() => {
    if (isLargerThan2Md) {
      setIsOpenSideBar(false);
    }
  }, [isLargerThan2Md]);

  useOutsideClick({
    ref: ref,
    handler: (e: Event | any) => {
      if (!isLargerThan2Md) {
        const className = e?.target?.className ?? '';
        const clickedHamburgerMenu =
          typeof className === 'string' &&
          (className.includes('spinner') || className.includes('sidebarIconToggle'));
        if (isOpenSideBar && !clickedHamburgerMenu) {
          setIsOpenSideBar(false);
        }
      }
    },
  });

  return (
    <header>
      <Box
        height="60px"
        background="black"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        boxShadow="dark-lg"
        zIndex={2}
      >
        <Flex
          direction="row"
          w={{ base: '95%', lg: '960px' }}
          h="100%"
          m="auto"
          align="center"
          justify="space-between"
        >
          <NextLink href="/">
            <Box cursor="pointer">
              <a>
                <Image src="/edumate-logo.png" alt="edumate" height={50} width={150} />
              </a>
            </Box>
          </NextLink>
          <Flex
            direction="row"
            color="white"
            justifyContent="center"
            alignItems="center"
            display={{ '2md': 'flex', base: 'none' }}
          >
            {navigations?.length &&
              navigations.map((nav) => (
                <NextLink href={nav.path} key={nav.path}>
                  <Box
                    cursor="pointer"
                    mx="10px"
                    color={asPath.indexOf(nav.path) === 0 ? 'yellow.600' : ''}
                    _hover={{
                      transition: 'all .25s ease-in-out',
                      color: 'yellow.600',
                    }}
                  >
                    {nav.name}
                  </Box>
                </NextLink>
              ))}
            {asPath !== '/blog' && (
              <NextLink href={asPath} locale={otherLocale} scroll={false}>
                <Box ml={2} mt={2}>
                  <a>
                    {' '}
                    <Image src={localeIcon} alt="language" width={35} height={35} />
                  </a>
                </Box>
              </NextLink>
            )}
          </Flex>
          <Box
            className={headerStyles.hamburgerMenu}
            position="relative"
            zIndex={2}
            display={{ '2md': 'none', base: 'block' }}
          >
            <input
              key={Math.random()}
              type="checkbox"
              id="openSidebarMenu"
              defaultChecked={isOpenSideBar}
              onChange={() => {
                setIsOpenSideBar(!isOpenSideBar);
              }}
            />
            <label className={headerStyles.sidebarIconToggle} htmlFor="openSidebarMenu">
              <div
                className={`${headerStyles.spinner} ${headerStyles.diagonal} ${headerStyles['part-1']}`}
              />
              <div className={`${headerStyles.spinner} ${headerStyles.horizontal}`} />
              <div
                className={`${headerStyles.spinner} ${headerStyles.diagonal} ${headerStyles['part-2']}`}
              />
            </label>
          </Box>
        </Flex>
        <Box
          className={`${headerStyles.rightSideBar} ${isOpenSideBar ? headerStyles.expanded : ''}`}
          position="absolute"
          right={0}
          top={0}
          h="100vh"
          background="black"
          color="white"
          ref={ref}
        >
          <Flex
            direction="column"
            color="white"
            fontSize={{ base: '1.35em', sm: '1.5em' }}
            justifyContent="center"
            alignItems="center"
            h="100%"
            py="30%"
          >
            {navigations?.length &&
              navigations.map((nav) => (
                <NextLink href={nav.path} key={nav.path}>
                  <Box
                    cursor="pointer"
                    my="0.5em"
                    color={asPath.indexOf(nav.path) === 0 ? 'yellow.600' : ''}
                    _hover={{
                      transition: 'all .25s ease-in-out',
                      color: 'yellow.600',
                    }}
                    onClick={() => {
                      setIsOpenSideBar(false);
                    }}
                  >
                    {nav.name}
                  </Box>
                </NextLink>
              ))}
            {asPath !== '/blog' && (
              <NextLink href={asPath} locale={otherLocale} scroll={false}>
                <Box my="0.5em">
                  <a>
                    {' '}
                    <Image
                      src={localeIcon}
                      alt="language"
                      width={50}
                      height={50}
                      onClick={() => {
                        setIsOpenSideBar(false);
                      }}
                    />
                  </a>
                </Box>
              </NextLink>
            )}
          </Flex>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
