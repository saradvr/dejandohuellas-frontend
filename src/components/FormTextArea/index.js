import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
  border-radius: 10px;
  background-color: #f6f4eb;
  font-family: 'Lato';
  font-style: italic;
  font-weight: 300;
  border: 1px solid #227f83;
  padding: 7px 10px;
  width: 90%;
  height: 100px;
  resize: none;

  &:focus {
    outline: none;
    border: 3px solid #227f83;
  }

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;
