import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

export const initFilterByPlatform = (platform) => ({
  filters: [
    {
      name: 'platform',
      value: platform,
      operation: FILTER_OPERATION.EQ,
    },
  ],
});
