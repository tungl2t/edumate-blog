import DigitalSkillQuestionType from '@/types/digital-skill-question.type';

type EvaluationDigitalSkillType = {
  id: string;
  name: string;
  order: number;
  desc: string;
  digitalSkillQuestions: DigitalSkillQuestionType[];
};

export default EvaluationDigitalSkillType;
