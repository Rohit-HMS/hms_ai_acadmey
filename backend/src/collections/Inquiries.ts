import { CollectionConfig } from 'payload/types';

const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit an inquiry
    read: ({ req: { user } }) => Boolean(user), // Only logged in users (admins) can read submissions
    update: ({ req: { user } }) => Boolean(user), // Only admins can update
    delete: ({ req: { user } }) => Boolean(user), // Only admins can delete
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
};

export default Inquiries;
