import Image from 'next/image';
import { Box, Center, Text } from '@chakra-ui/react';

import TestimonialType from '@/types/testimonial.type';

const Testimonial = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <>
      <Center>
        <Image
          src={testimonial.picture.url}
          objectFit="cover"
          className="rounded-full"
          alt={testimonial.name}
          width={250}
          height={250}
          blurDataURL={testimonial.picture.thumbnail}
          placeholder="blur"
        />
      </Center>
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
