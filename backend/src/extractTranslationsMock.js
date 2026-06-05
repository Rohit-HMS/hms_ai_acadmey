const translations = require('payload/dist/translations/index');

const extractTranslations = (keys) => {
  const result = {};
  keys.forEach((key) => {
    result[key] = {};
  });
  
  const transObj = translations.default || translations;
  if (transObj) {
    Object.entries(transObj).forEach(([language, resource]) => {
      keys.forEach((key) => {
        const [section, target] = key.split(':');
        if (resource && resource[section] && resource[section][target]) {
          result[key][language] = resource[section][target];
        } else {
          result[key][language] = target || key;
        }
      });
    });
  }
  return result;
};

module.exports = {
  extractTranslations
};
