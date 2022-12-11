import { Fragment } from "react";

import InputsParams, { type ParamCollection } from "./InputsParams";

export default async function CreateParamsPage() {
  const xBeachParams = await getParams();

  return (
    <div className="container max-w-6xl p-2 mx-auto">
      {xBeachParams?.map((paramCollection: ParamCollection, idx: number) => {
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
  const res = await fetch("http://localhost:3000/api/xbeach/params");
  const { data } = await res.json();
  return data;
}
