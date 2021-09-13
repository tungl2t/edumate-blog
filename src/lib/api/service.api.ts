import { fetchAPI } from '@/lib/api/api';

export async function getServices(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Services($locale: String){
      services(sort: "order:desc", locale: $locale) {
        title
        slug
        content
        coverImage {
          url
        }
      }
    }
  `,
    {
      variables: {
        locale,
      },
    },
  );
  return data?.services;
}
