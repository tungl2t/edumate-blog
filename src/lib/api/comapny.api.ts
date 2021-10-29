import { fetchAPI } from './api';

export async function getCompaniesByType(locale: string, companyType: string) {
  const data = await fetchAPI(
    `
    query Companies($locale: String, $where: JSON){
      companies(sort: "id:asc", locale: $locale, where: $where) {
        address
        addressMapLink
        facebook
        linkedIn
        email
        phone
      }
    }
  `,
    {
      variables: {
        locale,
        where: {
          companyType,
        },
      },
    },
  );
  return data?.companies;
}
