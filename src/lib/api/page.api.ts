import { fetchAPI } from './api';

export async function getPages(locale: string) {
  const data = await fetchAPI(
    `
    query Pages($where: JSON, $locale: String){
      pages(sort: "order:asc", where: $where, locale: $locale) {
        name
        path
      }
    }
  `,
    {
      variables: {
        locale,
        where: {
          enabled: true,
        },
      },
    },
  );
  return data?.pages;
}

export async function getPageByPath(path: string, locale: string | undefined) {
  return await fetchAPI(
    `
    query PageByPath($where: JSON,  $locale: String){
      pages(where: $where, locale: $locale) {
        name
        description
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
        where: {
          path,
        },
      },
    },
  );
}
