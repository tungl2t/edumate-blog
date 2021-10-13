import { GetStaticPropsContext } from 'next';
import { Flex } from '@chakra-ui/react';

import { getEvaluations, getPageByPath } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
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
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/evaluation-tools"
        imageUrl={page.coverImage.small}
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
          const excerpt = await markdownToHtml(evaluation.excerpt);
          return {
            ...evaluation,
            excerpt,
            coverImage: getFormatImages(evaluation?.coverImage?.url),
          };
        }),
      ),
      page: {
        ...data.pages[0],
        coverImage: getFormatImages(data.pages[0]?.coverImage?.url),
      },
    },
  };
};
