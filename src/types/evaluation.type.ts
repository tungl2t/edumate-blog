import EvaluationQuestionType from '@/types/evaluation-question.type';
import EvaluationDomainType from '@/types/evaluation-domain.type';
import EvaluationDigitalSkillType from '@/types/evaluation-digital-skill.type';
import { FormatImages } from './shared';

type EvaluationType = {
  id: number;
  name: string;
  excerpt: string;
  description: string;
  coverImage: FormatImages;
  slug: string;
  chartType: ChartTypes;
  evaluationPath: string;
  evaluationQuestions: EvaluationQuestionType[];
  evaluationDomains: EvaluationDomainType[];
  evaluationDigitalSkills: EvaluationDigitalSkillType[];
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
  TRACKING = 'Tracking',
}

export type EvaluationTypes =
  | EEvaluationType.DYNAMIC
  | EEvaluationType.FIXED
  | EEvaluationType.TRACKING;
