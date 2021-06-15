import Post from '@/types/post';
import { getPostsForHome } from '@/lib/api';
import PostPreview from '@/components/post-preview';
import { Box, Flex } from '@chakra-ui/react';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      margin="auto"
    >
      {allPosts.map((post) => (
        <PostPreview post={post} key={post.slug} />
      ))}
    </Flex>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const allPosts = (await getPostsForHome()) || [];
  return {
    props: { allPosts },
  };
};
