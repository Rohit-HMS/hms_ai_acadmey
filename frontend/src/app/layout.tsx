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

                // Complete Payload Live Preview handshake after page loads to prevent webpack race conditions
                var parentWin = window.opener || window.parent;
                if (parentWin && parentWin !== window) {
                  var sendHandshake = function() {
                    parentWin.postMessage({
                      type: 'payload-live-preview',
                      ready: true
                    }, '*');
                  };
                  if (document.readyState === 'complete') {
                    setTimeout(sendHandshake, 250);
                  } else {
                    window.addEventListener('load', function() {
                      setTimeout(sendHandshake, 250);
                    });
                  }
                }

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
                          try {
                            event.data.collectionSlug = collectionSlug;
                            event.data.collection = collectionSlug;
                            event.data._processed = true;
                          } catch (e) {
                            // If event.data is frozen or not writable, fallback to wrapping it
                          }
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
