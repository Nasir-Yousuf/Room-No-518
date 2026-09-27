import avroPhonetic from 'nodejs-avro-phonetic';

/**
 * Transliterates phonetic English text to Bangla Unicode using the Avro engine.
 * Example: 'ami' -> 'আমি', 'tumi' -> 'তুমি', 'bangla' -> 'বাংলা', 'sh' -> 'শ'
 */
export function transliterateAvro(input) {
  if (!input) return '';
  try {
    return avroPhonetic.parse(input);
  } catch (err) {
    console.error('Avro transliteration error:', err);
    return input;
  }
}

/**
 * Strips zero-width joiners/non-joiners and standardizes common Bengali glyphs.
 */
export function normalizeBangla(text) {
  if (!text) return '';
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // strip ZWJ/ZWNJ
    .replace(/ো/g, 'ো') // normalize o-kar
    .replace(/া/g, 'া') // normalize aa-kar
    .trim();
}

/**
 * Checks whether user typed input matches the target Bangla word or expected phonetic string.
 * Supports:
 * 1. Direct Bangla match (if user typed using Bangla software or on-screen Bangla)
 * 2. Avro real-time transliteration match (e.g. 'ami' -> 'আমি')
 * 3. Exact phonetic string match (case-insensitive)
 * 4. Normalized Bangla match (tolerant of slight o-kar / hasant differences)
 */
export function checkAvroWordMatch(typedInput, targetBangla, expectedPhonetic) {
  if (!typedInput || !targetBangla) return false;

  const trimmedTyped = typedInput.trim();
  const trimmedTarget = targetBangla.trim();

  // 1. Direct Bangla exact match
  if (trimmedTyped === trimmedTarget) return true;

  // 2. Direct phonetic match
  if (expectedPhonetic && trimmedTyped.toLowerCase() === expectedPhonetic.trim().toLowerCase()) {
    return true;
  }

  // 3. Avro transliteration match
  const transliterated = transliterateAvro(trimmedTyped);
  if (transliterated === trimmedTarget) return true;

  // 4. Normalized match
  if (normalizeBangla(transliterated) === normalizeBangla(trimmedTarget)) return true;

  // 5. Fallback without trailing punctuation
  const cleanTarget = trimmedTarget.replace(/[।.,!?;:]/g, '');
  const cleanTrans = transliterated.replace(/[।.,!?;:]/g, '');
  if (cleanTrans === cleanTarget) return true;

  return false;
}

export default avroPhonetic;
