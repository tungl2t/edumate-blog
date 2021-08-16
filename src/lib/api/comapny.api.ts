import { fetchAPI } from './api';

export async function getCompanies(locale: string) {
  const data = await fetchAPI(
    `
    query Companies($locale: String){
      companies(sort: "id:asc", locale: $locale) {
        name
        businessId
        address
        city
        country
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
  return data?.companies;
}
