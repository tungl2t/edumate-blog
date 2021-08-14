import EvaluationQuestionType from '@/types/evaluation-question.type';
import EvaluationDomainType from '@/types/evaluation-domain.type';

type EvaluationType = {
  name: string;
  description: string;
  coverImage: {
    url: string;
  };
  slug: string;
  chartType: ChartTypes;
  evaluationPath: string;
  evaluationQuestions: EvaluationQuestionType[];
  evaluationDomains: EvaluationDomainType[];
  type: ETypes;
};

export default EvaluationType;

export enum ChartType {
  POLAR = 'Polar',
  RADAR = 'Radar',
}

export type ChartTypes = ChartType.POLAR | ChartType.RADAR;

export enum EType {
  DYNAMIC = 'Dynamic',
  FIXED = 'Fixed',
}

export type ETypes = EType.DYNAMIC | EType.FIXED;
