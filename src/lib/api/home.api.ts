import { fetchAPI } from './api';

export async function getHomeContent(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Homes($locale: String){
      homes(locale: $locale) {
        title
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
  return data?.homes;
}
