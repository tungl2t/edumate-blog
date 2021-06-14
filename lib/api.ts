type Variable = {
  [key: string]: any;
};

async function fetchAPI(query: string, { variables }: Variable = {}) {
  const res = await fetch(`https://cms.edumate.vn/graphql`, {
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

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 10, where: $where) {
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
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
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
