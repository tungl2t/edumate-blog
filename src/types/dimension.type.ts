import SubDimensionType from '@/types/sub-dimension.type';

type DimensionType = {
  name: string;
  sign: boolean;
  subDimensions: SubDimensionType[];
};

export default DimensionType;
