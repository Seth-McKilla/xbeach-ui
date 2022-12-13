import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";

import {
  apiHandler,
  fetchCollection,
  type NextApiRequestAuthenticated,
} from "lib/api";

const handler = apiHandler({
  GET: getProjects,
  POST: postProject,
  PATCH: patchProject,
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

export async function postProject(
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

export async function patchProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.findOne({
    _id: req.body._id,
  });

  if (project.userId !== req.user._id) {
    res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
    return;
  }

  const updatedProject = await projectsCollection.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name: req.body.name,
      },
    }
  );

  res.status(200).json({ data: updatedProject });
}
