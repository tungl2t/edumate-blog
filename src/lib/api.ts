type Variable = {
  [key: string]: any;
};

async function fetchAPI(query: string, { variables }: Variable = {}) {
  const res = await fetch(`${process.env.CMS_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getPostsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON, $limit: Int, $start: Int){
      posts(sort: "date:desc", limit: $limit, start: $start, where: $where, locale: "all") {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
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
        limit: 10,
        start: 0,
        where: {
          status: 'published',
        },
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
          status: 'published',
        },
      },
    },
  );
}
