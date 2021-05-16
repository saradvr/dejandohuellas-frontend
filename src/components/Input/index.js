import { StyledInput } from './styles';

export function Input({ type, name, id, value, onChange, required, pattern }) {
  return (
    <StyledInput
      type={type}
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={onChange}
      pattern={pattern}
    />
  );
}
