import { CollectionConfig } from 'payload/types';
import { createUploadOrURLField } from '../fields/UploadOrURL';

const Mentors: CollectionConfig = {
  slug: 'mentors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Make public
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'profession',
      type: 'text',
      required: true,
    },
    createUploadOrURLField('imgSrc', 'Mentor Image', true),
    {
      name: 'link',
      type: 'text',
      label: 'LinkedIn Link',
    },
  ],
};

export default Mentors;
