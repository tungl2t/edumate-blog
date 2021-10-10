import DigitalSkillQuestionAnswerType from '@/types/digital-skill-question-answer.type';

type DigitalSkillQuestionType = {
  id: string;
  name: string;
  order: number;
  desc: string;
  digitalSkillQuestionAnswers: DigitalSkillQuestionAnswerType[];
};

export default DigitalSkillQuestionType;
