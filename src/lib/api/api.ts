type Variable = {
  [key: string]: any;
};

export async function fetchAPI(query: string, { variables }: Variable = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/graphql`, {
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
    throw new Error(json.errors[0].messages);
  }

  return json.data;
}
