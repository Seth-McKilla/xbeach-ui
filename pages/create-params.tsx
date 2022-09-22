import { Loader } from 'components';
import { useReadXBeachParams } from 'hooks';

import type { NextPage } from 'next';

const CreateParams: NextPage = () => {
  const { data: xBeachParams, isLoading } = useReadXBeachParams();

  return isLoading ? (
    <Loader />
  ) : (
    <pre className="p-4 bg-gray-100 rounded-md">
      {JSON.stringify(xBeachParams, null, 2)}
    </pre>
  );
};

export default CreateParams;
