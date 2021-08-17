import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import {
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';

import footerStyles from '@/styles/footer.module.sass';
import { getCompaniesByType } from '@/lib/api';
import CompanyType, { ECompanyType } from '@/types/company.type';

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyType>();
  const { locale } = useRouter();

  useEffect(() => {
    const currentLocale = locale === 'en' ? 'en' : 'vi';
    const fetchData = async (locale: string) => {
      let response = (await getCompaniesByType(locale, ECompanyType.OUR_COMPANY)) as CompanyType[];
      setCompanyInfo(response[0]);
    };
    fetchData(currentLocale);
  }, [locale]);

  return (
    <footer className={footerStyles.footer}>
      {companyInfo && (
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
              <Icon as={GoLocation} mr="0.5em" w={5} h={5} />
              <Text display={{ base: 'none', lg: 'block' }}>{companyInfo.address}</Text>
            </a>

            <a href={`tel: ${companyInfo.phone}`} rel="noreferrer">
              <Icon as={AiOutlinePhone} mr="0.5em" w={6} h={6} />
              <Text display={{ base: 'none', lg: 'block' }}>{companyInfo.phone}</Text>
            </a>

            <a href={`mailto: ${companyInfo.email}`} rel="noreferrer">
              <Icon as={AiOutlineMail} mr="0.5em" w={6} h={6} />
              <Text display={{ base: 'none', lg: 'block' }}>{companyInfo.email}</Text>
            </a>

            <a href={companyInfo.facebook} rel="noreferrer" target="_blank">
              <Icon as={AiOutlineFacebook} mr="0.5em" w={6} h={6} />
              <Text display={{ base: 'none', lg: 'block' }}>edumate</Text>
            </a>

            <a href={companyInfo.linkedIn} rel="noreferrer" target="_blank">
              <Icon as={AiOutlineLinkedin} mr="0.5em" w={6} h={6} />
              <Text display={{ base: 'none', lg: 'block' }}>edumate</Text>
            </a>
          </Flex>
        </Box>
      )}
    </footer>
  );
};

export default Footer;
