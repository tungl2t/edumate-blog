import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import { useTranslations } from 'next-intl';

const Index = () => {
  const t = useTranslations('Home');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn"
        imageUrl="/edumate.png"
      />
    </Layout>
  );
};

export default Index;
