import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
import { toOID } from "lib/mongodb/utils";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "lib/api/middleware";
import { fetchCollection } from "lib/api/utils";

const handler = apiHandler({
  GET: getModel,
  PATCH: patchModel,
  DELETE: deleteModel,
});

export default handler;

async function getModel(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const modelsCollection = await fetchCollection(clientPromise, "models");

  const model = await modelsCollection.findOne({
    _id: toOID(req.query.id as string),
  });

  if (model.userId.toString() !== req.user.id) {
    return res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
  }

  res.status(200).json({ data: model });
}

export async function patchModel(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const modelsCollection = await fetchCollection(clientPromise, "models");

  const model = await modelsCollection.findOne({
    _id: toOID(req.query.id as string),
  });

  if (model.userId.toString() !== req.user.id) {
    return res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
  }

  const updatedModel = await modelsCollection.updateOne(
    {
      _id: toOID(req.query.id as string),
    },
    {
      $set: {
        ...req.body,
      },
    }
  );

  res.status(200).json({ data: updatedModel });
}

export async function deleteModel(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const modelsCollection = await fetchCollection(clientPromise, "models");

  const model = await modelsCollection.findOne({
    _id: toOID(req.query.id as string),
  });

  if (model.userId.toString() !== req.user.id) {
    return res.status(401).json({
      data: null,
      error: {
        code: "unauthorized",
        message: "You are not authenticated.",
      },
    });
  }

  const deletedModel = await modelsCollection.deleteOne({
    _id: toOID(req.query.id as string),
  });

  res.status(200).json({ data: deletedModel });
}
