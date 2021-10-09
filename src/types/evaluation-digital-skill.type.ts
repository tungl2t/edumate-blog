import DigitalSkillQuestionType from '@/types/digital-skill-question.type';

type EvaluationDigitalSkillType = {
  id: number;
  name: string;
  order: number;
  desc: string;
  digitalSkillQuestions: DigitalSkillQuestionType[];
};

export default EvaluationDigitalSkillType;
