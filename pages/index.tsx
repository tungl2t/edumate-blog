import Post from '@/types/post';
import { getAllPostsForHome } from '@/lib/api';
import PostPreview from '@/components/post-preview';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <div>
      {allPosts.map((post) => (
        <PostPreview post={post} key={post.slug} />
      ))}
    </div>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const allPosts = (await getAllPostsForHome()) || [];
  return {
    props: { allPosts },
  };
};
