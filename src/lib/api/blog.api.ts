import { fetchAPI } from './api';

export async function getPosts() {
  const data = await fetchAPI(
    `
    query Posts($limit: Int, $start: Int){
      posts(sort: "date:desc", limit: $limit, start: $start, locale: "all") {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
      }
    }
  `,
    {
      variables: {
        start: 0,
      },
    },
  );
  return data?.posts;
}

export async function getPostBySlug(slug: string) {
  return await fetchAPI(
    `
    query PostBySlug($where: JSON){
      posts(where: $where, locale: "all") {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
        content
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    },
  );
}
