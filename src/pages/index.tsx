import { Flex } from '@chakra-ui/react';
import { getPostsForHome } from '@/lib/api';
import PostPreview from '@/components/post-preview';
import PostType from '@/types/post';

type Props = {
  posts: PostType[];
};

const Index = ({ posts }: Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
      {posts.map((post) => (
        <PostPreview post={post} key={post.slug} />
      ))}
    </Flex>
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
            url: `${process.env.CMS_URL}${post.coverImage.url}`,
          },
        };
      }),
    },
  };
};
