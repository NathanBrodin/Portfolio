import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { cn } from '@/lib/utils'

function Prose({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  const defaultProps = {
    className: cn(
      'prose prose-zinc dark:prose-invert max-w-none',
      'prose-headings:text-balance prose-headings:font-display prose-headings:text-primary prose-headings:font-normal',
      'prose-headings:[&_a]:text-inherit prose-headings:[&_a]:no-underline prose-headings:[&_a:hover]:underline prose-headings:[&_a:hover]:underline-offset-4 prose-headings:[&_a:hover]:decoration-muted-foreground/50',
      'prose-a:wrap-break-word prose-a:text-primary  prose-a:underline prose-a:underline-offset-4 prose-a:decoration-muted-foreground/50 prose-a:transition-colors [&_a:hover]:decoration-foreground',
      'prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
      'prose-strong:font-medium',
      'prose-hr:border-edge',
      'prose-blockquote:border-s-border prose-blockquote:[&_p:first-of-type]:before:content-none prose-blockquote:[&_p:last-of-type]:after:content-none',
      className,
    ),
    'data-slot': 'prose',
  }

  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(defaultProps, props),
    render,
  })
}

function ProseMono({
  className,
  ...props
}: React.ComponentProps<typeof Prose>) {
  return (
    <Prose
      className={cn('prose-xs text-foreground font-mono text-sm', className)}
      {...props}
    />
  )
}

export { Prose, ProseMono }
