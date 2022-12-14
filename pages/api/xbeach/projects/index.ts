import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "lib/api/middleware";
import { fetchCollection } from "lib/api/utils";

const handler = apiHandler({
  GET: getProjects,
  POST: postProject,
});

export default handler;

async function getProjects(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const projects = await projectsCollection
    .find({
      userId: req.user.id,
    })
    .toArray();

  res.status(200).json({ data: projects });
}

export async function postProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.insertOne({
    userId: req.user.id,
    name: req.body.name,
    models: [],
  });

  res.status(200).json({ data: project });
}
