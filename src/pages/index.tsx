import { Flex } from '@chakra-ui/react';
import { getPostsForHome } from '@/lib/api';
import PostPreview from '@/components/post-preview';
import PostType from '@/types/post';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';

type Props = {
  posts: PostType[];
};

const Index = ({ posts }: Props) => {
  return (
    <Layout>
      <MyMeta
        title="Chào mừng đến với Giáo dục Phần Lan"
        description="edumate - Đối tác tin cậy nhất của bạn"
        url="https://news.edumate.vn"
        imageUrl="/edumate.png"
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
  const posts = (await getPostsForHome()) || [];
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
