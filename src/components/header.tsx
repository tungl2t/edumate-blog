import { Box, Flex, Image } from '@chakra-ui/react';
import NextLink from 'next/link';

const Header = () => {
  return (
    <Box
      height="60px"
      background="gray.800"
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
        maxW="95%"
        h="100%"
        m="auto"
        align="center"
        justify="space-between"
      >
        <NextLink href="/">
          <a>
            <Image src="/edumate-logo.png" height="20px" alt="edumate" />
          </a>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Header;
