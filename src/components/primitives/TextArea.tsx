import type { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

/**
 * Labeled textarea primitive for multiline input.
 */
export const TextArea = ({ label, id, className = '', ...props }: TextAreaProps) => {
  return (
    <label htmlFor={id} className="field">
      <span className="field__label">{label}</span>
      <textarea id={id} className={`field__control field__control--textarea ${className}`.trim()} {...props} />
    </label>
  )
}
