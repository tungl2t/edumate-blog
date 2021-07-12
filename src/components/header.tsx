import { Box, Flex, Image } from '@chakra-ui/react';
import NextLink from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { useRouter } from 'next/router';

const Header = () => {
  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <Box
      height="60px"
      background="black"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      boxShadow="0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f"
      zIndex={2}
    >
      <Flex
        direction="row"
        w="1000px"
        maxW="90%"
        h="100%"
        m="auto"
        align="center"
        justify="space-between"
      >
        <NextLink href="/">
          <a>
            <Image src="/edumate-logo.png" maxH="20px" alt="edumate" />
          </a>
        </NextLink>
        <Flex direction="row" ml="1em" color="white">
          {NAV_LINKS.map((item) => (
            <NextLink href={item.link} key={item.link}>
              <Box
                cursor="pointer"
                mx="0.5em"
                fontSize="1.15em"
                color={asPath.indexOf(item.link) === 0 ? ' #e1782f' : ''}
                _hover={{
                  transition: 'all .25s ease-in-out',
                  color: ' #e1782f',
                }}
              >
                {item.label}
              </Box>
            </NextLink>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
