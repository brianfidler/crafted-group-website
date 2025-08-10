// Blog schemas
import { authorType } from './author'
import { blockContentType } from './blockContent'
import { categoryType } from './category'
import { postType } from './post'

// Shared content schemas
import testimonial from './shared/testimonial'
import callToAction from './shared/callToAction'
import statistic from './shared/statistic'

// Page schemas
import homePage from './pages/homePage'
import aboutPage from './pages/aboutPage'
import servicesPage from './pages/servicesPage'
import pricingPage from './pages/pricingPage'
import caseStudiesPage from './pages/caseStudiesPage'
import contactPage from './pages/contactPage'
import legalPage from './pages/legalPage'

// Site configuration
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Blog content
  postType,
  authorType,
  categoryType,
  blockContentType,
  
  // Shared content blocks
  testimonial,
  callToAction,
  statistic,
  
  // Page content (ALL your website pages)
  homePage,
  aboutPage,
  servicesPage,
  pricingPage,
  caseStudiesPage,
  contactPage,
  legalPage,
  
  // Site configuration
  siteSettings,
]
