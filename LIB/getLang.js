export default function getLang(request) {
    const langHeader = request.headers.get('accept-language') || '';
    const raw = langHeader.split(',')[0].split(';')[0].trim() || 'en';
    const primaryLang = raw.split('-')[0].toLowerCase();
    return primaryLang;
  }