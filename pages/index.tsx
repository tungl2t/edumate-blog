import Post from '@/types/post';
import { getAllPostsForHome } from '@/lib/api';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  console.log(allPosts);
  const firstPost = allPosts[0];
  return (
    <>
      <h1>{firstPost.title}</h1>
    </>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const allPosts = (await getAllPostsForHome()) || [];
  return {
    props: { allPosts },
  };
};
