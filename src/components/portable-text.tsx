'use client'

import { PortableText as PortableTextComponent } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mb-2">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
  },
                listItem: ({ children, index }) => <li key={index} className="ml-4">{children}</li>,
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
  },
}

interface PortableTextProps {
  value: any
  className?: string
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null

  return (
    <div className={className}>
      <PortableTextComponent value={value} components={components} />
    </div>
  )
}
