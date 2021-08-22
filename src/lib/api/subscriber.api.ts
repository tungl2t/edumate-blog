import { fetchAPI } from '@/lib/api/api';

export async function createSubscriber(email: string | undefined) {
  const data = await fetchAPI(
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
  return data?.subscriber?.id;
}
