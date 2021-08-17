import { Box } from '@chakra-ui/react';

import EvaluationType from '@/types/evaluation.type';
import Preview from '@/components/preview';

type Props = {
  evaluation: EvaluationType;
};

const EvaluationPreview = ({ evaluation }: Props) => {
  const { evaluationPath, coverImage, name, description } = evaluation;
  const href = evaluationPath ? `/evaluation-tools/${evaluationPath}` : '';
  return (
    <Preview title={name} href={href} imageUrl={coverImage.url}>
      <Box
        fontSize={{ base: '0.95em', sm: '1em' }}
        color="gray.600"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Preview>
  );
};

export default EvaluationPreview;
