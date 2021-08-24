import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
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
import { useTranslations } from 'next-intl';
import { createSubscriber } from '@/lib/api/subscriber.api';

const Footer = () => {
  const t = useTranslations('Footer');
  const [companyInfo, setCompanyInfo] = useState<CompanyType>();
  const [email, setEmail] = useState('');
  const { locale } = useRouter();

  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (e: string) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(e);
  };

  useEffect(() => {
    if (email) {
      setErrorMessage('');
    }
  }, [email]);

  const createSubscriberApi = async (subscriberEmail: string) => {
    if (!email) {
      return;
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setErrorMessage('inValidEmail');
      return;
    }
    try {
      const response = await createSubscriber(subscriberEmail);
      setResults(response);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('existedEmail');
    }
  };

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
      <Box
        height={{ base: 'auto', lg: '70px' }}
        display="flex"
        justifyContent="center"
        boxShadow="0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f"
      >
        <Flex
          w={{ base: '95%', lg: '960px' }}
          direction={{ base: 'column', lg: 'row' }}
          m="auto"
          align={{ base: 'start', lg: 'center' }}
          justifyContent="space-between"
          p="5px 0"
        >
          <Text
            color="blue.800"
            fontSize={{ base: 16, sm: 18 }}
            fontWeight={700}
            w={{ base: '100%', lg: '40%' }}
            my="10px"
            align="center"
          >
            {t('title')}
          </Text>
          <Box w={{ base: '100%', lg: '50%' }} mx={{ base: 0, lg: '5px' }}>
            <Input
              color="blue.800"
              variant="outline"
              w="100%"
              placeholder="Email"
              isInvalid={!!errorMessage}
              errorBorderColor="yellow.600"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errorMessage && (
              <Text fontSize="12px" color="yellow.600" fontStyle="italic">
                {t(errorMessage)}
              </Text>
            )}
          </Box>
          <Button
            variant="outline"
            my="10px"
            color="blue.800"
            w={{ base: '100%', lg: '10%' }}
            disabled={!email}
            onClick={() => createSubscriberApi(email)}
          >
            {t('submit')}
          </Button>
        </Flex>
      </Box>
      {companyInfo && (
        <Box
          height={{ base: 'auto', lg: '60px' }}
          background="black"
          width="100%"
          boxShadow="0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f"
          zIndex={2}
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            w={{ base: '95%', lg: '960px' }}
            h="100%"
            m="auto"
            alignItems={{ base: 'start', lg: 'center' }}
            justifyContent="space-between"
            p={{ base: '10px', lg: 0 }}
          >
            <a href="https://goo.gl/maps/BhGWXs9DXQKHfyuk6" rel="noreferrer" target="_blank">
              <Icon as={GoLocation} mr="0.5em" w={5} h={5} />
              <Text>{companyInfo.address}</Text>
            </a>

            <a href={`tel: ${companyInfo.phone}`} rel="noreferrer">
              <Icon as={AiOutlinePhone} mr="0.5em" w={6} h={6} />
              <Text>{companyInfo.phone}</Text>
            </a>

            <a href={`mailto: ${companyInfo.email}`} rel="noreferrer">
              <Icon as={AiOutlineMail} mr="0.5em" w={6} h={6} />
              <Text>{companyInfo.email}</Text>
            </a>

            <a href={companyInfo.facebook} rel="noreferrer" target="_blank">
              <Icon as={AiOutlineFacebook} mr="0.5em" w={6} h={6} />
              <Text>edumate</Text>
            </a>

            <a href={companyInfo.linkedIn} rel="noreferrer" target="_blank">
              <Icon as={AiOutlineLinkedin} mr="0.5em" w={6} h={6} />
              <Text>edumate</Text>
            </a>
          </Flex>
        </Box>
      )}
    </footer>
  );
};

export default Footer;
