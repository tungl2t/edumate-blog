import { Box } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdLabelOutline } from 'react-icons/md';

import ProductType from '@/types/product.type';
import Preview from '@/components/preview';

type Props = {
  product: ProductType;
};

const ProductPreview = ({ product }: Props) => {
  const { name, specifications, coverImage, productCategory } = product;
  return (
    <Preview title={name} path="" imageUrl={coverImage.url}>
      <Box fontSize="1em" color="blue.800" display="flex" alignItems="center" my="0.25em">
        <Icon as={MdLabelOutline} mr="0.5em" color="blue.800" />
        {productCategory.name}
      </Box>
      <Box
        fontSize={{ base: '0.95em', sm: '1em' }}
        color="gray.600"
        dangerouslySetInnerHTML={{ __html: specifications }}
      />
    </Preview>
  );
};

export default ProductPreview;
