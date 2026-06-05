import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import Users from './collections/Users';
import Courses from './collections/Courses';
import Mentors from './collections/Mentors';
import Testimonials from './collections/Testimonials';
import Media from './collections/Media';
import Footer from './globals/Footer';
import Hero from './globals/Hero';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3005',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      if (config.optimization) {
        config.optimization.minimize = false;
      }
      return config;
    },
    livePreview: {
      url: ({ data, documentInfo }) => {
        const collection = documentInfo?.collection;
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        if (collection?.slug === 'courses') {
          return `${frontendUrl}/courses/${data.slug}`;
        }
        return frontendUrl;
      },
      collections: ['courses', 'mentors', 'testimonials'],
      globals: ['hero', 'footer'],
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hms-academy',
  }),
  collections: [
    Users,
    Courses,
    Mentors,
    Testimonials,
    Media,
  ],
  globals: [
    Footer,
    Hero,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
  ],
  // Trigger config reload
});
