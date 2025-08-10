import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // Site Pages
            S.listItem()
              .title('📄 Site Pages')
              .child(
                S.list()
                  .title('Site Pages')
                  .items([
                    S.listItem()
                      .title('🏠 Home Page')
                      .child(S.document().schemaType('homePage').documentId('homePage')),
                    S.listItem()
                      .title('👤 About Page')
                      .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                    S.listItem()
                      .title('💼 Services Page')
                      .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
                    S.listItem()
                      .title('💸 Pricing Page')
                      .child(S.document().schemaType('pricingPage').documentId('pricingPage')),
                    S.listItem()
                      .title('📊 Case Studies Page')
                      .child(S.document().schemaType('caseStudiesPage').documentId('caseStudiesPage')),
                    S.listItem()
                      .title('📞 Contact Page')
                      .child(S.document().schemaType('contactPage').documentId('contactPage')),
                  ])
              ),
            
            S.divider(),
            
            // Blog Content
            S.listItem()
              .title('📚 Blog')
              .child(
                S.list()
                  .title('Blog Content')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .child(
                        S.documentTypeList('post')
                          .title('Blog Posts')
                          .filter('_type == "post"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Categories')
                      .child(S.documentTypeList('category').title('Categories')),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                  ])
              ),
            
            S.divider(),
            
            // Shared Content
            S.listItem()
              .title('🧩 Shared Content')
              .child(
                S.list()
                  .title('Shared Content')
                  .items([
                    S.listItem()
                      .title('Testimonials')
                      .child(S.documentTypeList('testimonial').title('Testimonials')),
                    S.listItem()
                      .title('Legal Pages')
                      .child(S.documentTypeList('legalPage').title('Legal Pages')),
                  ])
              ),
            
            S.divider(),
            
            // Site Settings
            S.listItem()
              .title('⚙️ Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
