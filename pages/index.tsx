import { useEffect, useState } from 'react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [params, setParams] = useState([]);
  console.log(params);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/xbeach/params');
      const data = await response.json();
      setParams(data);
    })();
  }, []);

  return <h1 className="text-3xl font-bold underline">{'Hello world!'}</h1>;
};

export default Home;
