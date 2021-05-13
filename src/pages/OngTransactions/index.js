import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormSelect } from '../../components/FormSelect';
import { Header } from '../../components/Header';
import { StyledMain } from '../../components/Main';
import {
  getTransactions,
  transactionReducer,
} from '../../store/transactionReducer';

export function OngTransactions() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  const { transactions } = useSelector(({ transactionsReducer }) => ({
    transactions: transactionReducer.transactions,
  }));
  return (
    <>
      <Header />
      <StyledMain>
        <FormSelect
          name="transactionsFilter"
          id="transactionsFilter"
          onChange={(e) =>
            dispatch(getTransactions({ status: e.target.value }))
          }
          required={true}
        >
          <option value="">Selecciona una opción</option>
          <option value="Aceptada">Aceptada</option>
          <option value="Rechazada">Rechazada</option>
        </FormSelect>
      </StyledMain>
    </>
  );
}
