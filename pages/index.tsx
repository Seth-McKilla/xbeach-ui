import Image from 'next/future/image';

import { LinkButton } from 'components';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="container max-w-4xl p-2 mx-auto">
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
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <h3 className="mb-4 text-3xl font-bold text-center">
          <span role="img" aria-label="hammer and wrench" className="mr-1">
            {'🛠️'}
          </span>
          {'Tools'}
        </h3>
        <LinkButton href="/create-params">{'Create XBeach Params'}</LinkButton>
      </div>
    </div>
  );
};

export default Home;
