import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const serverUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var originalAdd = window.addEventListener;
                window.addEventListener = function(type, listener, options) {
                  if (type === 'message' && typeof listener === 'function') {
                    var wrapped = function(event) {
                      if (event && event.data && (event.data.type === 'payload-live-preview' || event.data.type === 'payload:live-preview')) {
                        if (event.data._processed) {
                          return listener(event);
                        }
                        var collectionSlug = event.data.collectionSlug;
                        var data = event.data.data;
                        if (!collectionSlug && data) {
                          if ('slug' in data && 'duration' in data) {
                            collectionSlug = 'courses';
                          } else if ('comment' in data && 'rating' in data) {
                            collectionSlug = 'testimonials';
                          } else if ('profession' in data) {
                            collectionSlug = 'mentors';
                          }
                        }
                        if (collectionSlug) {
                          var proxiedData = new Proxy(event.data, {
                            get: function(target, prop) {
                               if (prop === 'collectionSlug' || prop === 'collection') return collectionSlug;
                               if (prop === '_processed') return true;
                              var val = target[prop];
                              if (typeof val === 'function') {
                                return val.bind(target);
                              }
                              return val;
                            }
                          });
                          var proxiedEvent = new Proxy(event, {
                            get: function(target, prop) {
                              if (prop === 'data') return proxiedData;
                              var val = target[prop];
                              if (typeof val === 'function') {
                                return val.bind(target);
                              }
                              return val;
                            }
                          });
                          return listener(proxiedEvent);
                        }
                      }
                      return listener(event);
                    };
                    listener._wrapped = wrapped;
                    return originalAdd.call(this, type, wrapped, options);
                  }
                  return originalAdd.call(this, type, listener, options);
                };

                var originalRemove = window.removeEventListener;
                window.removeEventListener = function(type, listener, options) {
                  if (type === 'message' && typeof listener === 'function') {
                    var target = listener._wrapped || listener;
                    return originalRemove.call(this, type, target, options);
                  }
                  return originalRemove.call(this, type, listener, options);
                };
              })();
            `
          }}
        />
      </head>
      <body className={`${font.className}`}>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
