import { Heading } from '@chakra-ui/react';

type Props = {
  heading: string | any;
};

const HeadingArticle = ({ heading }: Props) => {
  return (
    <Heading
      fontSize={{ base: '1.25em', sm: '1.75em' }}
      color="blue.800"
      mb="1em"
      textAlign="center"
      textTransform="uppercase"
    >
      {heading}
    </Heading>
  );
};

export default HeadingArticle;
