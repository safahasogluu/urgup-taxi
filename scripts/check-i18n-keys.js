#!/usr/bin/env node
/**
 * i18n Key Checker
 * Compares translation files across locales and reports missing keys.
 * Exits with code 1 if any missing keys are found (fails CI/build).
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const LOCALES = ['tr', 'en', 'ko', 'ja', 'zh-hans'];
const REFERENCE_LOCALE = 'tr'; // TR is the most complete, use as reference

/**
 * Recursively extract all keys from a nested object
 */
function extractKeys(obj, prefix = '') {
  const keys = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...extractKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/**
 * Check if a key exists in a nested object
 */
function hasKey(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return false;
    }
    current = current[part];
  }
  return current !== undefined;
}

/**
 * Main checker function
 */
function checkI18nKeys() {
  console.log('🔍 Checking i18n keys across locales...\n');
  
  // Load all translation files
  const translations = {};
  for (const locale of LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing translation file: ${filePath}`);
      process.exit(1);
    }
    translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  
  // Extract all keys from reference locale
  const referenceKeys = extractKeys(translations[REFERENCE_LOCALE]);
  console.log(`📋 Reference locale (${REFERENCE_LOCALE}) has ${referenceKeys.length} keys\n`);
  
  // Also collect keys from EN that might be missing in TR
  const enKeys = extractKeys(translations['en']);
  const allKeys = [...new Set([...referenceKeys, ...enKeys])];
  
  // Check each locale against reference
  const missingByLocale = {};
  let totalMissing = 0;
  
  for (const locale of LOCALES) {
    if (locale === REFERENCE_LOCALE) continue;
    
    const missing = [];
    for (const key of allKeys) {
      if (!hasKey(translations[locale], key)) {
        missing.push(key);
      }
    }
    
    if (missing.length > 0) {
      missingByLocale[locale] = missing;
      totalMissing += missing.length;
    }
  }
  
  // Also check TR against EN (in case EN has keys TR doesn't)
  const trMissing = [];
  for (const key of enKeys) {
    if (!hasKey(translations['tr'], key)) {
      trMissing.push(key);
    }
  }
  if (trMissing.length > 0) {
    missingByLocale['tr'] = trMissing;
    totalMissing += trMissing.length;
  }
  
  // Report results
  if (totalMissing === 0) {
    console.log('✅ All locales have matching keys!\n');
    return true;
  }
  
  console.log(`❌ Found ${totalMissing} missing keys:\n`);
  
  for (const [locale, missing] of Object.entries(missingByLocale)) {
    console.log(`\n📁 ${locale}.json (${missing.length} missing):`);
    for (const key of missing) {
      console.log(`   - ${key}`);
    }
  }
  
  console.log('\n');
  return false;
}

// Run the checker
const success = checkI18nKeys();
process.exit(success ? 0 : 1);



