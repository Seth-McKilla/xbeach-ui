import { apiHandler } from 'lib/api';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = apiHandler({
  GET: readParams,
});

export default handler;

async function readParams(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    'https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/tables/partable_all.tab',
  );
  const text = await response.text();

  const params = {};
  let currentParam: string;

  for (let line of text.split('\n')) {
    line = line.trim();

    if (line.match(/^[a-zA-Z]/)) {
      currentParam = line;
      params[currentParam] = {};
    } else if (line.match(/^:/)) {
      let [, key, value] = line.split(':');
      key = key.trim();
      value = value.trim() || '-';
      if (key.match(/(advanced|silent|required)/i)) {
        key.split(',').forEach((k) => {
          params[currentParam][k] = true;
        });
      } else {
        params[currentParam][key] = value;
      }
    } else {
      continue;
    }
  }

  const paramsArray = Object.keys(params).map((key) => ({
    name: key,
    ...params[key],
  }));

  res.status(200).json({ data: paramsArray });
}
