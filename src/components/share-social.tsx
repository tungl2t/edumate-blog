import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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

type Props = {
  path: string;
};
const ShareSocial = ({ path }: Props) => {
  const t = useTranslations('Shared');
  const [link, setLink] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<string>('');
  const [fbLink, setFbLink] = useState<string>('');
  const [linkedInLink, setLinkedInLink] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const realLink = `${process.env.NEXT_PUBLIC_EDUMATE_URL}${path}`;
    setLink(realLink);
    setFbLink(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(realLink)}`);
    setLinkedInLink(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(realLink)}`,
    );
  }, [path]);

  const onCopyLink = () => {
    setCopiedLink(link);
    navigator.clipboard.writeText(link);
  };

  const onCloseModal = () => {
    setCopiedLink('');
    onClose();
  };

  return (
    <>
      <Box position={'absolute'} top="0.5em" right="1em" zIndex={1}>
        <Tooltip hasArrow label={t('title')} aria-label="A tooltip" shouldWrapChildren>
          <Icon
            as={BsThreeDots}
            w={5}
            h={5}
            color="gray.400"
            zIndex={2}
            onClick={onOpen}
            cursor="pointer"
            _hover={{
              color: 'gray.600',
            }}
          />
        </Tooltip>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        isCentered
        blockScrollOnMount
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent w="150px">
          <Flex direction="row" justifyContent="space-around" alignItems="center" p={2}>
            <Tooltip hasArrow label={t('facebook')} closeOnClick={false} shouldWrapChildren>
              <a href={fbLink} rel="noreferrer" target="_blank">
                <Icon
                  as={AiOutlineFacebook}
                  w={8}
                  h={8}
                  color="gray.400"
                  _hover={{
                    color: 'gray.600',
                  }}
                />
              </a>
            </Tooltip>
            <Tooltip hasArrow label={t('linkedIn')} closeOnClick={false} shouldWrapChildren>
              <a href={linkedInLink} rel="noreferrer" target="_blank">
                <Icon
                  as={AiOutlineLinkedin}
                  w={8}
                  h={8}
                  color="gray.400"
                  _hover={{
                    color: 'gray.600',
                  }}
                />
              </a>
            </Tooltip>
            <Tooltip
              hasArrow
              label={copiedLink ? t('copied') : t('copy')}
              closeOnClick={false}
              shouldWrapChildren
            >
              <Icon
                as={AiOutlineLink}
                w={8}
                h={8}
                color="gray.400"
                cursor="pointer"
                _hover={{
                  color: 'gray.600',
                }}
                onClick={onCopyLink}
              />
            </Tooltip>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareSocial;
