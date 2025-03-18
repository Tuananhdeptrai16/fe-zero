export const SCHEMA_TEMPLATE_SELECT = {
  type: 'array',
  items: [
    {
      type: 'object',
      properties: {
        value: { type: ['string', 'number'] },
        label: { type: ['string', 'number'] },
      },
    },
  ],
};

export const SCHEMA_TEMPLATE_DATE = {
  type: 'object',
  properties: {
    min: { type: ['string', 'number'] },
    max: { type: ['string', 'number'] },
    valueDefault: { type: ['string', 'number'] },
  },
};
