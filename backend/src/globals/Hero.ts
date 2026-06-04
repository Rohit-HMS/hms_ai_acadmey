import { GlobalConfig } from 'payload/types';

const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (Discount/Promo)',
      defaultValue: 'Get 30% off on first enroll',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title (Main Heading)',
      defaultValue: 'BECOME AI-READY IN 30–120 DAYS',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (Sub-heading)',
      defaultValue: 'Don’t Just Learn. Build Real Products.',
      required: true,
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Bar Placeholder',
      defaultValue: 'Search engineering courses...',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features List',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      defaultValue: [
        { text: 'Flexible Schedules' },
        { text: 'Guided Learning Paths' },
        { text: 'Peer Support Community' },
      ],
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Feature Text',
          required: true,
        },
      ],
    },
  ],
};

export default Hero;
