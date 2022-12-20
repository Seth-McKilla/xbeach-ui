import type { NextApiResponse } from "next";

import {
  apiHandler,
  type NextApiRequestAuthenticated,
} from "@/lib/api/middleware";
import { stringToNumber } from "@/lib/common";

const handler = apiHandler({
  GET: getParams,
});

export default handler;

const defaultParam = {
  default: "",
  description: "",
  units: "",
  range: "",
  advanced: false,
  silent: false,
  required: false,
};
export type Param = Partial<typeof defaultParam>;

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

  const params: Record<string, Record<string, Param>> = {};
  let currentParam: string;

  await Promise.all(
    tables.map(async (table) => {
      const title = table.split("partable_")[1].replace(".tab", "");

      const ignoredParams = ["spaceparams"];
      if (ignoredParams.includes(title)) return;

      params[title] = {};

      const response = await fetch(
        `https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/tables/${table}`
      );
      const text = await response.text();

      for (let line of text.split("\n")) {
        line = line.trim();

        /* 
          1. Create a new parameter category
        */
        if (line.match(/^[a-zA-Z]/)) {
          currentParam = line;
          params[title][currentParam] = { ...defaultParam };
          continue;
        }

        /* 
          2. Format parameter values
        */
        if (line.match(/^:/)) {
          let [, key, stringValue] = line.split(":");
          key = key.trim();
          let value: string | number | boolean;

          switch (key) {
            case "default":
              value = stringToNumber(stringValue.trim());
              break;

            case "description":
              value = stringValue.trim();
              break;

            case "units":
              value = stringValue.trim();
              if (value === "-") value = "";
              break;

            case "range":
              value = stringValue.trim();
              break;

            case "advanced":
            case "silent":
            case "required":
              value = true;
              break;
          }

          /* 
            3. Add formatted parameter to correct category
          */
          params[title][currentParam][key] = value;
        }
      }
    })
  );

  return params;
}
