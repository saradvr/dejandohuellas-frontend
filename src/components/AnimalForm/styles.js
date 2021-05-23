import styled from 'styled-components';

export const TwoSectionForm = styled.section`
  margin: 20px 0 30px 0;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    grid-column: 1;
  }
`;

export const RightSection = styled.section`
  @media screen and (min-width: 768px) {
    grid-column: 2;
    padding-right: 40px;
  }
`;

export const ImgPreviewSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    & input {
      align-self: center;
      width: auto;
      text-align: center;
    }
  }
`;

export const ImgPreview = styled.img`
  justify-self: center;
  height: 190px;
  border: 1px solid #227f83;
  border-radius: 10px;
  margin-top: 20px;
`;
