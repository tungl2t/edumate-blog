import TrainerType from '@/types/trainer.type';
import { Box, Img, Text } from '@chakra-ui/react';

const Trainer = ({ trainer }: { trainer: TrainerType }) => {
  return (
    <>
      <Img
        src={trainer.picture.url}
        borderRadius="full"
        objectFit="cover"
        alt={trainer.name}
        boxSize="250px"
        m="auto"
      />
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
