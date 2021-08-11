import { useTranslations } from 'next-intl';

import { getEvaluationByPath } from '@/lib/api';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import EvaluationType from '@/types/evaluation.type';

type Props = {
  evaluationUrl: string;
  evaluation: EvaluationType;
};

const Evaluation = ({ evaluation, evaluationUrl }: Props) => {
  const t = useTranslations('EvaluationTool');
  return (
    <Layout>
      <MyMeta
        title={evaluation.name}
        description=""
        url={evaluationUrl}
        imageUrl={evaluation.coverImage.url}
      />
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
