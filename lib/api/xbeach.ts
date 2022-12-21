import {
  deepSearchAndReplace,
  removeEscapedQuotes,
  stringToNumber,
} from "@/lib/common";

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

export async function readParams() {
  const response = await fetch(
    "https://raw.githubusercontent.com/Seth-McKilla/xbeach-docs/master/docs/xbeach_manual.rst"
  );
  const text = await response.text();

  const tables: Array<string> = [];

  // 1. CREATE ARRAY OF TABLE FILENAMES TO FETCH
  for (let line of text.split("\n")) {
    if (line.startsWith(".. include::")) {
      tables.push(line.split("/")[1].replace("\r", ""));
    }
  }

  const params: Record<string, Record<string, Param>> = {};

  let currentParam: string;

  // 2. INSTANTIATE GLOBAL VARIABLES (FOR REPLACING PARAMETER VALUES)
  const globalVars = ["tstart", "tstop"];
  const globalVarDefs = {};

  await Promise.all(
    tables.map(async (table) => {
      const title = table.split("partable_")[1].replace(".tab", "");

      const ignoredParams = ["spaceparams"];
      if (ignoredParams.includes(title)) return;

      params[title] = {};

      const response = await fetch(
        `https://raw.githubusercontent.com/Seth-McKilla/xbeach-docs/master/docs/tables/${table}`
      );
      const text = await response.text();

      for (let line of text.split("\n")) {
        line = line.trim();

        // 3. CREATE A NEW PARAMETER CATEGORY
        if (line.match(/^[a-zA-Z]/)) {
          currentParam = line;
          params[title][currentParam] = { ...defaultParam };
          continue;
        }

        // 4. FORMAT PARAMETER VALUES
        if (line.match(/^:/)) {
          let [, key, stringValue] = line.split(":");
          key = key.trim();
          let value:
            | null
            | string
            | number
            | boolean
            | { min: number | string; max: number | string };

          switch (key) {
            case "default":
              value = stringToNumber(stringValue.trim());

              // 4.1. ASSIGN GLOBAL VARIABLE DEFINITIONS
              if (globalVars.includes(currentParam)) {
                globalVarDefs[currentParam] = value;
              }
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

              if (value.includes(" - ")) {
                const ranges = value.split(" - ");
                value = {
                  min: stringToNumber(ranges[0]),
                  max: stringToNumber(ranges[1]),
                };
                // if (isNaN(+value.max)) console.log(title, currentParam, ranges);
              }
              break;

            case "advanced":
            case "silent":
            case "required":
              value = true;
              break;
          }

          // 5. ADD FORMATTED PARAMETER TO CORRECT CATEGORY
          params[title][currentParam][key] = value;
        }
      }
    })
  );

  // 6. REPLACE GLOBAL VARIABLE VALUES
  const result = deepSearchAndReplace(params, globalVarDefs);

  // console.log("GLOBAL_VARIABLES:", globalVarDefs);

  console.log("EXAMPLE_OUTPUT:", result.output_variables.tstart);

  return params;
}
