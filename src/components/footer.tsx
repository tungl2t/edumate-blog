import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Box, Button, Collapse, Flex, Input, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { Icon, SmallCloseIcon } from '@chakra-ui/icons';
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
import { createSubscriber } from '@/lib/api/subscriber.api';

const Footer = () => {
  const t = useTranslations('Footer');
  const [companyInfo, setCompanyInfo] = useState<CompanyType>();
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const validateEmail = (e: string) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(e);
  };

  useEffect(() => {
    if (email) {
      setHasError(false);
    }
  }, [email]);

  const createSubscriberApi = async (subscriberEmail: string) => {
    if (!email) {
      return;
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setHasError(true);
      return;
    }
    try {
      setIsLoading(true);
      await createSubscriber(subscriberEmail.trim());
    } catch (e) {
    } finally {
      setResult('done');
      setHasError(false);
      setIsLoading(false);
      onToggle();
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
      <Collapse in={isOpen} animateOpacity>
        <Box
          height={{ base: 'auto', lg: '65px' }}
          display={'flex'}
          justifyContent="center"
          alignItems="center"
          boxShadow="dark-lg"
          px={10}
          position="relative"
        >
          <Text
            color="blue.800"
            fontSize={{ base: 16, sm: 18 }}
            fontWeight={700}
            w={{ base: '100%', lg: '40%' }}
            my="10px"
            align="center"
          >
            {t('thankForSubscribing')}
          </Text>
          <SmallCloseIcon
            w={5}
            h={5}
            onClick={onToggle}
            cursor="pointer"
            color="gray.500"
            position="absolute"
            right="10%"
            top="calc(50% - 10px)"
          />
        </Box>
      </Collapse>
      {!result && (
        <Box
          height={{ base: 'auto', lg: '65px' }}
          display={'flex'}
          justifyContent="center"
          boxShadow="dark-lg"
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
              <Tooltip
                hasArrow
                label={t('inValidEmail')}
                aria-label="A tooltip"
                isDisabled={!hasError}
              >
                <Input
                  color="blue.800"
                  variant="outline"
                  w="100%"
                  placeholder="Email"
                  isInvalid={hasError}
                  errorBorderColor="yellow.600"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Tooltip>
            </Box>
            <Button
              isLoading={isLoading}
              loadingText={t('submitting') as string}
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
      )}
      {companyInfo && (
        <Box
          height={{ base: 'auto', lg: '60px' }}
          background="black"
          width="100%"
          boxShadow="dark-lg"
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
            <a href={companyInfo.addressMapLink} rel="noreferrer" target="_blank">
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
