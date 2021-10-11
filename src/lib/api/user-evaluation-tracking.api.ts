import edumate from './cms-edumate-vn.api';

export const findByEvaluationId = async (accessToken: string, evaluationId: number) => {
  const response = await edumate.get('/user-evaluation-trackings', {
    headers: {
      access_token: accessToken,
    },
    params: {
      evaluationId,
    },
  });
  return response.data;
};

export const createUserEvaluationTracking = async (
  xAPIKey: string,
  evaluationId: number,
  digitalSkillId: number,
  evaluationQuestionId: number,
  evaluationAnswerId: number,
) => {
  const response = await edumate.post(
    '/user-evaluation-trackings',
    {
      evaluationId,
      digitalSkillId,
      evaluationQuestionId,
      evaluationAnswerId,
    },
    {
      headers: {
        'x-api-key': xAPIKey,
      },
    },
  );
  return response.data;
};
