import { Box } from '@chakra-ui/react';

import { getEvaluationByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import EvaluationType, { EEvaluationType } from '@/types/evaluation.type';
import EvaluationQuestionType from '@/types/evaluation-question.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import HeadingArticle from '@/components/heading-article';
import EvaluationFixedData from './components/evaluation-fixed-data';
import EvaluationDynamicData from './components/evaluation-dynamic-data';

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
        coverImage: {
          url: `${process.env.NEXT_PUBLIC_CMS_URL}${evaluation?.coverImage.url ?? ''}`,
        },
      },
    },
  };
};
