import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Circle,
  Input,
  Text,
} from '@chakra-ui/react';

import { getEvaluationByPath } from '@/lib/api';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import HeadingArticle from '@/components/heading-article';
import EvaluationType from '@/types/evaluation.type';
import EvaluationQuestionType from '@/types/evaluation-question.type';

type Props = {
  evaluationUrl: string;
  evaluation: EvaluationType;
};

const Evaluation = ({ evaluation, evaluationUrl }: Props) => {
  const t = useTranslations('EvaluationTool');
  const [answers, setAnswers] = useState<Array<number>>([]);
  const [accordionItemIndex, setAccordionItemIndex] = useState<number>(-1);

  const handleAnswerValues = (questionIndex: number, value: number) => {
    let answersTemp = [...answers];
    answersTemp[questionIndex] = value;
    setAnswers(answersTemp);
    if (questionIndex < evaluation.evaluationQuestions.length - 1) {
      setAccordionItemIndex(questionIndex + 1);
    }
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

        <Input variant="flushed" placeholder="Name" />
        <Input variant="flushed" placeholder="Class" />
        <Input variant="flushed" placeholder="Subject" />

        <Accordion allowToggle mt="2rem" index={accordionItemIndex}>
          {evaluation.evaluationQuestions.map(
            (question: EvaluationQuestionType, questionIndex: number) => (
              <AccordionItem key={questionIndex} isDisabled={questionIndex > answers.length}>
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
                  {question.evaluationQuestionAnswers.map((answer, index) => (
                    <Box
                      w="100%"
                      p={4}
                      key={index}
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
                    >
                      {answer.name}
                    </Box>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ),
          )}
        </Accordion>
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
  return {
    props: {
      evaluationUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${params.slug}`,
      evaluation: {
        ...evaluation,
        coverImage: { url: `${process.env.CMS_URL}${evaluation?.coverImage.url ?? ''}` },
      },
    },
  };
};
