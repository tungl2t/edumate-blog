import PostType from '@/types/post';
import { getPostBySlug } from '@/lib/api';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  return <div>{post.title}</div>;
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export const getServerSideProps = async ({ params }: Params) => {
  const post = await getPostBySlug(params.slug);
  return {
    props: { post },
  };
};
