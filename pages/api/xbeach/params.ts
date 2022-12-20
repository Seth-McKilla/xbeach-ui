import type { NextApiResponse } from "next";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "@/lib/api/middleware";
import { stringToNumber } from "@/lib/utils";

const handler = apiHandler({
  GET: getParams,
});

export default handler;

const ignoredParams = ["spaceparams"];

async function getParams(
  req: NextApiRequestAuthenticated,
  res: NextApiResponse
) {
  const paramsArray = await readParams();

  res.status(200).json({ data: paramsArray });
}

export async function readParams() {
  const response = await fetch(
    "https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/xbeach_manual.rst"
  );
  const text = await response.text();

  const tables: Array<string> = [];

  for (let line of text.split("\n")) {
    if (line.startsWith(".. include::")) {
      tables.push(line.split("/")[1].replace("\r", ""));
    }
  }

  const params = {};
  let currentParam: string;

  await Promise.all(
    tables.map(async (table) => {
      const title = table.split("partable_")[1].replace(".tab", "");

      if (ignoredParams.includes(title)) return;

      params[title] = {};

      const response = await fetch(
        `https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/tables/${table}`
      );
      const text = await response.text();

      for (let line of text.split("\n")) {
        line = line.trim();

        if (line.match(/^[a-zA-Z]/)) {
          currentParam = line;
          params[title][currentParam] = {};
        } else if (line.match(/^:/)) {
          let [, key, stringValue] = line.split(":");
          key = key.trim();
          const value = stringToNumber(stringValue.trim());
          if (key.match(/(advanced|silent|required)/i)) {
            key.split(",").forEach((k) => {
              params[title][currentParam][k] = true;
            });
          } else {
            params[title][currentParam][key] = value;
          }
        } else {
          continue;
        }
      }
    })
  );

  return params;
}
