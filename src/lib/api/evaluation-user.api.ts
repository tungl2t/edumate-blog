import edumate from './cms-edumate-vn.api';

export const registerEvaluationUser = async (email: string) => {
  const response = await edumate.post('/evaluation-users', {
    email,
  });
  return response.data;
};
