import { useQuery } from '@tanstack/react-query';

import { xBeachParamsKeys, readXBeachParams } from './queries';

export const useReadXBeachParams = () => {
  return useQuery(xBeachParamsKeys.all, () => readXBeachParams());
};
