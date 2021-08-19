import { ReactNode } from 'react';
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Img,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { BsBoxArrowInRight, BsThreeDots } from 'react-icons/bs';

import { EdumateLink } from '@/components/edumate-link';
import {
  AiOutlineFacebook,
  AiOutlineLink,
  AiOutlineLinkedin,
  AiOutlinePhone,
} from 'react-icons/ai';

type Props = {
  title: string;
  href: string;
  imageUrl: string;
  children?: ReactNode;
};

const Preview = ({ title, href, imageUrl, children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      _hover={{
        boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
      }}
      border="1px solid"
      borderColor="gray.200"
      my="1em"
      w={{ base: '95vw', lg: '960px' }}
    >
      <EdumateLink href={href}>
        <AspectRatio
          ratio={4 / 3}
          flex={{ base: '100%', md: '40%' }}
          cursor={href ? 'pointer' : ''}
        >
          <Img src={imageUrl} alt={title} />
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
        <Box position={'absolute'} top="0.5em" right="1em" zIndex={1}>
          <Tooltip label="Share post!" aria-label="A tooltip" shouldWrapChildren>
            <Icon
              as={BsThreeDots}
              w={5}
              h={5}
              color="gray.500"
              zIndex={2}
              onClick={onOpen}
              cursor="pointer"
            />
          </Tooltip>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent w="150px">
            <Flex direction="row" justifyContent="space-around" alignItems="center" p={2}>
              <a
                href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_EDUMATE_URL}${href}`}
                rel="noreferrer"
                target="_blank"
              >
                <Icon as={AiOutlineFacebook} mr="0.5em" w={8} h={8} color="gray.600" />
              </a>
              <a href="" rel="noreferrer" target="_blank">
                <Icon as={AiOutlineLinkedin} mr="0.5em" w={8} h={8} color="gray.600" />
              </a>
              <a href="" rel="noreferrer" target="_blank">
                <Icon as={AiOutlineLink} mr="0.5em" w={8} h={8} color="gray.600" />
              </a>
            </Flex>
          </ModalContent>
        </Modal>
        <EdumateLink href={href}>
          <Flex
            direction="row"
            justifyContent="start"
            alignItems="center"
            mb="5px"
            cursor={href ? 'pointer' : ''}
          >
            <Heading fontSize={{ base: '1.25em' }} color="blue.800" mt={{ base: '10px', '2md': 0 }}>
              {title} {href && <Icon as={BsBoxArrowInRight} color="gray.500" ml="5px" />}
            </Heading>
          </Flex>
        </EdumateLink>
        {children}
      </Box>
    </Flex>
  );
};

export default Preview;
