import { StyledInput } from './styles';

export function Input({ type, name, id, value, onChange, required, disabled }) {
  return (
    <StyledInput
      type={type}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
  );
}
