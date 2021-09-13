import Image from 'next/image';
import { ReactNode } from 'react';
import { AspectRatio, Box, Flex, Heading } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { BsBoxArrowInRight } from 'react-icons/bs';

import { EdumateLink } from '@/components/edumate-link';
import ShareSocial from '@/components/share-social';
import { FormatImages } from '@/types/shared';

type Props = {
  title: string;
  path: string;
  formatImages: FormatImages;
  children?: ReactNode;
};

const Preview = ({ title, path, formatImages, children }: Props) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      _hover={{
        boxShadow: 'md',
      }}
      border="1px solid"
      borderColor="gray.200"
      my="1em"
      w={{ base: '95vw', lg: '960px' }}
    >
      <EdumateLink path={path}>
        <AspectRatio
          ratio={4 / 3}
          flex={{ base: '100%', md: '40%' }}
          cursor={path ? 'pointer' : ''}
        >
          <Image
            src={formatImages.url}
            alt={title}
            layout="fill"
            objectFit="cover"
            placeholder={formatImages.small ? 'blur' : 'empty'}
            blurDataURL={formatImages.small}
          />
        </AspectRatio>
      </EdumateLink>
      <Box
        position="relative"
        display="flex"
        flex={{ base: '100%', md: '60%' }}
        flexDirection="column"
        justifyContent="center"
        p={{ base: '1.25em', sm: '1.5em' }}
      >
        {path && <ShareSocial path={path} />}
        <EdumateLink path={path}>
          <Flex
            direction="row"
            justifyContent="start"
            alignItems="center"
            mb="5px"
            cursor={path ? 'pointer' : ''}
          >
            <Heading fontSize={{ base: '1.25em' }} color="blue.800" mt={{ base: '10px', '2md': 0 }}>
              {title} {path && <Icon as={BsBoxArrowInRight} color="gray.500" ml="5px" />}
            </Heading>
          </Flex>
        </EdumateLink>
        {children}
      </Box>
    </Flex>
  );
};

export default Preview;
