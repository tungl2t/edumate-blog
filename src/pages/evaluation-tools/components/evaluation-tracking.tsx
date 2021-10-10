import EvaluationDigitalSkillType from '@/types/evaluation-digital-skill.type';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Circle,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { registerEvaluationUser, verifyVerificationCode } from '@/lib/api/evaluation-user.api';
import { createUserEvaluationTracking, findByEvaluationId } from '@/lib/api';

const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';

type Props = {
  evaluationId: number;
  evaluationDigitalSkills: EvaluationDigitalSkillType[];
};
const EvaluationTracking = ({ evaluationId, evaluationDigitalSkills }: Props) => {
  const [token, setToken] = useState<string | undefined>('');
  const [email, setEmail] = useState<string>('');
  const [userEvaluationId, setUserEvaluationId] = useState<number | undefined>(undefined);
  const [userEvaluation, setUserEvaluation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [hasVerificationCode, setHasVerificationCode] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  const [verificationStep, setVerificationStep] = useState<number>(0);
  const [questionAnswers, setQuestionAnswers] = useState<number[][][]>([]);
  const [digitalSkillIds, setDigitalSkillIds] = useState<number[]>([]);
  useEffect(() => {
    const token = Cookies.get(ACCESS_TOKEN);
    const userInfo = Cookies.get(USER_INFO);
    setToken(token);
    setUserEvaluation(userInfo);
    const initQuestionAnswer = evaluationDigitalSkills.map((digitalSkill) =>
      digitalSkill.digitalSkillQuestions.map((question) => [parseInt(question.id, 10), 0]),
    );
    setQuestionAnswers(initQuestionAnswer);
    setDigitalSkillIds(
      evaluationDigitalSkills.map((digitalSkillIds) => parseInt(digitalSkillIds.id, 10)),
    );
  }, []);

  useEffect(() => {
    if (token && evaluationId) {
      const fetchData = async () => {
        const data = await findByEvaluationId(token, evaluationId);
      };
      fetchData();
    }
  }, [token, evaluationId]);

  useEffect(() => {
    if (email) {
      setHasError(false);
    }
  }, [email]);

  const handleAnswerValues = async (
    answerId: number,
    digitalSkillQuestionId: number,
    digitalSkillId: number,
  ) => {
    if (!token) {
      return;
    }
    try {
      const data = await createUserEvaluationTracking(
        token,
        evaluationId,
        digitalSkillId,
        digitalSkillQuestionId,
        answerId,
      );
    } catch (e) {}
  };

  const createEvaluationUser = async (evaluationUserEmail: string) => {
    if (!email) {
      return;
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setHasError(true);
      return;
    }
    if (isLoading) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const data = (await registerEvaluationUser(evaluationUserEmail.trim())) as any;
      setUserEvaluationId(data.userEvaluationId);
      setHasVerificationCode(true);
      setVerificationStep(1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setHasError(false);
    }
  };

  const verifyCode = async (verificationCode: string) => {
    const intVerificationCode = parseInt(verificationCode, 10);
    if (!intVerificationCode) {
      return;
    }
    if (isLoading) {
      setIsLoading(false);
      return;
    }
    if (!userEvaluationId) {
      return;
    }
    try {
      setIsLoading(true);
      const data = (await verifyVerificationCode(userEvaluationId, intVerificationCode)) as any;
      const { accessToken, userInfo } = data;
      Cookies.set(ACCESS_TOKEN, accessToken, { expires: 1 });
      Cookies.set(USER_INFO, userInfo, { expires: 1 });
      setToken(accessToken);
      setUserEvaluation(userInfo);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (e: string) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(e);
  };

  return (
    <>
      {token ? (
        <Accordion allowToggle>
          {evaluationDigitalSkills?.map((digitalSkill, digitalSkillIndex) => (
            <AccordionItem key={digitalSkill.name}>
              <AccordionButton display="flex" justifyContent="space-between" py={0} px={1}>
                <Text
                  textTransform="uppercase"
                  fontSize={{ base: '1rem', sm: '1.15rem' }}
                  color="blue.800"
                  fontWeight="600"
                  pt="5px"
                  fontFamily="Gilroy-Medium, sans-serif"
                >
                  {digitalSkill.name} ({digitalSkill?.digitalSkillQuestions?.length}/
                  {digitalSkill?.digitalSkillQuestions?.length})
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={1}>
                <Box
                  fontSize={{ base: '0.85rem', sm: '0.95rem' }}
                  color="blue.800"
                  textAlign="justify"
                  mb={3}
                  dangerouslySetInnerHTML={{ __html: digitalSkill.desc }}
                />
                <Accordion allowToggle>
                  {digitalSkill?.digitalSkillQuestions.map(
                    (digitalSkillQuestion, digitalSkillQuestionIndex) => (
                      <AccordionItem key={digitalSkillQuestion.name}>
                        <AccordionButton display="flex" justifyContent="space-between" p={1}>
                          <Box display="flex" justifyContent="center" alignItems="center">
                            <Circle size="25px" bg="yellow.600">
                              <Text fontWeight="bold" color="#fff" fontSize="0.6rem" pt="2px">
                                {digitalSkillQuestionIndex + 1}
                              </Text>
                            </Circle>
                            <Text
                              textAlign="left"
                              ml={2}
                              pt="3px"
                              fontWeight="600"
                              fontSize={{ base: '0.85rem', sm: '0.9rem' }}
                              fontFamily="Gilroy-Medium, sans-serif"
                            >
                              {digitalSkillQuestion.name}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={1} pl={2}>
                          <Box
                            fontSize={{ base: '0.75rem', sm: '0.8rem' }}
                            color="gray.600"
                            fontStyle="italic"
                            textAlign="justify"
                            mb={3}
                            dangerouslySetInnerHTML={{ __html: digitalSkillQuestion.desc }}
                          />

                          {digitalSkillQuestion?.digitalSkillQuestionAnswers?.map(
                            (answer, index) => (
                              <Box
                                w="100%"
                                p={2}
                                key={answer.name}
                                cursor="pointer"
                                my="5px"
                                border="1px solid"
                                borderColor="gray.200"
                                borderRadius="5px"
                                fontSize={{ base: '0.8rem', sm: '0.9rem' }}
                                fontFamily="Gilroy-Medium, sans-serif"
                                _hover={{
                                  transition: 'all .25s ease-in-out',
                                  background: 'yellow.600',
                                  color: 'white',
                                }}
                                onClick={() =>
                                  handleAnswerValues(
                                    parseInt(answer.id, 10),
                                    parseInt(digitalSkillQuestion.id, 10),
                                    parseInt(digitalSkill.id, 10),
                                  )
                                }
                                dangerouslySetInnerHTML={{ __html: answer.name }}
                              />
                            ),
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Box
          w={{ base: '100%' }}
          minH="50vh"
          mx={{ base: 0, lg: '5px' }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Accordion allowToggle index={verificationStep}>
            <AccordionItem isDisabled={hasVerificationCode}>
              <AccordionButton display="flex" justifyContent="space-between" p={1} cursor="auto">
                <Box display="flex" alignItems="center" w={{ base: '100%', sm: '550px' }}>
                  <Circle size="35px" bg="yellow.600">
                    <Text fontWeight="bold" color="#fff" fontSize="0.75rem" pt="2px">
                      1
                    </Text>
                  </Circle>
                  <Text
                    textAlign="left"
                    ml={2}
                    pt="3px"
                    fontWeight="600"
                    fontSize={{ base: '0.9rem', sm: '1rem' }}
                    fontFamily="Gilroy-Medium, sans-serif"
                  >
                    Bạn cần đăng nhập trước khi làm bài đánh giá
                  </Text>
                </Box>
              </AccordionButton>
              <AccordionPanel px={0}>
                <Tooltip
                  hasArrow
                  label="Email không hợp lệ"
                  aria-label="A tooltip"
                  isDisabled={!hasError}
                >
                  <Input
                    color="blue.800"
                    variant="outline"
                    placeholder="Địa chỉ email của bạn"
                    isInvalid={hasError}
                    errorBorderColor="yellow.600"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Tooltip>
                <Button
                  isLoading={isLoading}
                  loadingText="Đang gửi"
                  variant="outline"
                  mt="10px"
                  color="blue.800"
                  w="100%"
                  fontSize="0.9rem"
                  disabled={!email || isLoading}
                  onClick={() => createEvaluationUser(email)}
                >
                  Gửi mã xác nhận
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem isDisabled={!hasVerificationCode}>
              <AccordionButton display="flex" justifyContent="space-between" p={1} cursor="auto">
                <Box display="flex" alignItems="center" w={{ base: '100%', sm: '550px' }}>
                  <Circle size="35px" bg="yellow.600">
                    <Text fontWeight="bold" color="#fff" fontSize="0.75rem" pt="2px">
                      2
                    </Text>
                  </Circle>
                  <Text
                    textAlign="left"
                    ml={2}
                    pt="3px"
                    fontWeight="600"
                    fontSize={{ base: '0.9rem', sm: '1rem' }}
                    fontFamily="Gilroy-Medium, sans-serif"
                  >
                    Vui lòng nhập mã xác nhận được gửi đến địa chỉ mail của bạn
                  </Text>
                </Box>
              </AccordionButton>
              <AccordionPanel px={0}>
                <Input
                  color="blue.800"
                  variant="outline"
                  placeholder="Mã xác nhận"
                  errorBorderColor="yellow.600"
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value)}
                />
                <Button
                  isLoading={isLoading}
                  loadingText="Đang xác nhận"
                  variant="outline"
                  mt="10px"
                  color="blue.800"
                  w="100%"
                  fontSize="0.9rem"
                  disabled={!verificationCode || isLoading}
                  onClick={() => verifyCode(verificationCode)}
                >
                  Xác nhận
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </>
  );
};

export default EvaluationTracking;
