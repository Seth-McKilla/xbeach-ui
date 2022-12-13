import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";

import {
  apiHandler,
  fetchCollection,
  type NextApiRequestAuthenticated,
} from "lib/api";
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
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const projects = await projectsCollection
    .find({
      userId: req.user._id,
    })
    .toArray();

  res.status(200).json({ data: projects });
}

export async function createProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.insertOne({
    userId: req.user._id,
    name: req.body.name,
    models: [],
  });

  res.status(200).json({ data: project });
}
