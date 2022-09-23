import { apiHandler } from 'lib/api';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = apiHandler({
  GET: readXBeachParams,
});

export default handler;

const ignoredParams = ['spaceparams'];

async function readXBeachParams(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    'https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/xbeach_manual.rst',
  );
  const text = await response.text();

  const tables: Array<string> = [];

  for (let line of text.split('\n')) {
    if (line.startsWith('.. include::')) {
      tables.push(line.split('/')[1].replace('\r', ''));
    }
  }

  const params = {};
  let currentParam: string;

  await Promise.all(
    tables.map(async (table) => {
      const title = table.split('partable_')[1].replace('.tab', '');

      if (ignoredParams.includes(title)) return;

      params[title] = {};

      const response = await fetch(
        `https://raw.githubusercontent.com/openearth/xbeach-docs/master/docs/tables/${table}`,
      );
      const text = await response.text();

      for (let line of text.split('\n')) {
        line = line.trim();

        if (line.match(/^[a-zA-Z]/)) {
          currentParam = line;
          params[title][currentParam] = {};
        } else if (line.match(/^:/)) {
          let [, key, value] = line.split(':');
          key = key.trim();
          value = value.trim() || '-';
          if (key.match(/(advanced|silent|required)/i)) {
            key.split(',').forEach((k) => {
              params[title][currentParam][k] = true;
            });
          } else {
            params[title][currentParam][key] = value;
          }
        } else {
          continue;
        }
      }
    }),
  );

  const paramsArray = Object.keys(params).map((key) => {
    return {
      title: key,
      params: Object.keys(params[key]).map((param) => {
        return {
          name: param,
          ...params[key][param],
        };
      }),
    };
  });

  res.status(200).json({ data: paramsArray });
}
