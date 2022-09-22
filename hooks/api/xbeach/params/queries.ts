import { fetcher } from 'utils';

export const xBeachParamsKeys = {
  all: ['params'] as const,
};

export const readXBeachParams = async () => {
  return await fetcher('/api/xbeach/params');
};
