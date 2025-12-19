## SEO Agent for On-Site Audit - 2025-12-18 15:53

- **Create SEO audit agent** - Build an automated SEO agent to review internal/on-site SEO including content quality, meta tags, heading structure, and proper use of schema.org/structured data. **Problem:** Current site lacks a dedicated tool to systematically surface on-site SEO issues, especially around content optimization and structured data usage. **Files:** `src/app/layout.tsx:1-40`, `src/app/page.tsx:41-289`, `sanity/schemaTypes/pages/homePage.ts:1-200` (plus related page/schema files). **Solution:** Implement a script or agent workflow (e.g., Node script + Claude) that crawls key routes, inspects rendered HTML and schema, and outputs a prioritized issues report with recommended fixes.


## Content Strategist with SEO Agent - 2025-12-18 15:54

- **Create content strategist agent** - Build a creative content strategist agent that collaborates with the SEO agent to propose article ideas and content outlines for the site. **Problem:** There is no systematized way to turn SEO insights into a prioritized editorial calendar and article list for the website. **Files:** `TO-DOS.md:1-10`, `CONTENT_MIGRATION_GUIDE.md:11-532`, `sanity/schemaTypes/post.ts:1-220`, `sanity/schemaTypes/pages/blogPage.ts:1-200`. **Solution:** Use the SEO agent's findings (keywords, gaps, opportunities) as input to a secondary agent that generates and ranks article ideas, mapping each to target keywords, intent, and relevant site sections.


## SEO Audit Notion Integration - 2025-12-18 16:29

- **Add Notion integration for SEO audit reports** - Create a script that automatically sends SEO audit results to Notion as a formatted page with issues, metadata, and actionable checklists. **Problem:** SEO audit results are only available as JSON files, making it hard to track, share, and collaborate on fixes in a centralized workspace like Notion. **Files:** `scripts/seo-audit-to-notion.js:1-350` (new), `package.json:33`, `scripts/seo-audit.js:382-383`. **Solution:** Use @notionhq/client to create formatted Notion pages with structured blocks (headings, callouts, to-do items) from seo-report.json, supporting both database pages and child pages under existing pages.


## Update Next.js for Security Vulnerability - 2025-12-18 23:35

- **Update Next.js to fix critical security vulnerability** - Upgrade Next.js from 15.4.6 to latest version to address CVE-2025-66478 which could allow attackers to execute arbitrary code on server. **Problem:** Next.js 15.4.6 has a critical vulnerability that poses security risk to the application. **Files:** `package.json:52`, `package-lock.json`. **Solution:** Run `npm update next` to update to latest patched version, test application after update, verify no breaking changes.

