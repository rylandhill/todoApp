import type { PropsWithChildren } from 'react'

interface TooltipProps {
  label: string
  content: string
}

/**
 * Simple inline informational tooltip block.
 */
export const Tooltip = ({ label, content }: PropsWithChildren<TooltipProps>) => {
  return (
    <div className="tooltip">
      <span className="tooltip__label">{label}</span>
      <span className="tooltip__content" role="note">
        {content}
      </span>
    </div>
  )
}
