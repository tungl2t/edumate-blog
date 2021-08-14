import { useTranslations } from 'next-intl';
import { Flex } from '@chakra-ui/react';

import { getPosts } from '@/lib/api';
import PostType from '@/types/post.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import PostPreview from './components/post-preview';

type Props = {
  posts: PostType[];
};

const Index = ({ posts }: Props) => {
  const t = useTranslations('Blog');
  return (
    <Layout>
      <MyMeta
        title={t('title')}
        description={t('desc')}
        url="https://edumate.vn/blog"
        imageUrl="https://edumate.vn/edumate.png"
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {posts.map((post) => (
          <PostPreview post={post} key={post.slug} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts: posts.map((post: PostType) => {
        return {
          ...post,
          coverImage: {
            url: `${process.env.CMS_URL}${post?.coverImage?.url ?? ''}`,
          },
        };
      }),
    },
  };
};
