import styled from 'styled-components';

export const StyledArticle = styled.article`
  border: 2px solid #f6f4eb;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 90%;
  margin: 10px;
  background-color: rgba(246, 244, 235, 0.5);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  &:hover {
    background-color: rgba(246, 244, 235, 1);
    transform: scale(1.1);
    transition: 0.8s;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const PetImage = styled.img`
  width: 100px;
  border-radius: 10px;
`;

export const AnimalNameH2 = styled.h2`
  font-family: 'Snowy Night';
  color: #227f83;
  margin-top: 10px;
  text-shadow: -2px 2px white;
`;
