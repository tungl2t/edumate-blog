import { Box, Heading } from '@chakra-ui/react';

import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import PostType from '@/types/post.type';
import WrapperArticle from '@/components/wrapper-article';

type Props = {
  postUrl: string;
  post: PostType;
};

const Post = ({ post, postUrl }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        imageUrl={post.coverImage.url}
      />
      <WrapperArticle title={post.title} htmlContent={post.content} />
    </Layout>
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
  const content = await markdownToHtml(post?.content ?? '');
  return {
    props: {
      postUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${params.slug}`,
      post: {
        ...post,
        coverImage: { url: `${process.env.CMS_URL}${post?.coverImage.url ?? ''}` },
        content,
      },
    },
  };
};
