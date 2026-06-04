import { GlobalConfig } from 'payload/types';
import { createUploadOrURLField } from '../fields/UploadOrURL';

const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo Text',
      required: false,
    },
    createUploadOrURLField('logoSrc', 'Logo Image', false),
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            { name: 'openInNewTab', type: 'checkbox', label: 'Open in new tab', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'icon', type: 'text', required: false, label: 'Icon name (optional)'} ,
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Info',
      fields: [
        { name: 'address', type: 'textarea' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
      ],
    },
    {
      name: 'newsletterEnabled',
      type: 'checkbox',
      label: 'Enable Newsletter Signup',
      defaultValue: true,
    },
    {
      name: 'newsletterPlaceholder',
      type: 'text',
      label: 'Newsletter placeholder text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'footerBottomLinks',
      type: 'array',
      label: 'Footer Bottom Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'copyrightText',
      type: 'textarea',
      label: 'Copyright text',
      defaultValue: '© HMS Academy. All rights reserved.',
    },
  ],
};

export default Footer;
