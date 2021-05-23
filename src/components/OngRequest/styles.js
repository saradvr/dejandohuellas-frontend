import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledArticle = styled.article`
  border: 2px solid #f6f4eb;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 90%;
  margin: 10px auto;
  background-color: rgba(246, 244, 235, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    background-color: rgba(246, 244, 235, 1);
    transform: scale(1.1);
    transition: 0.8s;
  }

  @media screen and (min-width: 768px) {
    max-width: 300px;
    & button {
      width: 80%;
    }
  }

  @media screen and (min-width: 1024px) {
    max-width: 250px;
  }
`;

export const ArticleLink = styled(Link)`
  color: black;
  margin: 0;
  padding: 0;
  &:hover {
    text-decoration: none;
    color: black;
  }
`;

export const PetImage = styled.img`
  width: 80%;
  border-radius: 10px;
`;

export const AnimalNameH2 = styled.h2`
  font-family: 'Snowy Night';
  color: #227f83;
  margin-bottom: 20px;
  text-shadow: -2px 2px white;
`;

export const StatusP = styled.p`
  font-family: 'Snowy Night';
  font-style: normal;
  color: black;
  font-size: 20px;
  margin-bottom: 0px;
`;
