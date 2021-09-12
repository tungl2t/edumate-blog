import { Box } from '@chakra-ui/react';

import ServiceType from '@/types/service.type';
import Preview from '@/components/preview';

type Props = {
  service: ServiceType;
};

const ServicePreview = ({ service }: Props) => {
  const { coverImage, title, content } = service;
  return (
    <Preview title={title} path="" formatImages={coverImage}>
      <Box
        fontSize={{ base: '0.95em', sm: '1em' }}
        color="gray.600"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Preview>
  );
};

export default ServicePreview;
