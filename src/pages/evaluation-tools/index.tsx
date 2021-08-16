import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Flex } from '@chakra-ui/react';

import { getEvaluations, getPageByPath } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import EvaluationType from '@/types/evaluation.type';
import PageType from '@/types/page.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import EvaluationPreview from './components/evaluation-preview';

type Props = {
  evaluations: EvaluationType[];
  page: PageType;
};

const Index = ({ evaluations, page }: Props) => {
  const t = useTranslations('EvaluationTool');
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/evaluation-tools"
        imageUrl={page.coverImage.url}
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

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const evaluations = (await getEvaluations(locale)) || [];
  const data = await getPageByPath('/evaluation-tools', locale);
  return {
    props: {
      evaluations: await Promise.all(
        evaluations.map(async (evaluation: EvaluationType) => {
          const description = await markdownToHtml(evaluation.description);
          return {
            ...evaluation,
            description,
            coverImage: {
              url: `${process.env.NEXT_PUBLIC_CMS_URL}${evaluation?.coverImage?.url ?? ''}`,
            },
          };
        }),
      ),
      page: {
        ...data.pages[0],
        coverImage: {
          url: `${process.env.NEXT_PUBLIC_CMS_URL}${data.pages[0]?.coverImage?.url ?? ''}`,
        },
      },
    },
  };
};
