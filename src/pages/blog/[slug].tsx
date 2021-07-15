import { Box, Heading } from '@chakra-ui/react';

import MyMeta from '@/components/my-meta';
import Layout from '@/components/layout';
import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import PostType from '@/types/post.type';

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
      <Box
        maxW="1216px"
        w="95%"
        m="4.5em auto"
        p={{ base: '1em', md: '3em 5em' }}
        border="1px solid"
        borderColor="gray.200"
      >
        <Heading
          fontSize={{ base: '1.25em', sm: '1.5em', md: '1.75em' }}
          color="blue.800"
          mb="1em"
          textAlign="center"
        >
          {post?.title}
        </Heading>
        <Box
          className="content"
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
