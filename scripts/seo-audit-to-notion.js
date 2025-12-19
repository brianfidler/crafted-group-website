#!/usr/bin/env node

/**
 * Send SEO audit report to Notion as a formatted page.
 *
 * Reads seo-report.json and creates/updates a Notion page with the audit results.
 *
 * Usage:
 *   # First, ensure you have a Notion integration token and database/page ID
 *   # Set these in .env.local:
 *   #   NOTION_API_TOKEN=secret_xxx
 *   #   NOTION_DATABASE_ID=xxx (optional - if you want to create pages in a database)
 *   #   NOTION_PAGE_ID=xxx (optional - if you want to append to an existing page)
 *
 *   npm run seo:audit:notion
 *
 * Environment variables:
 *   NOTION_API_TOKEN      (required) - Your Notion integration token
 *   NOTION_DATABASE_ID    (optional) - Database ID to create new pages in
 *   NOTION_PAGE_ID        (optional) - Existing page ID to append to (or create child page)
 *   NOTION_PARENT_TYPE    (optional) - "database" or "page" (default: "page")
 *   SEO_AUDIT_SITE_NAME   (optional) - Custom site identifier (default: extracted from baseUrl or package.json)
 *
 * Database Properties:
 *   When using a database, the script automatically detects your schema and populates:
 *   - Site/Website/Domain (select/text) - Site identifier
 *   - Date/Audit Date (date) - Audit date
 *   - Issues/Total Issues (number) - Total issues
 *   - High/High Issues (number) - Critical issues count
 *   - Medium/Medium Issues (number) - Medium issues count
 *   - Low/Low Issues (number) - Low issues count
 *   - Status (select) - Defaults to "To Review"
 *   - URL/Base URL (url/text) - Base URL audited
 *   - Pages/Pages Audited (number) - Number of pages
 */

const fs = require('fs');
const path = require('path');

// Load .env.local
try {
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv is already a dependency
}

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;
const NOTION_PARENT_TYPE = process.env.NOTION_PARENT_TYPE || 'page';

if (!NOTION_API_TOKEN) {
  console.error('❌ Error: NOTION_API_TOKEN not found in .env.local');
  console.error('   Get your token from: https://www.notion.so/my-integrations');
  process.exit(1);
}

// Check if @notionhq/client is available
let Client;
try {
  Client = require('@notionhq/client').Client;
} catch (error) {
  console.error('❌ Error: @notionhq/client package not found.');
  console.error('   Install it with: npm install @notionhq/client');
  process.exit(1);
}

const notion = new Client({
  auth: NOTION_API_TOKEN,
});

// Load SEO report
const reportPath = path.join(process.cwd(), 'seo-report.json');
if (!fs.existsSync(reportPath)) {
  console.error('❌ Error: seo-report.json not found.');
  console.error('   Run "npm run seo:audit" first to generate the report.');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Extract site identifier from baseUrl or package.json
function getSiteIdentifier() {
  // Try env var first
  if (process.env.SEO_AUDIT_SITE_NAME) {
    return process.env.SEO_AUDIT_SITE_NAME;
  }
  
  // Extract from baseUrl (e.g., "localhost:3000" -> "localhost:3000", "example.com" -> "example.com")
  const url = new URL(report.baseUrl);
  let siteName = url.hostname;
  if (url.port && url.port !== '80' && url.port !== '443') {
    siteName = `${url.hostname}:${url.port}`;
  }
  
  // If localhost, try to get project name from package.json
  if (siteName.startsWith('localhost')) {
    try {
      const pkgPath = path.join(process.cwd(), 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.name && pkg.name !== 'crafted-group-website') {
          return pkg.name.replace(/-website$/, '').replace(/-/g, ' ');
        }
      }
    } catch {
      // Fall back to hostname
    }
  }
  
  return siteName;
}

const siteIdentifier = getSiteIdentifier();

// Convert severity to Notion color
function severityToColor(severity) {
  switch (severity) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'yellow';
    default: return 'default';
  }
}

// Build Notion blocks from SEO report
function buildNotionBlocks(stats) {
  const blocks = [];
  const { totalIssues, highIssues, mediumIssues, lowIssues } = stats;

  // Title with site identifier
  blocks.push({
    object: 'block',
    type: 'heading_1',
    heading_1: {
      rich_text: [
        {
          type: 'text',
          text: { content: `${siteIdentifier} - SEO Audit Report` },
        },
        {
          type: 'text',
          text: { content: ` - ${new Date(report.auditedAt).toLocaleDateString()}` },
        },
      ],
    },
  });

  // Summary callout

  blocks.push({
    object: 'block',
    type: 'callout',
    callout: {
      icon: { emoji: '📊' },
      rich_text: [
        {
          type: 'text',
          text: {
            content: `Audited ${report.pages.length} pages. Found ${totalIssues} total issues (${highIssues} high, ${mediumIssues} medium, ${lowIssues} low).`,
          },
        },
      ],
      color: highIssues > 0 ? 'red_background' : mediumIssues > 0 ? 'orange_background' : 'yellow_background',
    },
  });

  blocks.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        { type: 'text', text: { content: `Site: ${siteIdentifier} | Base URL: ${report.baseUrl} | Audited: ${new Date(report.auditedAt).toLocaleString()}` } },
      ],
    },
  });

  // Divider
  blocks.push({
    object: 'block',
    type: 'divider',
    divider: {},
  });

  // Per-page results
  blocks.push({
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: 'Page-by-Page Results' } }],
    },
  });

  for (const page of report.pages) {
    // Page heading
    blocks.push({
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [
          { type: 'text', text: { content: page.route === '/' ? 'Home' : page.route } },
        ],
      },
    });

    // Page metadata
    const metaItems = [];
    if (page.meta.title) metaItems.push(`Title: ${page.meta.title}`);
    if (page.meta.description) metaItems.push(`Description: ${page.meta.description.substring(0, 100)}...`);
    if (page.meta.h1Count !== undefined) metaItems.push(`H1s: ${page.meta.h1Count}`);
    if (page.meta.schemaCount !== undefined) metaItems.push(`Schema: ${page.meta.schemaCount}`);

    if (metaItems.length > 0) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: metaItems.join(' | ') } }],
        },
      });
    }

    // Issues
    if (page.issues.length > 0) {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: `Issues (${page.issues.length}):` } }],
        },
      });

      for (const issue of page.issues) {
        blocks.push({
          object: 'block',
          type: 'to_do',
          to_do: {
            rich_text: [
              {
                type: 'text',
                text: { content: `[${issue.severity.toUpperCase()}] ${issue.message}` },
              },
            ],
            checked: false,
          },
        });
      }
    } else {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { type: 'text', text: { content: '✅ No issues found' } },
          ],
        },
      });
    }

    // Divider between pages
    blocks.push({
      object: 'block',
      type: 'divider',
      divider: {},
    });
  }

  // Summary table (if we have issues)
  if (totalIssues > 0) {
    blocks.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: 'Issue Summary by Severity' } }],
      },
    });

    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          { type: 'text', text: { content: `🔴 High: ${highIssues} | 🟠 Medium: ${mediumIssues} | 🟡 Low: ${lowIssues}` } },
        ],
      },
    });
  }

  return blocks;
}

// Calculate issue statistics
function calculateIssueStats() {
  const totalIssues = report.pages.reduce((sum, page) => sum + page.issues.length, 0);
  const highIssues = report.pages.reduce(
    (sum, page) => sum + page.issues.filter((i) => i.severity === 'high').length,
    0,
  );
  const mediumIssues = report.pages.reduce(
    (sum, page) => sum + page.issues.filter((i) => i.severity === 'medium').length,
    0,
  );
  const lowIssues = report.pages.reduce(
    (sum, page) => sum + page.issues.filter((i) => i.severity === 'low').length,
    0,
  );
  
  return { totalIssues, highIssues, mediumIssues, lowIssues };
}

// Build database properties - tries common property names
async function buildDatabaseProperties(databaseId, title, stats) {
  const properties = {
    // Title is always required
    Name: {
      title: [{ text: { content: title } }],
    },
  };

  // Try to get database schema to match property names
  try {
    const database = await notion.databases.retrieve({ database_id: databaseId });
    const propertyMap = {};
    
    // Map property names to their types
    for (const [propName, propData] of Object.entries(database.properties)) {
      propertyMap[propName.toLowerCase()] = { name: propName, type: propData.type };
    }

    // Helper to safely add property
    const addProperty = (possibleNames, value, type) => {
      for (const name of possibleNames) {
        if (propertyMap[name.toLowerCase()]) {
          const propName = propertyMap[name.toLowerCase()].name;
          const propType = propertyMap[name.toLowerCase()].type;
          
          if (propType === type) {
            properties[propName] = value;
            return true;
          }
        }
      }
      return false;
    };

    // Site (select, multi_select, or text)
    const siteValue = siteIdentifier;
    if (!addProperty(['site', 'website', 'domain', 'project'], 
      { select: { name: siteValue } }, 'select')) {
      if (!addProperty(['site', 'website', 'domain', 'project'],
        { rich_text: [{ text: { content: siteValue } }] }, 'rich_text')) {
        // Try multi_select if select didn't work
        addProperty(['site', 'website', 'domain', 'project'],
          { multi_select: [{ name: siteValue }] }, 'multi_select');
      }
    }

    // Date (date property)
    const auditDate = new Date(report.auditedAt);
    addProperty(['date', 'audit date', 'created', 'audited'],
      { date: { start: auditDate.toISOString().split('T')[0] } }, 'date');

    // Total Issues (number)
    addProperty(['issues', 'total issues', 'issues count', 'total'],
      { number: stats.totalIssues }, 'number');

    // High Issues (number)
    addProperty(['high', 'high issues', 'critical', 'high count'],
      { number: stats.highIssues }, 'number');

    // Medium Issues (number)
    addProperty(['medium', 'medium issues', 'medium count'],
      { number: stats.mediumIssues }, 'number');

    // Low Issues (number)
    addProperty(['low', 'low issues', 'low count'],
      { number: stats.lowIssues }, 'number');

    // Status (select) - default to "To Review"
    addProperty(['status', 'state', 'progress'],
      { select: { name: 'To Review' } }, 'select');

    // Base URL (url or text)
    if (!addProperty(['url', 'base url', 'website url', 'link'],
      { url: report.baseUrl }, 'url')) {
      addProperty(['url', 'base url', 'website url', 'link'],
        { rich_text: [{ text: { content: report.baseUrl } }] }, 'rich_text');
    }

    // Pages Audited (number)
    addProperty(['pages', 'pages audited', 'page count'],
      { number: report.pages.length }, 'number');

  } catch (error) {
    console.log(`   ⚠️  Could not retrieve database schema, using minimal properties: ${error.message}`);
    // Fallback: just add Site as text if we can't get schema
    properties.Site = { rich_text: [{ text: { content: siteIdentifier } }] };
  }

  return properties;
}

async function createOrUpdateNotionPage() {
  try {
    const stats = calculateIssueStats();
    const blocks = buildNotionBlocks(stats);
    const title = `${siteIdentifier} - SEO Audit - ${new Date(report.auditedAt).toLocaleDateString()}`;

    let pageId;

    if (NOTION_PAGE_ID) {
      // Append to existing page or create child page
      console.log(`📄 Creating child page under existing page: ${NOTION_PAGE_ID}`);
      
      const response = await notion.pages.create({
        parent: { page_id: NOTION_PAGE_ID },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
        },
      });

      pageId = response.id;
      console.log(`✅ Created child page: ${pageId}`);
    } else if (NOTION_DATABASE_ID && NOTION_PARENT_TYPE === 'database') {
      // Create page in database
      console.log(`📊 Creating page in database: ${NOTION_DATABASE_ID}`);
      console.log(`   Calculating issue statistics and building properties...`);
      
      // Build properties with automatic schema detection
      const properties = await buildDatabaseProperties(NOTION_DATABASE_ID, title, stats);
      
      console.log(`   Properties to set: ${Object.keys(properties).join(', ')}`);
      
      const response = await notion.pages.create({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      });

      pageId = response.id;
      console.log(`✅ Created page in database: ${pageId}`);
    } else {
      console.error('❌ Error: Either NOTION_PAGE_ID or NOTION_DATABASE_ID must be set in .env.local');
      console.error('   Set NOTION_PAGE_ID to create a child page under an existing page');
      console.error('   Set NOTION_DATABASE_ID to create a page in a database');
      process.exit(1);
    }

    // Add blocks to the page (in chunks of 100, Notion API limit)
    console.log(`📝 Adding ${blocks.length} blocks to page...`);
    for (let i = 0; i < blocks.length; i += 100) {
      const chunk = blocks.slice(i, i + 100);
      await notion.blocks.children.append({
        block_id: pageId,
        children: chunk,
      });
      console.log(`   Added blocks ${i + 1}-${Math.min(i + 100, blocks.length)}`);
    }

    console.log(`\n✅ SEO audit report successfully added to Notion!`);
    console.log(`   Page ID: ${pageId}`);
    console.log(`   View it in Notion: https://notion.so/${pageId.replace(/-/g, '')}`);

  } catch (error) {
    console.error('\n❌ Failed to create Notion page:', error.message);
    if (error.code === 'object_not_found') {
      console.error('   Check that your NOTION_PAGE_ID or NOTION_DATABASE_ID is correct');
    } else if (error.code === 'unauthorized') {
      console.error('   Check that your NOTION_API_TOKEN is valid and has access to the page/database');
    }
    process.exit(1);
  }
}

createOrUpdateNotionPage();

