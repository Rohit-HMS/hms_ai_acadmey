import { CollectionConfig } from 'payload/types';
import path from 'path';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Make public
  },
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    staticURL: '/media',
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
