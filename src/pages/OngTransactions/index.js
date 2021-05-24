import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';
import { getTransactions } from '../../store/transactionReducer';
import {
  FiltersSection,
  LabelStatus,
  StatusSelect,
  StyledTable,
  StyledTitle,
  TableDiv,
  TransactionsMain,
} from './styles';

export function OngTransactions() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  const { transactions, loading, error } = useSelector(
    ({ transactionReducer }) => ({
      transactions: transactionReducer.transactions,
      loading: transactionReducer.loading,
      error: transactionReducer.error,
    })
  );
  return (
    <>
      <Header />
      {!!loading && <LoadingPawPrints show={loading} />}
      <TransactionsMain justify="center" height="auto">
        {!!error && <p>{error}</p>}
        <StyledTitle>Mis transacciones</StyledTitle>
        <FiltersSection>
          <LabelStatus htmlFor="transactionsFilter">
            Filtre según estado de la transacción:{' '}
          </LabelStatus>
          <StatusSelect
            name="transactionsFilter"
            id="transactionsFilter"
            onChange={(e) =>
              dispatch(getTransactions({ status: e.target.value }))
            }
            required={true}
          >
            <option value="">Todas</option>
            <option value="Aceptada">Aceptada</option>
            <option value="Rechazada">Rechazada</option>
          </StatusSelect>
        </FiltersSection>
        <TableDiv>
          <StyledTable responsive hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Referencia de pago</th>
                <th>Fecha</th>
                <th>Correo</th>
                <th>Valor</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {!!transactions &&
                transactions.length > 0 &&
                transactions.map((transaction, i) => {
                  return (
                    <tr key={transaction._id}>
                      <td>{i + 1}</td>
                      <td>{transaction.refPago}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.email}</td>
                      <td>
                        $
                        {new Intl.NumberFormat('co-CO', {
                          style: 'currency',
                          currency: 'COP',
                        }).format(transaction.amount)}
                      </td>
                      <td>{transaction.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </StyledTable>
        </TableDiv>
      </TransactionsMain>
    </>
  );
}
