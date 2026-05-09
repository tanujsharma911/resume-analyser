export const sanitizeExtractedText = (text: string): string => {
  // This regex finds any sequence of characters/words that repeats
  // consecutively and replaces the duplicates with a single instance.
  return text.replace(/\b(.+?)(?:\s+\1\b)+/g, '$1').replace(/\s{2,}/g, ' ').trim();
};