import { fetchAPI } from './api';

export async function getEvents(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Events($locale: String){
      events(sort: "startDate:desc", locale: $locale) {
        title
        eventPath
        slug
        startDate
        endDate
        location
        detailLink
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
  return data?.events;
}

export async function getEventByPath(eventPath: string, locale: string | undefined) {
  return await fetchAPI(
    `
    query EventByPath($where: JSON,  $locale: String){
      events(where: $where, locale: $locale) {
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
        where: {
          eventPath,
        },
      },
    },
  );
}
