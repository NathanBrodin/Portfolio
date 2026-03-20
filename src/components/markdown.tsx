import { Link } from '@tanstack/react-router'
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from 'html-react-parser'

type MarkdownProps = {
  content: string
  className?: string
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === 'a') {
        const href = domNode.attribs.href
        if (href.startsWith('/') || href.startsWith('#')) {
          return <Link to={href}>{domToReact(domNode.children as DOMNode[], options)}</Link>
        }

        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {domToReact(domNode.children as DOMNode[], options)}
          </a>
        )
      }

      if (domNode.name === 'img') {
        return <img {...domNode.attribs} loading="lazy" className="rounded-lg shadow-md" />
      }
    }
  },
}

export function Markdown({ content, className }: MarkdownProps) {
  return <div className={className}>{parse(content, options)}</div>
}
