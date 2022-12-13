import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";

import { apiHandler, type NextApiRequestAuthenticated } from "lib/api";
import { readParams } from "./params";

const handler = apiHandler({
  GET: getProjects,
  POST: createProject,
});

export default handler;

async function getProjects(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const client = await clientPromise;

  const db = client.db();

  const projects = await db.collection("projects").find().toArray();

  res.status(200).json({ data: projects });
}

export async function createProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const { name, description } = req.body;

  const params = await readParams();

  res.status(200).json({ data: params });
}
