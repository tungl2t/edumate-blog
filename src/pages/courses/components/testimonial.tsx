import TestimonialType from '@/types/testimonial.type';
import { Box, Img, Text } from '@chakra-ui/react';

const Testimonial = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <>
      <Img
        src={testimonial.picture.url}
        borderRadius="full"
        objectFit="cover"
        alt={testimonial.name}
        boxSize="250px"
        m="auto"
      />
      <Text textAlign="center" color="blue.800" fontSize="1.35em" fontWeight="600">
        {testimonial.name}
      </Text>
      <Text textAlign="center" color="blue.800" fontSize="1em" fontStyle="italic" fontWeight="600">
        {testimonial.profession}
      </Text>
      <Box
        className="content"
        textAlign={{ base: 'start', sm: 'justify' }}
        fontSize="1em"
        fontStyle="italic"
        color="gray.600"
        dangerouslySetInnerHTML={{ __html: testimonial.content }}
      />
    </>
  );
};

export default Testimonial;
