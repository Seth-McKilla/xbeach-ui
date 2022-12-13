export const fetchCollection = async (
  clientPromise: Promise<any>,
  collection: "users" | "projects" | "models"
) => {
  const client = await clientPromise;
  return await client.db(process.env.MONGO_DB_NAME).collection(collection);
};
