import Table from 'react-bootstrap/Table';
import styled from 'styled-components';
import { FormLabel } from '../../components/FormLabel';
import { FormSelect } from '../../components/FormSelect';
import { StyledMain } from '../../components/Main';

export const TableDiv = styled.div`
  width: 90%;
  margin: 20px auto;
  height: 500px;
  display: flex;
  border-radius: 10px;
`;

export const StyledTable = styled(Table)`
  font-family: 'Lato';
  width: 100%;
  margin: 0;
  text-align: center;
  background-color: transparent;
  thead tr th {
    background-color: #227f83;
    color: #f6f4eb;
    vertical-align: middle;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  td {
    background-color: rgba(246, 244, 235, 0.5);
  }
  th:first-child {
    border-radius: 10px 0 0 0;
  }
  th:last-child {
    border-radius: 0 10px 0 0;
  }
  tr:last-child {
    td:first-child {
      border-radius: 0 0 0 10px;
    }
    td:last-child {
      border-radius: 0 0 10px 0;
    }
  }
`;

export const StatusSelect = styled(FormSelect)`
  text-align: center;
  display: inline;
  width: auto;
`;

export const FiltersSection = styled.section`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const LabelStatus = styled(FormLabel)`
  display: inline;
  margin: 0 20px 0 0;
`;

export const StyledTitle = styled.h1`
  text-align: center;
  margin: 30px auto;
  font-family: 'Snowy Night';
  color: black;

  @media screen and (min-width: 1024px) {
    font-size: 3.5rem;
    margin: 20px auto 60px auto;
  }
`;

export const TransactionsMain = styled(StyledMain)`
  justify-content: flex-start;

  @media screen and (min-width: 768px) {
    justify-content: center;
  }

  @media screen and (min-height: 800px) {
    height: 100%;
  }
`;
