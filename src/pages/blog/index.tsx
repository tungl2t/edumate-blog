import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Flex } from '@chakra-ui/react';

import { getPageByPath, getPosts } from '@/lib/api';
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
  const t = useTranslations('Blog');
  return (
    <Layout>
      <MyMeta
        title={page.name}
        description={page.description}
        url="/blog"
        imageUrl={page.coverImage.url}
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
  const data = await getPageByPath('/services', locale);
  const page = data.pages[0];
  return {
    props: {
      posts: posts.map((post: PostType) => {
        return {
          ...post,
          coverImage: {
            url: `${process.env.NEXT_PUBLIC_CMS_URL}${post?.coverImage?.url ?? ''}`,
          },
        };
      }),
      page: {
        ...page,
        coverImage: {
          url: `${process.env.NEXT_PUBLIC_CMS_URL}${page?.coverImage?.url ?? ''}`,
        },
      },
    },
  };
};
