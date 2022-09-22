import { apiHandler } from "lib/api";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = apiHandler({
  GET: readParams,
});

export default handler;

async function readParams(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    "https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/tables/partable_all.tab"
  );
  const text = await response.text();
  const lines = text.split("\n");
  const headers = lines[0].split("\t");
  const params = lines.slice(1).map((line) => {
    const values = line.split("\t");
    const param = {} as Record<string, string>;
    headers.forEach((header, index) => {
      param[header] = values[index];
    });
    return param;
  });
  res.status(200).json(params);
}
