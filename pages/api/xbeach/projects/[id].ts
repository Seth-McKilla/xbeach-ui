import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
import { toOID } from "lib/mongodb/utils";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "lib/api/middleware";
import { fetchCollection } from "lib/api/utils";

const handler = apiHandler({
  GET: getProject,
  PATCH: patchProject,
  DELETE: deleteProject,
});

export default handler;

async function getProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.findOne({
    _id: toOID(req.query.id as string),
  });

  if (project.userId !== req.user.id) {
    return res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
  }

  res.status(200).json({ data: project });
}

export async function patchProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.findOne({
    _id: toOID(req.query.id as string),
  });

  if (project.userId !== req.user.id) {
    return res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
  }

  const updatedProject = await projectsCollection.updateOne(
    {
      _id: toOID(req.query.id as string),
    },
    {
      $set: {
        name: req.body.name,
      },
    }
  );

  res.status(200).json({ data: updatedProject });
}

export async function deleteProject(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const projectsCollection = await fetchCollection(clientPromise, "projects");

  const project = await projectsCollection.findOne({
    _id: toOID(req.query.id as string),
  });

  if (project.userId !== req.user.id) {
    return res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
  }

  if (project.models.length > 0) {
    return res.status(400).json({
      data: null,
      error: {
        code: "bad-request",
        message:
          "You cannot delete a project with models. Please delete the models before trying again.",
      },
    });
  }

  const deletedProject = await projectsCollection.deleteOne({
    _id: toOID(req.query.id as string),
  });

  res.status(200).json({ data: deletedProject });
}
