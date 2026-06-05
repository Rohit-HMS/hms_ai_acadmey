import express from 'express';
import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

// Helper function to recursively populate media fields in draft data
async function populateMediaFields(obj: any, payloadInstance: any): Promise<any> {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => populateMediaFields(item, payloadInstance)));
  }

  const newObj = { ...obj };
  for (const key of Object.keys(newObj)) {
    const val = newObj[key];
    if (key === 'media' && typeof val === 'string' && val.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        const mediaDoc = await payloadInstance.findByID({
          collection: 'media',
          id: val,
        });
        if (mediaDoc) {
          newObj[key] = mediaDoc;
        }
      } catch (err) {
        console.error(`Error populating media field: ${val}`, err);
      }
    } else if (typeof val === 'object' && val !== null) {
      newObj[key] = await populateMediaFields(val, payloadInstance);
    }
  }
  return newObj;
}

// Add custom CORS headers middleware to allow Payload's live-preview preflight requests
app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.PAYLOAD_PUBLIC_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
  ];
  const origin = req.headers.origin;
  const isLocalhost = origin && /^http:\/\/localhost:\d+$/.test(origin);
  if (origin && (allowedOrigins.includes(origin) || isLocalhost)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Encoding, x-apollo-tracing, x-payload-http-method-override');
  res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  const methodOverrideHeader = req.headers['x-payload-http-method-override'] || req.headers['x-http-method-override'];
  
  if (methodOverrideHeader === 'GET') {
    const match = req.path.match(/^\/api\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/);
    if (match) {
      const collectionSlug = match[1];
      const id = match[2];
      
      if (['courses', 'mentors', 'testimonials'].includes(collectionSlug)) {
        const draftData = req.body && req.body.data;
        if (draftData) {
          populateMediaFields(draftData, payload).then((populated) => {
            return res.json({
              id,
              ...draftData,
              ...populated
            });
          }).catch((err) => {
            console.error('[LIVE PREVIEW INTERCEPT] Interceptor error:', err);
            next();
          });
          return;
        }
      }
    }
  }

  if (req.headers['x-payload-http-method-override']) {
    req.headers['x-http-method-override'] = req.headers['x-payload-http-method-override'];
  }
  
  next();
});

// Redirect root request to Payload Admin Panel
app.get('/', (_, res) => {
  res.redirect('/admin/');
});

// Fallback for admin routes to avoid 404/CSP errors in production
if (process.env.NODE_ENV === 'production') {
  app.get('/admin*', (req, res, next) => {
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return next();
    }
    const indexPath = path.resolve(process.cwd(), './build/index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        next(err);
      }
    });
  });
}

const start = async () => {
  // Initialize Payload CMS
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key-for-hms-academy',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Start Express Server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start();
