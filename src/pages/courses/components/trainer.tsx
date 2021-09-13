import Image from 'next/image';
import { Box, Center, Text } from '@chakra-ui/react';

import TrainerType from '@/types/trainer.type';

const Trainer = ({ trainer }: { trainer: TrainerType }) => {
  return (
    <>
      <Center>
        <Image
          src={trainer.picture.url}
          objectFit="cover"
          alt={trainer.name}
          className="rounded-full"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL={trainer.picture.thumbnail}
        />
      </Center>
      <Text textAlign="center" color="blue.800" fontSize="1.35em" fontWeight="600">
        {trainer.name}
      </Text>
      <Box
        className="content"
        textAlign={{ base: 'start', sm: 'justify' }}
        fontSize="1em"
        fontStyle="italic"
        color="gray.600"
        dangerouslySetInnerHTML={{ __html: trainer.content }}
      />
    </>
  );
};

export default Trainer;
