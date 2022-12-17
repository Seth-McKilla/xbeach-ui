import type { NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
import { toOID } from "lib/mongodb/utils";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "lib/api/middleware";
import { fetchCollection } from "lib/api/utils";

const handler = apiHandler({
  GET: getModels,
  POST: postModel,
});

export default handler;

async function getModels(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const modelsCollection = await fetchCollection(clientPromise, "models");

  const models = await modelsCollection
    .find({
      userId: toOID(req.user.id),
    })
    .toArray();

  res.status(200).json({ data: models });
}

export async function postModel(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const modelsCollection = await fetchCollection(clientPromise, "models");

  const model = await modelsCollection.insertOne({
    userId: toOID(req.user.id),
    ...req.body,
  });

  res.status(200).json({ data: model });
}
