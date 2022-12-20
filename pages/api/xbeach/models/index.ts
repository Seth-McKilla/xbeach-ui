import type { NextApiResponse } from "next";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "@/lib/api/middleware";
import { fetchCollection } from "@/lib/api/utils";
import clientPromise from "@/lib/mongodb";
import { toOID } from "@/lib/mongodb/utils";
import { readParams } from "@/api/xbeach/params";

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

  const { projectId, ...body } = req.body;

  const params = await readParams();

  const defaultParams = params.map(({ title, params }) => ({
    [title]: params.reduce((acc, param) => {
      acc[param.name] =
        typeof +param.default === "number" ? +param.default : param.default;
      return acc;
    }, {}),
  }));

  const model = await modelsCollection.insertOne({
    userId: toOID(req.user.id),
    projectId: toOID(projectId),
    ...body,
    params: defaultParams,
  });

  res.status(200).json({ data: model });
}
