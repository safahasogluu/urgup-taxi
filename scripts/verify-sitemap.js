/**
 * Verify sitemap.xml for duplicates and TR-only page correctness
 * Run: node scripts/verify-sitemap.js
 */

const https = require('https');
const http = require('http');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.urguptaxi.com';
const sitemapUrl = `${siteUrl}/sitemap.xml`;

// TR-only pages (should only appear as /tr/*)
const trOnlyPages = [
  'urgup-terminal-taksi',
  'urgup-taksi-duraklari',
  'nevsehir-havalimani-transfer',
  'kayseri-havalimani-transfer',
  'kapadokya-taksi',
  'nevsehir-taksi',
];

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

function parseSitemap(xml) {
  const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  const urls = [];
  for (const match of urlMatches) {
    urls.push(match[1]);
  }
  return urls;
}

async function verifySitemap() {
  console.log('🔍 Verifying sitemap.xml...\n');
  console.log(`📡 Fetching: ${sitemapUrl}\n`);

  try {
    const xml = await fetchSitemap(sitemapUrl);
    const urls = parseSitemap(xml);

    console.log(`✅ Found ${urls.length} URLs in sitemap\n`);

    // Check for duplicates
    const urlCounts = new Map();
    const duplicates = [];
    urls.forEach((url) => {
      const count = urlCounts.get(url) || 0;
      urlCounts.set(url, count + 1);
      if (count === 1) {
        duplicates.push(url);
      }
    });

    if (duplicates.length > 0) {
      console.log('❌ DUPLICATE URLs found:\n');
      duplicates.forEach((url) => {
        console.log(`   ${url} (appears ${urlCounts.get(url)} times)`);
      });
      console.log('');
      process.exit(1);
    } else {
      console.log('✅ No duplicate URLs found\n');
    }

    // Check TR-only pages
    console.log('🔍 Checking TR-only pages...\n');
    let hasErrors = false;

    trOnlyPages.forEach((page) => {
      const trUrl = `${siteUrl}/tr/${page}`;
      const nonTrUrls = ['en', 'ko', 'ja', 'zh-hans'].map(
        (locale) => `${siteUrl}/${locale}/${page}`
      );

      const hasTr = urls.includes(trUrl);
      const hasNonTr = nonTrUrls.some((url) => urls.includes(url));

      if (!hasTr) {
        console.log(`❌ Missing TR URL: ${trUrl}`);
        hasErrors = true;
      }

      if (hasNonTr) {
        console.log(`❌ Found non-TR URL for TR-only page:`);
        nonTrUrls.forEach((url) => {
          if (urls.includes(url)) {
            console.log(`   ${url}`);
          }
        });
        hasErrors = true;
      }

      if (hasTr && !hasNonTr) {
        console.log(`✅ ${page}: Only /tr variant present`);
      }
    });

    console.log('');

    // Check canonical host
    const nonCanonical = urls.filter(
      (url) => !url.startsWith('https://www.urguptaxi.com')
    );
    if (nonCanonical.length > 0) {
      console.log('❌ Non-canonical URLs found:\n');
      nonCanonical.forEach((url) => console.log(`   ${url}`));
      console.log('');
      hasErrors = true;
    } else {
      console.log('✅ All URLs use canonical host (https://www.urguptaxi.com)\n');
    }

    if (hasErrors) {
      process.exit(1);
    }

    console.log('✅ All checks passed!\n');
    console.log(`📊 Summary:`);
    console.log(`   Total URLs: ${urls.length}`);
    console.log(`   Unique URLs: ${new Set(urls).size}`);
    console.log(`   TR-only pages: ${trOnlyPages.length} (all correct)`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Tip: Make sure the site is running locally or use production URL');
    process.exit(1);
  }
}

verifySitemap();
