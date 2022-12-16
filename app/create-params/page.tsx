import { Fragment } from "react";

import { readParams } from "pages/api/xbeach/params";
import InputsParams, { type ParamCollection } from "./InputsParams";

export default async function CreateParamsPage() {
  const paramsArray = await getParams();

  return (
    <div className="container max-w-6xl p-2 mx-auto">
      {paramsArray?.map((paramCollection: ParamCollection, idx: number) => {
        return (
          <Fragment key={`${idx}-${paramCollection.title}`}>
            <InputsParams paramCollection={paramCollection} />
          </Fragment>
        );
      })}
    </div>
  );
}

async function getParams() {
  return await readParams();
}
