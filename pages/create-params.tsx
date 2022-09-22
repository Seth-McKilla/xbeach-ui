import { Loader, InputNumber } from 'components';
import { useReadXBeachParams } from 'hooks';

import type { NextPage } from 'next';

const CreateParams: NextPage = () => {
  const { data: xBeachParams, isLoading } = useReadXBeachParams();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container max-w-6xl p-2 mx-auto">
      <div className="grid grid-cols-1 gap-4 p-4 mx-auto md:grid-cols-4">
        {xBeachParams?.map((param: any, idx: number) => (
          <InputNumber
            key={`${idx}-${param.name}`}
            name={param.name}
            description={param.description}
            defaultValue={+param.default}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateParams;
