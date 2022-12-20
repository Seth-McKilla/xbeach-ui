import type { NextApiResponse } from "next";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "@/lib/api/middleware";
import { fetchCollection } from "@/lib/api/utils";
import clientPromise from "@/lib/mongodb";
import { toOID } from "@/lib/mongodb/utils";
import { readParams } from "../params";

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

  const params = await readParams();

  const projects = await projectsCollection
    .aggregate([
      { $match: { userId: toOID(req.user.id) } },
      {
        $lookup: {
          from: "models",
          localField: "_id",
          foreignField: "projectId",
          as: "models",
        },
      },
    ])
    .toArray();

  res.status(200).json({ data: projects });
}

export async function postProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.insertOne({
    userId: toOID(req.user.id),
    name: req.body.name,
    models: [],
  });

  res.status(200).json({ data: project });
}
