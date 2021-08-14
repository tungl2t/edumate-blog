import SubDimensionType from '@/types/sub-dimension.type';

type DimensionType = {
  name: string;
  sign: boolean;
  order: number;
  subDimensions: SubDimensionType[];
};

export default DimensionType;
