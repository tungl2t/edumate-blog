import { ReactNode, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import html2canvas from 'html2canvas';
import PdfConverter from 'jspdf';

type Props = {
  isValidData: boolean;
  handleData: Function;
  children: ReactNode;
  info: string[];
  buttonLabel?: string;
};

const EvaluationModal = ({ isValidData, handleData, children, info, buttonLabel }: Props) => {
  const t = useTranslations('EvaluationTool');
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderImageOrPdf = (isPDF = true) => {
    html2canvas(ref.current as HTMLElement).then((canvas) => {
      const orientation = window.innerWidth > window.innerHeight ? 'l' : 'p';
      const img = canvas.toDataURL('image/png');
      if (isPDF) {
        const pdf = new PdfConverter(orientation, 'px', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;
        const marginX = (pageWidth - canvasWidth) / 2;
        const marginY = (pageHeight - canvasHeight) / 2;

        pdf.addImage(img, 'png', marginX, marginY, canvasWidth, canvasHeight);
        pdf.save('evaluation.pdf');
      } else {
        const a = document.createElement('a');
        a.href = img;
        a.download = 'evalutation.png';
        a.click();
      }
    });
  };

  return (
    <>
      <Button
        mt="20px"
        colorScheme="white"
        fontSize="0.95em"
        w="100%"
        bg="yellow.600"
        variant="solid"
        onClick={() => {
          handleData();
          onOpen();
        }}
        disabled={!isValidData}
      >
        {buttonLabel ? buttonLabel : t('submit')}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="5xl"
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent w="95%">
          <ModalCloseButton />
          <ModalBody maxH="80vh" overflowY="auto">
            <Box ref={ref}>
              <Box ml={5} mt="10px">
                {info.map((i) => (
                  <Text fontSize={{ base: '0.8em', sm: '0.85em' }} color="gray.600" key={i}>
                    {i}
                  </Text>
                ))}
              </Box>

              {children}
            </Box>
            <Flex direction="row" justifyContent="center" mb="10px">
              <ButtonGroup
                size="sm"
                isAttached
                variant="outline"
                onClick={() => renderImageOrPdf()}
                mr="5px"
              >
                <Button>{t('save')} (PDF) </Button>
                <IconButton aria-label="Save Result PNG" icon={<DownloadIcon />} />
              </ButtonGroup>
              <ButtonGroup
                size="sm"
                isAttached
                variant="outline"
                onClick={() => renderImageOrPdf(false)}
                ml="5px"
              >
                <Button>{t('save')} (PNG) </Button>
                <IconButton aria-label="Save Result PNG" icon={<DownloadIcon />} />
              </ButtonGroup>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EvaluationModal;
