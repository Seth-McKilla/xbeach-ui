import type { NextApiResponse } from "next";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "@/lib/api/middleware";
import { readParams } from "@/lib/api/xbeach";

const handler = apiHandler({
  GET: getParams,
});

export default handler;

async function getParams(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const paramsArray = await readParams();

  res.status(200).json({ data: paramsArray });
}
