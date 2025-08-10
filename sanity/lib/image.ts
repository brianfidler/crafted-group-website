import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForImageWithSize = (source: Image, width: number, height: number) => {
  return imageBuilder?.image(source).auto('format').fit('max').width(width).height(height)
}
