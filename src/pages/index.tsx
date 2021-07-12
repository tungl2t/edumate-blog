import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';

const Index = () => {
  return (
    <Layout>
      <MyMeta
        title="Chào mừng đến với Giáo dục Phần Lan"
        description="edumate - Đối tác tin cậy nhất của bạn"
        url="https://news.edumate.vn"
        imageUrl="/edumate.png"
      />
    </Layout>
  );
};

export default Index;
