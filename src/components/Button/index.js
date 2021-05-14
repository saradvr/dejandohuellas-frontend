import { StyledButton } from './styles';

export function Button({ type, children, onClick, disabled }) {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
