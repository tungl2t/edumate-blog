import { useTranslations } from 'next-intl';
import { Flex } from '@chakra-ui/react';

import { getEvaluations } from '@/lib/api';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import EvaluationType from '@/types/evaluation.type';
import EvaluationPreview from './components/evaluation-preview';
import markdownToHtml from '@/lib/markdownToHtml';

type Props = {
  evaluations: EvaluationType[];
};

const Index = ({ evaluations }: Props) => {
  const t = useTranslations('EvaluationTool');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/evaluation-tool"
        imageUrl="/edumate.png"
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {evaluations.map((evaluation, index) => (
          <EvaluationPreview evaluation={evaluation} key={evaluation.slug} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const evaluations = (await getEvaluations(locale)) || [];
  return {
    props: {
      evaluations: await Promise.all(
        evaluations.map(async (evaluation: EvaluationType) => {
          const description = await markdownToHtml(evaluation.description);
          return {
            ...evaluation,
            description,
            coverImage: {
              url: `${process.env.CMS_URL}${evaluation?.coverImage?.url ?? ''}`,
            },
          };
        }),
      ),
    },
  };
};
