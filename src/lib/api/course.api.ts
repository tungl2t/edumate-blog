import { fetchAPI } from './api';

export async function getCourses(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Courses($locale: String){
      courses(sort: "created_at:desc", locale: $locale) {
        title
        coursePath
        slug
        excerpt
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
  return data?.courses;
}

export async function getCourseByPath(coursePath: string, locale: string | undefined) {
  return await fetchAPI(
    `
    query CourseByPath($where: JSON,  $locale: String){
      courses(sort: "id:desc", where: $where, locale: $locale) {
        title
        excerpt
        content
        coverImage {
          url
        }
        testimonials {
          name
          profession
          picture {
            url
          }
          content
        }
        trainers {
          name
          picture {
            url
          }
          content
        }
      }
    }
  `,
    {
      variables: {
        locale,
        where: {
          coursePath,
        },
      },
    },
  );
}
