import ProductType from '@/types/product.type';
import { Box, Flex, Heading, Img } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdLabelOutline } from 'react-icons/md';

type Props = {
  product: ProductType;
};

const ProductPreview = ({ product }: Props) => {
  const { name, specifications, coverImage, productCategory } = product;
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      _hover={{
        boxShadow: '0 2px 4px -1px #0003, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f',
      }}
      border="1px solid"
      borderColor="gray.200"
      my="1em"
      w={{ base: '95%', lg: '960px' }}
    >
      <Img
        src={coverImage.url}
        w={{ base: '100%', md: '50%' }}
        objectFit="cover"
        alt={name}
        style={{
          aspectRatio: '4/3',
        }}
      />
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={{ base: '1.25em', sm: '1.5em' }}
      >
        <Heading size="md" mb="5px" color="blue.800">
          {name}
        </Heading>
        <Box fontSize="1em" color="blue.800" display="flex" alignItems="center" my="0.25em">
          <Icon as={MdLabelOutline} mr="0.5em" color="blue.800" />
          {productCategory.name}
        </Box>
        <Box
          fontSize={{ base: '0.95em', sm: '1em' }}
          color="gray.600"
          dangerouslySetInnerHTML={{ __html: specifications }}
        />
      </Box>
    </Flex>
  );
};

export default ProductPreview;
