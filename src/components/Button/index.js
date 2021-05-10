import { StyledButton } from './styles';

export function Button({ type, children, onClick }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
