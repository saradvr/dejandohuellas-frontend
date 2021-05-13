import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Header } from '../../components/Header';
import queryString from 'query-string';
import { saveTransaction } from '../../store/transactionReducer';
import { StyledMain } from '../../components/Main';
import { ResultContainer, StyledP, StyledPResult } from './styles';

export function TransactionResult() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { ref_payco } = queryString.parse(location.search);
    axios({
      method: 'GET',
      baseURL: 'https://secure.epayco.co',
      url: `/validation/v1/reference/${ref_payco}`,
    }).then(({ data }) => {
      dispatch(saveTransaction(data.data));
    });
  }, [location, dispatch]);

  const { transaction, error, saving } = useSelector(
    ({ transactionReducer }) => ({
      transaction: transactionReducer.transaction,
      error: transactionReducer.error,
      saving: transactionReducer.saving,
    })
  );
  return (
    <>
      <Header />
      <StyledMain>
        <ResultContainer>
          <StyledP>Su transacción fue:</StyledP>
          {!!error && <p>{error}</p>}
          {!!saving && <p>Guardando su donación...</p>}
          {!!transaction && <StyledPResult>{transaction.status}</StyledPResult>}
        </ResultContainer>
      </StyledMain>
    </>
  );
}
