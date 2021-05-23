import styled from 'styled-components';

export const StyledInput = styled.input`
  font-family: 'Lato';
  font-weight: 300;
  font-style: italic;
  border-radius: 10px;
  border: 1px solid #227f83;
  padding: 5px 10px;
  background-color: #f6f4eb;
  width: 90%;

  &:focus {
    outline: none;
    border: 3px solid #227f83;
  }

  @media screen and (min-width: 768px) {
    width: 60%;
  }
`;
