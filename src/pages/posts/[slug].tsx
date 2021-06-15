import { Box, Heading } from '@chakra-ui/react';
import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import PostType from '@/types/post';
import Meta from '@/components/meta';
import postStyles from './Post.module.sass';
import Layout from '@/components/layout';

type Props = {
  postUrl: string;
  post: PostType;
};

const Post = ({ post, postUrl }: Props) => {
  return (
    <Layout>
      <Meta
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        imageUrl={post.coverImage.url}
      />
      <Box
        maxW="1000px"
        w="95%"
        m="auto"
        p={{ base: '1em', md: '5em' }}
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading
          as="h1"
          fontSize={{ base: '1.5em', sm: '2em', md: '2.5em' }}
          color="blue.800"
          mb="1em"
        >
          {post?.title}
        </Heading>
        <Box
          className={postStyles.content}
          textAlign={{ base: 'start', sm: 'justify' }}
          fontSize={{ base: '1em', md: '1.125em' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Box>
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
      postUrl: `${process.env.BLOG_URL}/${params.slug}`,
      post: {
        ...post,
        coverImage: { url: `${process.env.CMS_URL}${post?.coverImage.url ?? ''}` },
        content,
      },
    },
  };
};
