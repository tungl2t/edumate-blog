import { fetchAPI } from '@/lib/api/api';

export async function createSubscriber(email: string | undefined) {
  return await fetchAPI(
    `
        mutation CreateSubscriber($email: String!){
          createSubscriber(input: { data: {email: $email} }) {
            subscriber {
              id
              email
            }
          }
        }
     `,
    {
      variables: {
        email,
      },
    },
  );
}
