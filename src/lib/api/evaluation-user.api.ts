import edumate from './cms-edumate-vn.api';

export const registerEvaluationUser = async (email: string) => {
  const response = await edumate.post('/evaluation-users', {
    email,
  });
  return response.data;
};

export const verifyVerificationCode = async (userId: number, verificationCode: number) => {
  const path = `/evaluation-users/${userId}/verify`;
  const response = await edumate.post(path, {
    verificationCode,
  });
  return response.data;
};
