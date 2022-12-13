export const fetchCollection = async (
  clientPromise: Promise<any>,
  collection: "users" | "projects" | "models"
) => {
  const client = await clientPromise;
  return await client.db(process.env.MONGO_DB_NAME).collection(collection);
};

export const fetcher = async (input: RequestInfo, params = {}) => {
  const response = await fetch(input, {
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...params,
  });
  const { data, error } = await response.json();

  if (error) throw error;

  return data;
};
