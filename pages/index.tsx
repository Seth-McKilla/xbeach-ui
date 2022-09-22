import { useReadXBeachParams } from 'hooks';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data: xBeachParams, isLoading } = useReadXBeachParams();

  return <h1 className="text-3xl font-bold underline">{'Hello world!'}</h1>;
};

export default Home;
