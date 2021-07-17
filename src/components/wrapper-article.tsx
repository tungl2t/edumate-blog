import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import HeadingArticle from '@/components/heading-article';

type Props = {
  title: string;
  htmlContent: string;
  children?: ReactNode;
};

const WrapperArticle = ({ title, htmlContent, children }: Props) => {
  return (
    <Box
      w={{ base: '95%', lg: '960px' }}
      m={{ base: '5px auto', sm: '1.5em auto' }}
      p={{ base: '1em', sm: '2em', md: '5em' }}
      border="1px solid"
      borderColor="gray.200"
    >
      <article>
        <HeadingArticle heading={title} />
        <Box
          className="content"
          fontSize={{ base: '1em', sm: '1.125em' }}
          mb="1em"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        {children}
      </article>
    </Box>
  );
};

export default WrapperArticle;
