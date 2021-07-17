import { Text } from '@chakra-ui/react';

import PostType from '@/types/post.type';
import DateFormatter from '@/components/date-formatter';
import Preview from '@/components/preview';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  const { slug, coverImage, title, excerpt } = post;
  const href = `/blog/${slug}`;
  return (
    <Preview title={title} href={href} imageUrl={coverImage.url}>
      <Text fontSize="12px" color="gray.500" position="absolute" top="0.5em">
        <DateFormatter dateString={post.date} />
      </Text>
      <Text
        fontSize="16px"
        color="gray.600"
        display="inline-block"
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
    </Preview>
  );
};

export default PostPreview;
