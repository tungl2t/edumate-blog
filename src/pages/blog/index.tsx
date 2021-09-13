import { GetStaticPropsContext } from 'next';
import { Flex } from '@chakra-ui/react';

import { getPageByPath, getPosts } from '@/lib/api';
import { getFormatImages } from '@/lib/helper';
import PostType from '@/types/post.type';
import PageType from '@/types/page.type';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import PostPreview from './components/post-preview';

type Props = {
  posts: PostType[];
  page: PageType;
};

const Index = ({ posts, page }: Props) => {
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/blog"
        imageUrl={page.coverImage.small}
      />
      <Flex flexDirection="column" alignItems="center" justifyContent="center" margin="auto">
        {posts.map((post) => (
          <PostPreview post={post} key={post.slug} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: GetStaticPropsContext) => {
  const posts = (await getPosts()) || [];
  const data = await getPageByPath('/blog', locale);
  const page = data.pages[0];
  return {
    props: {
      posts: posts.map((post: PostType) => {
        return {
          ...post,
          coverImage: getFormatImages(post?.coverImage?.url),
        };
      }),
      page: {
        ...page,
        coverImage: getFormatImages(page?.coverImage?.url),
      },
    },
  };
};
