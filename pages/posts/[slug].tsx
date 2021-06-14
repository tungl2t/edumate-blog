import PostType from '@/types/post';
import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  return (
    <div>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export const getServerSideProps = async ({ params }: Params) => {
  const data = await getPostBySlug(params.slug);
  const post = data.posts[0];
  const content = await markdownToHtml(post.content);
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};
