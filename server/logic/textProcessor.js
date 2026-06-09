function normalizeText(text) {
  if (!text) {
    return '';
  }

  return text
    .toLowerCase()
    .replace(/[\n\r\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9\s+#.]/g, '')
    .trim();
}

function tokenize(text) {
  return text.split(' ').filter((word) => word.length > 1);
}

module.exports = {
  normalizeText,
  tokenize,
};
