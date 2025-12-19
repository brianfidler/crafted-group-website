import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for server-side rendering
})

// Utility function to fetch data from Sanity
export async function fetchData<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const data = await client.fetch<T>(query, params ?? {})
    return data
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
    return null
  }
}
