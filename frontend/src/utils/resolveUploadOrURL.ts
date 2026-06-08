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
