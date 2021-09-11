import { getPostBySlug } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
import markdownToHtml from '@/lib/markdownToHtml';
import PostType from '@/types/post.type';
import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import WrapperArticle from '@/components/wrapper-article';
import {GetStaticPropsContext} from "next";

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
        imageUrl={post.coverImage.small}
      />
      <WrapperArticle title={post.title} htmlContent={post.content} />
    </Layout>
  );
};

export default Post;

export const getServerSideProps = async ({ params }: GetStaticPropsContext) => {
  const path = params?.slug as string;
  const data = await getPostBySlug(path);
  const post = data.posts[0];
  const content = await markdownToHtml(post?.content ?? '');
  return {
    props: {
      postUrl: `${process.env.NEXT_PUBLIC_EDUMATE_URL}/${path}`,
      post: {
        ...post,
        coverImage: getFormatImages(post?.coverImage?.url),
        content,
      },
    },
  };
};
