import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = ({ label, id, className = '', ...props }: InputProps) => {
  return (
    <label htmlFor={id} className="field">
      <span className="field__label">{label}</span>
      <input id={id} className={`field__control ${className}`.trim()} {...props} />
    </label>
  )
}
