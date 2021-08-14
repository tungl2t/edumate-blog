import DimensionType from '@/types/dimension.type';

type EvaluationDomainType = {
  name: string;
  order: number;
  dimensions: DimensionType[];
};

export default EvaluationDomainType;
