import NextLink from 'next/link';
import PostType from '@/types/post';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  const { slug, coverImage, title, excerpt } = post;
  const imagePath = `https://cms.edumate.vn${coverImage.url}`;
  return (
    <NextLink href="/posts/[slug]" as={`/posts/${slug}`}>
      <Flex direction="column" cursor="pointer" borderRadius="12px" mb="15px" width="400px">
        <Image src={imagePath} borderRadius="12px 12px 0 0" w="100%" objectFit="cover" mb="10px" />
        <Heading
          as="h3"
          size="md"
          mb="5px"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '100%',
          }}
          flexGrow={1}
          padding="0 15px"
        >
          {post.title}
        </Heading>
        <Text
          fontSize="14px"
          color="gray.500"
          display="inline-block"
          mb="15px"
          padding="0 15px"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {post.excerpt}
        </Text>
      </Flex>
    </NextLink>
  );
};

export default PostPreview;
