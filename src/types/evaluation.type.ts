import EvaluationQuestionType from '@/types/evaluation-question.type';

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
};

export default EvaluationType;

export enum ChartType {
  POLAR = 'Polar',
  RADAR = 'Radar',
}

export type ChartTypes = ChartType.POLAR | ChartType.RADAR;
