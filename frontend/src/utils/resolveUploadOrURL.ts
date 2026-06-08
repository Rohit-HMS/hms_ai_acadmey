export function resolveUploadOrURL(field: any, cmsUrl: string): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (field.type === 'media' && field.media) {
    const mediaUrl = typeof field.media === 'string' ? field.media : field.media.url;
    if (mediaUrl) {
      if (mediaUrl.startsWith('/')) {
        return `${cmsUrl}${mediaUrl}`;
      }
      return mediaUrl;
    }
  }
  return field.url || '';
}

export function getDynamicCmsUrl(): string {
  let url = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005';
  if (typeof window !== 'undefined') {
    // If framed inside an iframe, use the parent window's origin (from document.referrer)
    if (window.parent !== window && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);
        if (referrerUrl.protocol.startsWith('http')) {
          url = referrerUrl.origin;
        }
      } catch (e) {}
    }
  }
  return url;
}
