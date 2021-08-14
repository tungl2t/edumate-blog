import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Circle,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { cloneDeep, compact, flattenDeep, flattenDepth, mean, multiply, sum, zip } from 'lodash-es';
import { format } from 'date-fns';

import { getEvaluationByPath } from '@/lib/api';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import HeadingArticle from '@/components/heading-article';
import EvaluationType, { EType } from '@/types/evaluation.type';
import EvaluationQuestionType from '@/types/evaluation-question.type';
import markdownToHtml from '@/lib/markdownToHtml';
import EvaluationBarChart from './components/evaluation-bar-chart';
import EvaluationDomainType from '@/types/evaluation-domain.type';
import { chunkArray } from '@/lib/helper';
import EvaluationLineChart from './components/evaluation-line-chart';
import EvaluationRadarChart from './components/evaluation-radar-chart';

type Props = {
  evaluationUrl: string;
  evaluation: EvaluationType;
};

type SubDimensionMap = Map<number, number>;
type DimensionMap = Map<number, SubDimensionMap>;
type DomainMap = Map<number, DimensionMap>;

const Evaluation = ({ evaluation, evaluationUrl }: Props) => {
  const t = useTranslations('EvaluationTool');
  const [teacher, setTeacher] = useState<string>('');
  const [clazz, setClazz] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [observer, setObserver] = useState<string>('');
  const [noOfAdults, setNoOfAdults] = useState<string>('');
  const [noOfChildren, setNoOfChildren] = useState<string>('');
  const [accordionItemIndex, setAccordionItemIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<Array<number>>([]);
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [info, setInfo] = useState<Array<string>>([]);
  const [firstCycle, setFirstCycle] = useState<number[][][]>([[[]]]);
  const [secondCycle, setSecondCycle] = useState<number[][][]>([[[]]]);
  const [finalDimensionsAverage, setFinalDimensionsAverage] = useState<number[]>([]);
  const [dimensionNames, setDimensionNames] = useState<string[]>([]);
  const [dimensionSigns, setDimensionSigns] = useState<number[]>([]);
  const [domainLengths, setDomainLengths] = useState<number[]>([]);
  const [domainNames, setDomainNames] = useState<string[]>([]);
  const [finalDomainAverage, setFinalDomainAverage] = useState<number[]>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const initValue = evaluation.evaluationDomains.map((domain) => [
      ...domain.dimensions.map((dimension) => [
        ...dimension.subDimensions.map((subDimension) => 0),
      ]),
    ]);
    const signs = evaluation.evaluationDomains.map((domain) =>
      domain.dimensions.map((dimension) => (dimension.sign ? 1 : -1)),
    );

    setDimensionNames(
      flattenDeep(
        evaluation.evaluationDomains.map((domain) =>
          domain.dimensions.map((dimension) => dimension.name),
        ),
      ),
    );
    setDomainLengths(evaluation.evaluationDomains.map((domain) => domain.dimensions.length));
    setQuestions(evaluation?.evaluationQuestions?.map((q) => q.name));
    setDomainNames(evaluation.evaluationDomains.map((domain) => domain.name));
    setDimensionSigns(flattenDeep(signs));
    setFirstCycle(initValue);
    setSecondCycle(initValue);
  }, []);

  const handleValueOfEachCycle = (
    domainIndex: number,
    dimensionIndex: number,
    subDimensionIndex: number,
    value: number,
    isFirstCycle = true,
  ) => {
    const tmpArray = isFirstCycle ? cloneDeep(firstCycle) : cloneDeep(secondCycle);
    tmpArray[domainIndex][dimensionIndex][subDimensionIndex] = value;
    isFirstCycle ? setFirstCycle(tmpArray) : setSecondCycle(tmpArray);
    const tmp = flattenDeep(firstCycle.concat(secondCycle));
    const isInValid = tmp.some((v) => v === 0);
    setIsValidForm(!isInValid);
  };

  const handleAnswerValues = (questionIndex: number, value: number) => {
    let answersTemp = [...answers];
    answersTemp[questionIndex] = value;
    setAnswers(answersTemp);
    setAccordionItemIndex(questionIndex + 1);
  };

  const handleChartModal = () => {
    const currentTime = format(Date.now(), 'dd/MM/yyyy - hh:mm a');
    const info = [
      teacher ? `${t('teacher')}: ${teacher}` : '',
      noOfAdults ? `${t('noOfAdults')}: ${noOfAdults}` : '',
      clazz ? `${t('class')}: ${clazz}` : '',
      subject ? `${t('subject')}: ${subject}` : '',
      observer ? `${t('observer')}: ${observer}` : '',
      noOfChildren ? `${t('noOfChildren')}: ${noOfChildren}` : '',
      `${t('time')}: ${currentTime}`,
    ];
    setInfo(compact(info));

    const firstCycleDimensionsAverage = flattenDepth(firstCycle, 1).map((dimension) =>
      mean(dimension),
    );
    const secondCycleDimensionsAverage = flattenDepth(secondCycle, 1).map((dimension) =>
      mean(dimension),
    );
    const finalCycleDimensionAverage = zip(
      firstCycleDimensionsAverage,
      secondCycleDimensionsAverage,
    ).map((dimension) => mean(dimension));
    setFinalDimensionsAverage(finalCycleDimensionAverage);
    const finalDimensionAverageWithSign = finalCycleDimensionAverage.map(
      (value, index) => value * dimensionSigns[index],
    );
    const domainAverage = chunkArray(finalDimensionAverageWithSign, domainLengths).map((d) =>
      mean(d),
    );
    setFinalDomainAverage(domainAverage);
    onOpen();
  };
  return (
    <Layout>
      <MyMeta
        title={evaluation.name}
        description=""
        url={evaluationUrl}
        imageUrl={evaluation.coverImage.url}
      />
      <Box
        w={{ base: '95%', lg: '960px' }}
        m={{ base: '5px auto', sm: '1.5em auto' }}
        p={{ base: '1em', sm: '2em', md: '5em' }}
        border="1px solid"
        borderColor="gray.200"
      >
        <HeadingArticle heading={evaluation.name} />
        {evaluation.type === EType.FIXED && (
          <Box>
            <Input
              variant="flushed"
              placeholder={t('teacher') as string}
              value={teacher}
              onChange={(event) => setTeacher(event.target.value)}
            />
            <Input
              variant="flushed"
              placeholder={t('class') as string}
              value={clazz}
              onChange={(event) => setClazz(event.target.value)}
            />
            <Input
              mb="15px"
              variant="flushed"
              placeholder={t('subject') as string}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <Accordion allowToggle index={accordionItemIndex}>
              {evaluation?.evaluationQuestions?.map(
                (question: EvaluationQuestionType, questionIndex: number) => (
                  <AccordionItem key={question.name} isDisabled={questionIndex > answers.length}>
                    <AccordionButton
                      onClick={() => {
                        setAccordionItemIndex(
                          questionIndex === accordionItemIndex ? -1 : questionIndex,
                        );
                      }}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Box display="flex">
                        <Circle size="40px" bg="yellow.600">
                          <Text fontWeight="bold" color="#fff" fontSize="0.75rem">
                            {questionIndex + 1}
                          </Text>
                        </Circle>
                        <Text ml="1rem" fontWeight="600">
                          {question.name}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} display="flex" flexDirection="column">
                      {question?.evaluationQuestionAnswers?.map((answer, index) => (
                        <Box
                          w="100%"
                          p={4}
                          key={answer.name}
                          cursor="pointer"
                          my="5px"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="5px"
                          _hover={{
                            transition: 'all .25s ease-in-out',
                            background: 'yellow.600',
                            color: 'white',
                          }}
                          color={answers[questionIndex] === answer.value ? 'white' : 'black'}
                          bg={answers[questionIndex] === answer.value ? 'yellow.600' : 'white'}
                          onClick={() => handleAnswerValues(questionIndex, answer.value)}
                          dangerouslySetInnerHTML={{ __html: answer.name }}
                        />
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                ),
              )}
            </Accordion>
            <Button
              mt="20px"
              colorScheme="white"
              fontSize="0.95em"
              onClick={handleChartModal}
              w="100%"
              bg="yellow.600"
              variant="solid"
              disabled={answers.length < questions.length}
            >
              {t('submit')}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
              <ModalOverlay />
              <ModalContent w="95%">
                <ModalCloseButton />
                <ModalBody>
                  <EvaluationBarChart
                    evaluationTitle={evaluation.name}
                    data={answers}
                    questionNames={questions}
                    info={info}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        )}
        {evaluation.type === EType.DYNAMIC && (
          <Box>
            <Input
              variant="flushed"
              placeholder={t('teachers') as string}
              value={teacher}
              onChange={(event) => setTeacher(event.target.value)}
            />
            <Input
              variant="flushed"
              placeholder={t('noOfAdults') as string}
              value={noOfAdults}
              type="number"
              onChange={(event) => setNoOfAdults(event.target.value)}
            />
            <Input
              variant="flushed"
              placeholder={t('subject') as string}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <Input
              variant="flushed"
              placeholder={t('observer') as string}
              value={observer}
              onChange={(event) => setObserver(event.target.value)}
            />
            <Input
              variant="flushed"
              placeholder={t('noOfChildren') as string}
              value={noOfChildren}
              type="noOfChildren"
              onChange={(event) => setNoOfChildren(event.target.value)}
            />

            {evaluation?.evaluationDomains?.map(
              (domain: EvaluationDomainType, domainIndex: number) => (
                <Box key={domainIndex}>
                  <Heading fontSize="1.25em" color="yellow.600" my="1em" textTransform="uppercase">
                    {domain.name}
                  </Heading>
                  <Accordion allowToggle>
                    {domain?.dimensions?.map((dimension, dimensionIndex) => (
                      <AccordionItem key={dimensionIndex}>
                        <AccordionButton display="flex" justifyContent="space-between">
                          <Box display="flex" justifyContent="center" alignItems="center">
                            <Circle size="40px" bg="yellow.600">
                              <Text fontWeight="bold" color="#fff" fontSize="0.75rem">
                                {dimensionIndex + 1}
                              </Text>
                            </Circle>
                            <Text ml="1rem" fontWeight="600" textAlign="left">
                              {dimension.name}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={0}>
                          <Table variant="simple">
                            <Thead>
                              <Tr>
                                <Th pr={0}>{t('subDimensions')}</Th>
                                <Th p={0} pr={2} textAlign="center">
                                  {t('cycle1')}
                                </Th>
                                <Th p={0} textAlign="center">
                                  {t('cycle2')}
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {dimension?.subDimensions?.map((subDimension, subDimensionIndex) => (
                                <Tr key={subDimensionIndex}>
                                  <Td pr={0} fontSize="0.85em">
                                    {subDimension.name}
                                  </Td>
                                  <Td p={0} pr={2}>
                                    <NumberInput
                                      m="auto"
                                      minW={20}
                                      maxW={25}
                                      value={
                                        firstCycle?.[domainIndex]?.[dimensionIndex]?.[
                                          subDimensionIndex
                                        ]
                                      }
                                      min={subDimension.minValue}
                                      max={subDimension.maxValue}
                                      step={1}
                                      errorBorderColor="yellow.600"
                                      onChange={(value) => {
                                        handleValueOfEachCycle(
                                          domainIndex,
                                          dimensionIndex,
                                          subDimensionIndex,
                                          value ? parseInt(value, 10) : 0,
                                        );
                                      }}
                                    >
                                      <NumberInputField textAlign="center" />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                  </Td>
                                  <Td p={0}>
                                    <NumberInput
                                      m="auto"
                                      minW={20}
                                      maxW={25}
                                      value={
                                        secondCycle?.[domainIndex]?.[dimensionIndex]?.[
                                          subDimensionIndex
                                        ] ?? 0
                                      }
                                      min={subDimension.minValue}
                                      max={subDimension.maxValue}
                                      step={1}
                                      errorBorderColor="yellow.600"
                                      onChange={(value) => {
                                        handleValueOfEachCycle(
                                          domainIndex,
                                          dimensionIndex,
                                          subDimensionIndex,
                                          value ? parseInt(value, 10) : 0,
                                          false,
                                        );
                                      }}
                                    >
                                      <NumberInputField textAlign="center" />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Box>
              ),
            )}
            <Button
              mt="20px"
              colorScheme="white"
              fontSize="0.95em"
              w="100%"
              bg="yellow.600"
              variant="solid"
              onClick={handleChartModal}
              disabled={!isValidForm}
            >
              {t('submit')}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
              <ModalOverlay />
              <ModalContent w="95%">
                <ModalCloseButton />
                <ModalBody maxH="80vh" overflowY="auto">
                  <EvaluationLineChart
                    evaluationTitle={evaluation.name}
                    data={finalDimensionsAverage}
                    dataName={dimensionNames}
                    info={info}
                  />
                  <EvaluationRadarChart
                    info={info}
                    data={finalDomainAverage}
                    dataName={domainNames}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Evaluation;

type Params = {
  locale: string;
  params: {
    slug: string;
  };
};

export const getServerSideProps = async ({ params, locale }: Params) => {
  const data = await getEvaluationByPath(params.slug, locale);
  const evaluation = data.evaluations[0] as EvaluationType;
  let evaluationQuestions: EvaluationQuestionType[] = [];
  if (evaluation?.evaluationQuestions?.length) {
    evaluationQuestions = await Promise.all(
      evaluation.evaluationQuestions.map(async (q) => {
        const evaluationQuestionAnswers = await Promise.all(
          q.evaluationQuestionAnswers.map(async (a) => {
            const name = await markdownToHtml(a.name);
            return { ...a, name };
          }),
        );
        return { ...q, evaluationQuestionAnswers };
      }),
    );
  }
  return {
    props: {
      evaluationUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${params.slug}`,
      evaluation: {
        ...evaluation,
        evaluationQuestions,
        coverImage: { url: `${process.env.CMS_URL}${evaluation?.coverImage.url ?? ''}` },
      },
    },
  };
};
