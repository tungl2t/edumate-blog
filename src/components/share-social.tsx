import {
  Box,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineFacebook, AiOutlineLink, AiOutlineLinkedin } from 'react-icons/ai';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  path: string;
};
const ShareSocial = ({ path }: Props) => {
  const [link, setLink] = useState<string>('');
  const [fbLink, setFbLink] = useState<string>('');
  const [linkedinLink, setLinkedInLink] = useState<string>('');

  useEffect(() => {}, [path]);
  const t = useTranslations('Shared');
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box position={'absolute'} top="0.5em" right="1em" zIndex={1}>
        <Tooltip label={t('title')} aria-label="A tooltip" shouldWrapChildren>
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered blockScrollOnMount>
        <ModalOverlay />
        <ModalContent w="150px">
          <Flex direction="row" justifyContent="space-around" alignItems="center" p={2}>
            <a
              href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_EDUMATE_URL}${path}`}
              rel="noreferrer"
              target="_blank"
            >
              <Icon as={AiOutlineFacebook} w={8} h={8} color="gray.600" />
            </a>
            <a href="" rel="noreferrer" target="_blank">
              <Icon as={AiOutlineLinkedin} w={8} h={8} color="gray.600" />
            </a>
            <Tooltip label="I don't close on click" closeOnClick={false} shouldWrapChildren>
              <Icon as={AiOutlineLink} w={8} h={8} color="gray.600" />
            </Tooltip>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareSocial;
