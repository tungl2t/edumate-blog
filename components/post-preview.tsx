import NextLink from 'next/link';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import PostType from '@/types/post';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  const { slug, coverImage, title, excerpt } = post;
  const imagePath = `https://cms.edumate.vn${coverImage.url}`;
  return (
    <NextLink href="/posts/[slug]" as={`/posts/${slug}`}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        cursor="pointer"
        border="1px solid"
        borderColor="gray.200"
        mt="15px"
        width={{ base: '90%', lg: '1000px' }}
      >
        <Image src={imagePath} maxW={{ base: '100%', md: '400px' }} objectFit="cover" alt={title} />
        <Box margin="auto">
          <Heading
            as="h3"
            size="md"
            mb="5px"
            mt="5px"
            color="blue.800"
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
            {title}
          </Heading>
          <Text
            fontSize="14px"
            color="gray.500"
            display="inline-block"
            mb="15px"
            padding="0 15px"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {excerpt}
          </Text>
        </Box>
      </Flex>
    </NextLink>
  );
};

export default PostPreview;
