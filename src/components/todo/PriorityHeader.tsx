import { useRef } from 'react'

interface PriorityHeaderProps {
  priority: number
  color: string
  onChangeColor: (priority: number, color: string) => void
}

export const PriorityHeader = ({ priority, color, onChangeColor }: PriorityHeaderProps) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="priority-section__header">
      <p className="priority-section__label">Priority {priority}</p>
      <button
        type="button"
        className="color-preview"
        style={{ backgroundColor: color }}
        onClick={() => colorInputRef.current?.click()}
        aria-label={`Change color for priority ${priority}`}
      >
        <span className="color-preview__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M3 17.25V21h3.75L17.8 9.95l-3.75-3.75L3 17.25zm17.7-10.45c.4-.4.4-1.03 0-1.42L18.17 2.8a1.003 1.003 0 00-1.42 0l-1.98 1.98 3.75 3.75L20.7 6.8z" />
          </svg>
        </span>
      </button>
      <input
        ref={colorInputRef}
        type="color"
        className="sr-only"
        value={color}
        onChange={(event) => onChangeColor(priority, event.target.value)}
        aria-label={`Priority ${priority} color picker`}
      />
    </div>
  )
}
