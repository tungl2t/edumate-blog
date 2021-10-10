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
