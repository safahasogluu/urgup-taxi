#!/usr/bin/env node
/**
 * Mixed Language Check Script
 * Scans TR translation file for common English UI words that shouldn't be there.
 * Run with: node scripts/check-mixed-language.js
 */

const fs = require('fs');
const path = require('path');

// Common English UI words that should NOT appear in TR messages (unless intentional like "WhatsApp", "VIP")
const ENGLISH_PATTERNS = [
  // Generic UI terms
  /\b(Premium|Service|Services|Transfer|Transfers|Booking|Available|Experience|Comfort|Professional)\b/gi,
  /\b(Luxury|Vehicles|Drivers|Flexible|Reliable|Fast|Response|Prices)\b/gi,
  /\b(Airport|Home|Contact|Navigation|Location|Map|Address|Duration|Distance)\b/gi,
  /\b(Success|Error|Submit|Cancel|Book Now|Call Now|Learn More)\b/gi,
  /\b(Frequently Asked Questions|FAQ|How It Works|Why Choose Us)\b/gi,
  /\b(All rights reserved|Open 24\/7|24\/7 Service)\b/gi,
  // Phrases
  /\bDoor to Door\b/gi,
  /\bFlight Tracking\b/gi,
  /\bMake a Reservation\b/gi,
];

// Allowed English words (brand names, proper nouns, etc.)
const ALLOWED_ENGLISH = [
  'whatsapp',
  'vip',
  'mercedes',
  'vito',
  'google',
  'maps',
  'email',
  'e-posta', // Turkish for email
  'transfer', // can be Turkish too (same spelling)
  'premium', // common loanword in Turkish
];

function checkFile(filePath, locale) {
  const content = fs.readFileSync(filePath, 'utf8');
  let json;
  try {
    json = JSON.parse(content);
  } catch (e) {
    console.error(`❌ Failed to parse ${filePath}: ${e.message}`);
    return { errors: 1, warnings: 0 };
  }

  const errors = [];
  const warnings = [];

  function checkValue(key, value, parentKey = '') {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([k, v]) => {
        checkValue(k, v, parentKey ? `${parentKey}.${key}` : key);
      });
    } else if (typeof value === 'string') {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      
      ENGLISH_PATTERNS.forEach((pattern) => {
        const matches = value.match(pattern);
        if (matches) {
          matches.forEach((match) => {
            const lowerMatch = match.toLowerCase();
            if (!ALLOWED_ENGLISH.includes(lowerMatch)) {
              errors.push({
                key: fullKey,
                match,
                value: value.substring(0, 60) + (value.length > 60 ? '...' : ''),
              });
            }
          });
        }
      });
    }
  }

  checkValue('', json);

  return { errors, warnings };
}

function main() {
  console.log('🔍 Mixed Language Check\n');
  console.log('Checking TR translations for English UI terms...\n');

  const trPath = path.join(__dirname, '..', 'messages', 'tr.json');
  
  if (!fs.existsSync(trPath)) {
    console.error('❌ TR translation file not found:', trPath);
    process.exit(1);
  }

  const result = checkFile(trPath, 'tr');

  if (result.errors.length === 0) {
    console.log('✅ No mixed-language issues found in TR translations!\n');
    console.log('The TR locale file passes the English UI term check.');
    process.exit(0);
  } else {
    console.log(`❌ Found ${result.errors.length} potential mixed-language issue(s):\n`);
    result.errors.forEach((err, i) => {
      console.log(`  ${i + 1}. Key: "${err.key}"`);
      console.log(`     Match: "${err.match}"`);
      console.log(`     Value: "${err.value}"\n`);
    });
    console.log('\nIf these are intentional (brand names, etc.), add them to ALLOWED_ENGLISH in this script.');
    process.exit(1);
  }
}

main();

