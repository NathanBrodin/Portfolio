import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from 'html-react-parser'

import { Link } from '@tanstack/react-router'

type MarkdownProps = {
  content: string
  className?: string
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === 'a') {
        const href = domNode.attribs.href
        if (href.startsWith('/')) {
          return (
            <Link to={href}>
              {domToReact(domNode.children as DOMNode[], options)}
            </Link>
          )
        }
      }

      if (domNode.name === 'img') {
        return (
          <img
            {...domNode.attribs}
            loading="lazy"
            className="rounded-lg shadow-md"
          />
        )
      }
    }
  },
}

export function Markdown({ content, className }: MarkdownProps) {
  return <div className={className}>{parse(content, options)}</div>
}
