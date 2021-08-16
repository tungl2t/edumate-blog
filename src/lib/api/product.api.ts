import { fetchAPI } from './api';

export async function getProducts(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Products($locale: String){
      products(sort: "id:asc", locale: $locale) {
        name
        specifications
        productCategory {
          name
        }
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
  return data?.products;
}
