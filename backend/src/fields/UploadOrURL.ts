import { Field } from 'payload/types';

export const createUploadOrURLField = (name: string, label: string, required = false): Field => {
  return {
    name,
    type: 'group',
    label,
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'url',
        required: true,
        options: [
          { label: 'External URL / Icon Name', value: 'url' },
          { label: 'Upload from Media', value: 'media' },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'url',
        type: 'text',
        label: 'URL or Icon Name',
        required: required, // If type is url, enforce required constraint if required parameter is true
        admin: {
          condition: (data, siblingData) => siblingData?.type === 'url',
        },
      },
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        label: 'Select Media',
        required: required, // If type is media, enforce required constraint if required parameter is true
        admin: {
          condition: (data, siblingData) => siblingData?.type === 'media',
        },
      },
    ],
  };
};
