import InputCheckbox from "../components/InputCheckbox";
import InputNumber from "../components/InputNumber";
import InputText from "../components/InputText";

export type Param = {
  [key: string]: any;
};

export type ParamCollection = {
  title: string;
  params: Param[];
};

export default function InputsParams({
  paramCollection,
}: {
  paramCollection: ParamCollection;
}) {
  return (
    <div className="mb-6 border-2 border-blue-800 rounded-lg">
      <h2 className="px-4 pt-2 text-2xl font-bold">
        {paramCollection.title
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h2>
      {paramCollection.params.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-4 mx-auto md:grid-cols-4 sm:grid-cols-3">
          {paramCollection.params.map((param: Param, idx: number) =>
            renderParams(param, idx)
          )}
        </div>
      ) : (
        <p className="p-4 text-md">
          {"This functionality is a beta feature and not fully tested."}
        </p>
      )}
    </div>
  );
}

function renderParams(param: Param, idx: number) {
  if (param.range === "0 - 1") {
    return (
      <InputCheckbox
        key={`${idx}-${param.name}`}
        name={param.name}
        description={param.description}
        defaultValue={!!+param.default}
      />
    );
  } else if (+param.default) {
    return (
      <InputNumber
        key={`${idx}-${param.name}`}
        name={param.name}
        description={param.description}
        defaultValue={+param.default}
      />
    );
  } else {
    return (
      <InputText
        key={`${idx}-${param.name}`}
        name={param.name}
        description={param.description}
      />
    );
  }
}
