import { Box, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import footerStyles from '@/styles/footer.module.sass';
import {
  AiOutlineFacebook,
  AiOutlineHome,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('AboutUs');
  return (
    <footer className={footerStyles.footer}>
      <Box
        height="60px"
        background="black"
        width="100%"
        boxShadow="0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f"
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
          <a href="https://goo.gl/maps/BhGWXs9DXQKHfyuk6" rel="noreferrer" target="_blank">
            <Icon as={AiOutlineHome} mr="0.5em" w={6} h={6} />
            <Text display={{ base: 'none', lg: 'block' }}>{t('home')}</Text>
          </a>

          <a href="tel: +84375131700" rel="noreferrer">
            <Icon as={AiOutlinePhone} mr="0.5em" w={6} h={6} />
            <Text display={{ base: 'none', lg: 'block' }}>+84 37 513 17 00</Text>
          </a>

          <a href="mailto: edumatevn@gmail.com" rel="noreferrer">
            <Icon as={AiOutlineMail} mr="0.5em" w={6} h={6} />
            <Text display={{ base: 'none', lg: 'block' }}>edumatevn@gmail.com</Text>
          </a>

          <a href="https://facebook.com/edumate.vn" rel="noreferrer" target="_blank">
            <Icon as={AiOutlineFacebook} mr="0.5em" w={6} h={6} />
            <Text display={{ base: 'none', lg: 'block' }}>edumate</Text>
          </a>

          <a href="https://www.linkedin.com/company/edumate-vn" rel="noreferrer" target="_blank">
            <Icon as={AiOutlineLinkedin} mr="0.5em" w={6} h={6} />
            <Text display={{ base: 'none', lg: 'block' }}>edumate</Text>
          </a>
        </Flex>
      </Box>
    </footer>
  );
};

export default Footer;
