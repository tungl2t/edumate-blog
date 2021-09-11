import EvaluationQuestionType from '@/types/evaluation-question.type';
import EvaluationDomainType from '@/types/evaluation-domain.type';

type EvaluationType = {
  name: string;
  description: string;
  coverImage: {
    url: string;
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  };
  slug: string;
  chartType: ChartTypes;
  evaluationPath: string;
  evaluationQuestions: EvaluationQuestionType[];
  evaluationDomains: EvaluationDomainType[];
  type: EvaluationTypes;
};

export default EvaluationType;

export enum EChartType {
  POLAR = 'Polar',
  RADAR = 'Radar',
  LINE = 'Line',
  BAR = 'Bar',
}

export type ChartTypes = EChartType.POLAR | EChartType.RADAR | EChartType.BAR | EChartType.LINE;

export enum EEvaluationType {
  DYNAMIC = 'Dynamic',
  FIXED = 'Fixed',
}

export type EvaluationTypes = EEvaluationType.DYNAMIC | EEvaluationType.FIXED;
