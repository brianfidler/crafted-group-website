#!/usr/bin/env node

/**
 * Simple on-site SEO audit script.
 *
 * - Crawls a set of routes on the running site (default http://localhost:3000)
 * - Checks titles, meta descriptions, headings, canonical tags, lang, images, links, and JSON-LD schema
 * - Writes a structured report to seo-report.json for further analysis by an SEO/content agent
 *
 * Usage:
 *   # Ensure your Next.js dev server is running
 *   npm run dev
 *
 *   # In another terminal, run:
 *   npm run seo:audit
 *
 * Optional env:
 *   SEO_AUDIT_BASE_URL  (default: http://localhost:3000, or PORT env if set)
 *   SEO_AUDIT_ROUTES    (comma-separated, default: /,/about,/services,/case-studies,/pricing,/blog,/contact,/privacy,/terms)
 *   PORT                (if set, used to construct base URL: http://localhost:${PORT})
 *
 * Optional CLI args:
 *   --port=3001         (sets port: http://localhost:3001)
 *   --url=http://localhost:3001  (sets full base URL)
 *
 * Examples:
 *   npm run seo:audit
 *   npm run seo:audit -- --port=3001
 *   npm run seo:audit -- --url=http://localhost:3001
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Load .env.local if present (for base URL overrides, etc.)
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv is already a dependency; ignore if not available for some reason
}

if (typeof fetch !== 'function') {
  console.error('❌ Global fetch is not available. Please run this script with Node 18+.');
  process.exit(1);
}

// Determine base URL from: CLI arg, env var, PORT env (Next.js), or default
let baseUrl = process.env.SEO_AUDIT_BASE_URL;
if (!baseUrl) {
  const portArg = process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1];
  const urlArg = process.argv.find((arg) => arg.startsWith('--url='))?.split('=')[1];
  if (urlArg) {
    baseUrl = urlArg;
  } else if (portArg) {
    baseUrl = `http://localhost:${portArg}`;
  } else if (process.env.PORT) {
    baseUrl = `http://localhost:${process.env.PORT}`;
  } else {
    // Default to 3000 (standard Next.js port)
    baseUrl = 'http://localhost:3000';
  }
}
const BASE_URL = baseUrl.replace(/\/$/, '');

const DEFAULT_ROUTES = [
  '/',
  '/about',
  '/services',
  '/case-studies',
  '/pricing',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
];

const ROUTES = (process.env.SEO_AUDIT_ROUTES
  ? process.env.SEO_AUDIT_ROUTES.split(',').map((r) => r.trim()).filter(Boolean)
  : DEFAULT_ROUTES);

function logSection(title) {
  console.log('\n' + '='.repeat(title.length));
  console.log(title);
  console.log('='.repeat(title.length));
}

async function fetchHtml(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    throw new Error(`Expected HTML but received content-type: ${contentType || 'unknown'}`);
  }
  return res.text();
}

function analyzePage(route, url, html) {
  const $ = cheerio.load(html);
  const issues = [];
  const meta = {};

  // <html lang="en">
  const htmlLang = $('html').attr('lang');
  meta.lang = htmlLang || null;
  if (!htmlLang) {
    issues.push({
      severity: 'medium',
      type: 'html-lang-missing',
      message: 'Missing lang attribute on <html> element (e.g. lang="en").',
    });
  }

  // Title
  const title = $('title').first().text().trim();
  meta.title = title || null;
  if (!title) {
    issues.push({
      severity: 'high',
      type: 'title-missing',
      message: 'Missing <title> tag.',
    });
  } else {
    if (title.length < 30) {
      issues.push({
        severity: 'medium',
        type: 'title-too-short',
        message: `Title is quite short (${title.length} chars). Aim for 40–65 characters.`,
      });
    } else if (title.length > 70) {
      issues.push({
        severity: 'low',
        type: 'title-too-long',
        message: `Title is long (${title.length} chars). Many SERPs truncate around 60–70 characters.`,
      });
    }
  }

  // Meta description
  const metaDescription = $('meta[name="description"]').attr('content');
  const description = metaDescription ? metaDescription.trim() : '';
  meta.description = description || null;
  if (!description) {
    issues.push({
      severity: 'high',
      type: 'meta-description-missing',
      message: 'Missing meta description.',
    });
  } else if (description.length < 70) {
    issues.push({
      severity: 'medium',
      type: 'meta-description-too-short',
      message: `Meta description is short (${description.length} chars). Aim for 120–160 characters.`,
    });
  } else if (description.length > 180) {
    issues.push({
      severity: 'low',
      type: 'meta-description-too-long',
      message: `Meta description is long (${description.length} chars). Many SERPs truncate around 160 characters.`,
    });
  }

  // Canonical tag
  const canonical = $('link[rel="canonical"]').attr('href');
  meta.canonical = canonical || null;
  if (!canonical) {
    issues.push({
      severity: 'medium',
      type: 'canonical-missing',
      message: 'Missing <link rel="canonical"> tag.',
    });
  }

  // Headings
  const h1s = $('h1');
  meta.h1Count = h1s.length;
  if (h1s.length === 0) {
    issues.push({
      severity: 'medium',
      type: 'h1-missing',
      message: 'No <h1> on page. Each page should have a single primary heading.',
    });
  } else if (h1s.length > 1) {
    issues.push({
      severity: 'low',
      type: 'multiple-h1',
      message: `Found ${h1s.length} <h1> elements. Prefer a single primary heading.`,
    });
  }

  // Heading hierarchy (H1-H6)
  const headingHierarchyIssues = [];
  let lastLevel = null;
  $('h1,h2,h3,h4,h5,h6').each((_, el) => {
    const tag = el.tagName && el.tagName.toLowerCase();
    const level = Number(tag.replace('h', ''));
    if (!Number.isFinite(level)) return;
    if (lastLevel !== null && level > lastLevel + 1) {
      headingHierarchyIssues.push(`Heading jumps from h${lastLevel} to h${level}.`);
    }
    lastLevel = level;
  });
  if (headingHierarchyIssues.length > 0) {
    issues.push({
      severity: 'low',
      type: 'heading-hierarchy',
      message: headingHierarchyIssues.join(' '),
    });
  }

  // Images without alt text
  let imagesWithoutAlt = 0;
  const exampleImagesWithoutAlt = [];
  $('img').each((index, el) => {
    const alt = ($(el).attr('alt') || '').trim();
    if (!alt) {
      imagesWithoutAlt += 1;
      if (exampleImagesWithoutAlt.length < 5) {
        exampleImagesWithoutAlt.push({
          index,
          src: ($(el).attr('src') || '').trim() || null,
        });
      }
    }
  });
  if (imagesWithoutAlt > 0) {
    issues.push({
      severity: 'medium',
      type: 'images-missing-alt',
      message: `${imagesWithoutAlt} image(s) missing alt text (first few: ${exampleImagesWithoutAlt
        .map((img) => img.src || `#${img.index}`)
        .join(', ')}).`,
    });
  }

  // Links with poor href values
  let badLinks = 0;
  $('a').each((_, el) => {
    const href = ($(el).attr('href') || '').trim();
    if (!href || href === '#' || href.toLowerCase().startsWith('javascript:')) {
      badLinks += 1;
    }
  });
  if (badLinks > 0) {
    issues.push({
      severity: 'low',
      type: 'links-poor-href',
      message: `${badLinks} <a> tag(s) with empty, "#" or javascript: href values.`,
    });
  }

  // JSON-LD schema
  const schemaScripts = $('script[type="application/ld+json"]');
  meta.schemaCount = schemaScripts.length;
  if (schemaScripts.length === 0) {
    issues.push({
      severity: 'medium',
      type: 'schema-missing',
      message: 'No JSON-LD schema.org markup found. Consider adding WebSite/Organization/Person schema as appropriate.',
    });
  } else {
    const schemaTypes = [];
    schemaScripts.each((_, el) => {
      const raw = $(el).contents().text();
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (item && item['@type']) schemaTypes.push(item['@type']);
          });
        } else if (parsed && parsed['@type']) {
          schemaTypes.push(parsed['@type']);
        }
      } catch {
        issues.push({
          severity: 'low',
          type: 'schema-invalid-json',
          message: 'Found script[type="application/ld+json"] that is not valid JSON.',
        });
      }
    });
    meta.schemaTypes = schemaTypes;
  }

  return {
    route,
    url,
    meta,
    issues,
  };
}

function markDuplicateMeta(pages) {
  const titleMap = new Map();
  const descMap = new Map();

  for (const page of pages) {
    if (page.meta.title) {
      const key = page.meta.title.toLowerCase();
      if (!titleMap.has(key)) titleMap.set(key, []);
      titleMap.get(key).push(page);
    }
    if (page.meta.description) {
      const key = page.meta.description.toLowerCase();
      if (!descMap.has(key)) descMap.set(key, []);
      descMap.get(key).push(page);
    }
  }

  for (const [title, titlePages] of titleMap.entries()) {
    if (title && titlePages.length > 1) {
      for (const page of titlePages) {
        page.issues.push({
          severity: 'medium',
          type: 'duplicate-title',
          message: `Title "${title}" is shared with ${titlePages.length - 1} other page(s).`,
        });
      }
    }
  }

  for (const [desc, descPages] of descMap.entries()) {
    if (desc && descPages.length > 1) {
      for (const page of descPages) {
        page.issues.push({
          severity: 'low',
          type: 'duplicate-description',
          message: `Meta description is duplicated on ${descPages.length} page(s).`,
        });
      }
    }
  }
}

async function run() {
  logSection('SEO Audit');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Routes:   ${ROUTES.join(', ')}`);

  const pages = [];

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`\n→ Auditing ${url} ...`);
    try {
      const html = await fetchHtml(url);
      const pageResult = analyzePage(route, url, html);
      pages.push(pageResult);
      const issueCount = pageResult.issues.length;
      console.log(`   Found ${issueCount} issue${issueCount === 1 ? '' : 's'}.`);
    } catch (error) {
      console.error(`   ❌ Failed to audit ${url}: ${error.message}`);
      pages.push({
        route,
        url,
        meta: {},
        issues: [
          {
            severity: 'high',
            type: 'fetch-error',
            message: error.message,
          },
        ],
      });
    }
  }

  // Cross-page meta analysis
  markDuplicateMeta(pages);

  // Write JSON report
  const report = {
    baseUrl: BASE_URL,
    auditedAt: new Date().toISOString(),
    routes: ROUTES,
    pages,
  };

  const reportPath = path.join(process.cwd(), 'seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  // Human-friendly summary
  logSection('Summary');
  let totalIssues = 0;
  const bySeverity = { high: 0, medium: 0, low: 0 };

  for (const page of pages) {
    totalIssues += page.issues.length;
    page.issues.forEach((issue) => {
      if (bySeverity[issue.severity] !== undefined) {
        bySeverity[issue.severity] += 1;
      }
    });
  }

  console.log(`Pages audited: ${pages.length}`);
  console.log(`Total issues:  ${totalIssues}`);
  console.log(`  High:   ${bySeverity.high}`);
  console.log(`  Medium: ${bySeverity.medium}`);
  console.log(`  Low:    ${bySeverity.low}`);
  console.log(`\nDetailed machine-readable report written to: ${reportPath}`);
  console.log('Use this file as input for the SEO/content strategist agents.');
}

run().catch((error) => {
  console.error('\n❌ SEO audit failed:', error.message);
  process.exit(1);
});


