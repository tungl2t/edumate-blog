import { Box } from '@chakra-ui/react';

import EvaluationType from '@/types/evaluation.type';
import Preview from '@/components/preview';

type Props = {
  evaluation: EvaluationType;
};

const EvaluationPreview = ({ evaluation }: Props) => {
  const { evaluationPath, coverImage, name, excerpt } = evaluation;
  const path = evaluationPath ? `/evaluation-tools/${evaluationPath}` : '';
  return (
    <Preview title={name} path={path} formatImages={coverImage}>
      <Box
        fontSize={{ base: '0.95em', sm: '1em' }}
        color="gray.600"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </Preview>
  );
};

export default EvaluationPreview;
