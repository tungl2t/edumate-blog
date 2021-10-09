import { GetStaticPropsContext } from 'next';
import { Box } from '@chakra-ui/react';

import { getEvaluationByPath } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
import markdownToHtml from '@/lib/markdownToHtml';
import EvaluationType, { EEvaluationType } from '@/types/evaluation.type';
import EvaluationQuestionType from '@/types/evaluation-question.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import HeadingArticle from '@/components/heading-article';
import EvaluationFixedData from './components/evaluation-fixed-data';
import EvaluationDynamicData from './components/evaluation-dynamic-data';
import EvaluationDigitalSkillType from '@/types/evaluation-digital-skill.type';
import EvaluationTracking from './components/evaluation-tracking';

type Props = {
  evaluationUrl: string;
  evaluation: EvaluationType;
};

const Evaluation = ({ evaluation, evaluationUrl }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={evaluation.name}
        description=""
        url={evaluationUrl}
        imageUrl={evaluation.coverImage.small}
      />
      <Box
        w={{ base: '95%', lg: '960px' }}
        m={{ base: '5px auto', sm: '1.5em auto' }}
        p={{ base: '1em', sm: '2em', md: '5em' }}
        minH="calc(100vh - 185px)"
        border="1px solid"
        borderColor="gray.200"
      >
        <HeadingArticle heading={evaluation.name} />
        {evaluation.type === EEvaluationType.FIXED && (
          <EvaluationFixedData evaluationQuestions={evaluation.evaluationQuestions} />
        )}
        {evaluation.type === EEvaluationType.DYNAMIC && (
          <EvaluationDynamicData evaluationDomains={evaluation.evaluationDomains} />
        )}
        {evaluation.type === EEvaluationType.TRACKING && (
          <EvaluationTracking
            evaluationId={evaluation.id}
            evaluationDigitalSkills={evaluation.evaluationDigitalSkills}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Evaluation;

export const getServerSideProps = async ({ params, locale }: GetStaticPropsContext) => {
  const path = params?.slug as string;
  const data = await getEvaluationByPath(path, locale);
  const evaluation = data.evaluations[0] as EvaluationType;
  let evaluationQuestions: EvaluationQuestionType[] = [];
  let evaluationDigitalSkills: EvaluationDigitalSkillType[] = [];
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

  if (evaluation?.evaluationDigitalSkills?.length) {
    evaluationDigitalSkills = await Promise.all(
      evaluation.evaluationDigitalSkills.map(async (digitalSkill) => {
        const desc = await markdownToHtml(digitalSkill.desc);
        const digitalSkillQuestions = await Promise.all(
          digitalSkill.digitalSkillQuestions.map(async (digitalSkillQuestion) => {
            const desc = await markdownToHtml(digitalSkillQuestion.desc);
            return { ...digitalSkillQuestion, desc };
          }),
        );
        return { ...digitalSkill, desc, digitalSkillQuestions };
      }),
    );
  }

  return {
    props: {
      evaluationUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${path}`,
      evaluation: {
        ...evaluation,
        evaluationQuestions,
        evaluationDigitalSkills,
        coverImage: getFormatImages(evaluation?.coverImage?.url),
      },
    },
  };
};
