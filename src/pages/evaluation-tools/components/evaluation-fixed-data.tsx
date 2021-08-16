import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import EvaluationQuestionType from '@/types/evaluation-question.type';
import EvaluationBarChart from './evaluation-bar-chart';
import { compact } from 'lodash-es';
import { format } from 'date-fns';

type Props = {
  evaluationQuestions: EvaluationQuestionType[];
};

const EvaluationFixedData = ({ evaluationQuestions }: Props) => {
  const t = useTranslations('EvaluationTool');
  const [teacher, setTeacher] = useState<string>('');
  const [clazz, setClazz] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [answers, setAnswers] = useState<Array<number>>([]);
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [accordionItemIndex, setAccordionItemIndex] = useState<number>(-1);
  const [info, setInfo] = useState<Array<string>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setQuestions(evaluationQuestions?.map((q) => q.name));
  }, [evaluationQuestions]);

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
      clazz ? `${t('class')}: ${clazz}` : '',
      subject ? `${t('subject')}: ${subject}` : '',
      `${t('time')}: ${currentTime}`,
    ];
    setInfo(compact(info));
    onOpen();
  };

  return (
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
        {evaluationQuestions?.map((question: EvaluationQuestionType, questionIndex: number) => (
          <AccordionItem key={question.name} isDisabled={questionIndex > answers.length}>
            <AccordionButton
              onClick={() => {
                setAccordionItemIndex(questionIndex === accordionItemIndex ? -1 : questionIndex);
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
        ))}
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
            <EvaluationBarChart data={answers} questionNames={questions} info={info} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EvaluationFixedData;
