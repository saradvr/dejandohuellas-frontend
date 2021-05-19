import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';
import { StyledMain } from '../../components/Main';
import { OngRequest } from '../../components/OngRequest';
import { getRequests } from '../../store/adoptionReducer';

export function OngRequests() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  const { requests, error, loading } = useSelector(({ adoptionReducer }) => ({
    requests: adoptionReducer.requests,
    error: adoptionReducer.error,
    loading: adoptionReducer.loading,
  }));

  return (
    <>
      <Header />
      <StyledMain>
        {!!loading && <LoadingPawPrints show={loading} />}
        <section>
          {!!error && <p>Error al cargar las solicitudes.</p>}
          {!!requests &&
            requests.length > 0 &&
            requests.map((request) => {
              return <OngRequest key={request._id} request={request} />;
            })}
        </section>
      </StyledMain>
    </>
  );
}
