import { CollectionConfig } from 'payload/types';
import { createUploadOrURLField } from '../fields/UploadOrURL';

const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Make public
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    createUploadOrURLField('icon', 'Course Icon', true),
    createUploadOrURLField('imgSrc', 'Course Image', true),
    {
      name: 'mentor',
      type: 'text',
      required: true,
      label: 'Mentor Name (e.g. Himanshu Sanadhya (CEO))',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
    },
    {
      name: 'bestSeller',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'classes',
      type: 'number',
      required: true,
    },
    {
      name: 'students',
      type: 'number',
      required: true,
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
    },
    {
      name: 'careers',
      type: 'array',
      fields: [
        {
          name: 'career',
          type: 'text',
          required: true,
        },
        {
          name: 'salary',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'weeks',
      type: 'array',
      fields: [
        {
          name: 'week',
          type: 'text',
          required: true,
        },
        {
          name: 'topic',
          type: 'text',
          required: true,
        },
        {
          name: 'outcomes',
          type: 'array',
          fields: [
            {
              name: 'outcome',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default Courses;
