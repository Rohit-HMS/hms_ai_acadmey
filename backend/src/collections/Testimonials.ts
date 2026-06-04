import { CollectionConfig } from 'payload/types';
import { createUploadOrURLField } from '../fields/UploadOrURL';

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
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
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    createUploadOrURLField('imgSrc', 'Testimonial Image', true),
    {
      name: 'rating',
      type: 'number',
      required: true,
      defaultValue: 5,
    },
  ],
};

export default Testimonials;
