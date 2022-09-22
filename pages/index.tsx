import Image from 'next/future/image';

import { Loader } from 'components';
import { useReadXBeachParams } from 'hooks';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data: xBeachParams, isLoading } = useReadXBeachParams();

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex items-center justify-center pt-3 pb-3">
        <a
          href="https://oss.deltares.nl/web/xbeach/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://oss.deltares.nl/image/layout_set_logo?img_id=4177670&amp;t=1663572973403"
            alt="XBeach logo"
            width={75}
            height={75}
            style={{ marginRight: 10 }}
          />
        </a>
        <h1 className="text-4xl font-bold text-center text-blue-800">
          {'XBeach UI'}
        </h1>
      </div>
      <div className="container max-w-2xl pb-4 mx-auto">
        <h3 className="mb-4 text-2xl font-bold text-center">
          {'Quality of life tools for XBeach'}
        </h3>
        <p className="text-sm">
          {
            'This project is not affiliated with Deltares or XBeach in any way. It is a community project to make XBeach more accessible to the general public. If you have any questions or would like to contribute, feel free to reach out to me on '
          }
          <a
            href="https://github.com/Seth-McKilla"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-500"
          >
            {'GitHub'}
          </a>
          {' or '}
          <a
            href="https://twitter.com/SethMcKilla"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-500"
          >
            {'Twitter'}
          </a>
          {'.'}
        </p>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <pre className="p-4 bg-gray-100 rounded-md">
          {JSON.stringify(xBeachParams, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Home;
