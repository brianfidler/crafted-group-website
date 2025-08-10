import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/image'

interface PortableTextProps {
  content: PortableTextBlock[]
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <div className="my-8">
          <Image
            src={urlForImage(value)?.url() || ''}
            alt={value.alt || ''}
            width={800}
            height={400}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    callout: ({ value }) => {
      const { type, content } = value
      const colorMap = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
      }

      return (
        <div className={`p-4 border-l-4 rounded-r-lg my-6 ${colorMap[type as keyof typeof colorMap] || colorMap.info}`}>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      )
    },
    codeBlock: ({ value }) => {
      const { language, code, filename } = value

      return (
        <div className="my-6">
          {filename && (
            <div className="bg-muted px-4 py-2 text-sm font-mono border-b">
              {filename}
            </div>
          )}
          <pre className="bg-muted p-4 rounded-b-lg overflow-x-auto">
            <code className={`language-${language || 'text'} text-sm`}>
              {code}
            </code>
          </pre>
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: ({ children, index }) => (
    <li key={index} className="ml-4">{children}</li>
  ),
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
  },
}

export function CustomPortableText({ content }: PortableTextProps) {
  return <PortableText value={content} components={components} />
}
