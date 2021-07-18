import { ReactNode } from 'react';
import { AspectRatio, Box, Flex, Heading, Img } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { BsBoxArrowInRight } from 'react-icons/bs';

import { EdumateLink } from '@/components/edumate-link';

type Props = {
  title: string;
  href: string;
  imageUrl: string;
  children?: ReactNode;
};

const Preview = ({ title, href, imageUrl, children }: Props) => {
  return (
    <EdumateLink href={href}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        _hover={{
          boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
        }}
        cursor={href ? 'pointer' : ''}
        border="1px solid"
        borderColor="gray.200"
        my="1em"
        w={{ base: '95%', lg: '960px' }}
      >
        <AspectRatio ratio={4 / 3} flex={{ base: '100%', md: '40%' }}>
          <Img src={imageUrl} alt={title} />
        </AspectRatio>
        <Box
          position="relative"
          display="flex"
          flex={{ base: '100%', md: '60%' }}
          flexDirection="column"
          justifyContent="center"
          p={{ base: '1.25em', sm: '1.5em' }}
        >
          <Flex direction="row" justifyContent="start" alignItems="center" mb="5px">
            <Heading fontSize={{ base: '1.25em' }} color="blue.800" mt={{ base: '1em', '2md': 0 }}>
              {title} {href && <Icon as={BsBoxArrowInRight} color="gray.500" ml="5px" />}
            </Heading>
          </Flex>
          {children}
        </Box>
      </Flex>
    </EdumateLink>
  );
};

export default Preview;
