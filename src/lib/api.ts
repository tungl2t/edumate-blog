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

export async function getPosts() {
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

export async function getServices(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Services($where: JSON, $locale: String){
      services(where: $where, locale: $locale) {
        title
        slug
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
  return data?.services;
}

export async function getHomeContent(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Homes($where: JSON, $locale: String){
      homes(where: $where, locale: $locale) {
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

export async function getCourses(locale: string | undefined) {
  const data = await fetchAPI(
    `
    query Courses($where: JSON, $locale: String){
      courses(sort: "id:asc", where: $where, locale: $locale) {
        title
        url
        slug
        detail
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

export async function getCourseByURL(url: string, locale: string | undefined) {
  return await fetchAPI(
    `
    query CourseByURL($where: JSON,  $locale: String){
      courses(where: $where, locale: $locale) {
        title
        excerpt,
        content,
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
          url,
        },
      },
    },
  );
}

export async function getEvents(locale: string) {
  const data = await fetchAPI(
    `
    query Events($where: JSON, $locale: String){
      events(sort: "startDate:desc", where: $where, locale: $locale) {
        title
        url
        slug
        startDate
        endDate
        location
        detail
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

export async function getEventByURL(url: string, locale: string) {
  return await fetchAPI(
    `
    query EventByUrl($where: JSON,  $locale: String){
      events(where: $where, locale: $locale) {
        title
        content,
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
          url,
        },
      },
    },
  );
}

export async function getProducts(locale: string) {
  const data = await fetchAPI(
    `
    query Products($where: JSON, $locale: String){
      products(sort: "id:asc", where: $where, locale: $locale) {
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

export async function getCompanies(locale: string) {
  const data = await fetchAPI(
    `
    query Companies($where: JSON, $locale: String){
      companies(sort: "id:asc", where: $where, locale: $locale) {
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
