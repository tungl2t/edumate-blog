import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { ChangeEvent, useState } from 'react';

type Props = {
  changeSearchString: (value: string) => void;
};

const Header = ({ changeSearchString }: Props) => {
  const [searchString, setSearchString] = useState('');

  const handleChange = (event: ChangeEvent) => {
    setSearchString(event.target.value);
    changeSearchString(searchString);
  };
  return (
    <Box
      height="60px"
      background="white"
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
        <InputGroup ml="1em">
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <InputRightElement pointerEvents="none" children={<CloseIcon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search posts"
            value={searchString}
            onChange={handleChange}
          />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default Header;
