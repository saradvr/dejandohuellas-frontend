import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormLabel } from '../../components/FormLabel';
import { FormSelect } from '../../components/FormSelect';
import { Header } from '../../components/Header';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';
import { OngRequest } from '../../components/OngRequest';
import { getRequests } from '../../store/adoptionReducer';
import { getOng } from '../../store/ongReducer';
import {
  FilterGroup,
  FiltersSection,
  OngRequestsMain,
  RequestsSection,
} from './styles';
import banner from './bannerRequests.png';

export function OngRequests() {
  const [numberRequests, setNumberRequests] = useState(0);
  const [filterAnimalId, setFilterAnimalId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAnimalType, setFilterAnimalType] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
    dispatch(getOng());
  }, [dispatch]);

  const { requests, error, loading, ong } = useSelector(
    ({ adoptionReducer, ongReducer }) => ({
      requests: adoptionReducer.requests,
      error: adoptionReducer.error,
      loading: adoptionReducer.loading,
      ong: ongReducer.ong,
    })
  );

  const filtros = {
    animalId: setFilterAnimalId,
    animalType: setFilterAnimalType,
    status: setFilterStatus,
  };

  useEffect(() => {
    dispatch(getRequests({ filterStatus, filterAnimalId, filterAnimalType }));
  }, [dispatch, filterStatus, filterAnimalId, filterAnimalType]);

  useEffect(() => {
    if (!!requests) {
      setNumberRequests(requests.length);
    }
  }, [requests.length, requests]);

  function handleFilter(e, filter) {
    filtros[filter](e.target.value);
  }

  return (
    <>
      <Header />
      <OngRequestsMain numberRequests={numberRequests}>
        <img src={banner} alt="Banner" width="100%" />
        {!!loading && <LoadingPawPrints show={loading} />}
        <FiltersSection>
          <FilterGroup>
            <FormLabel htmlFor="peludos">Peludo:</FormLabel>
            <FormSelect
              name="peludos"
              id="peludos"
              value={filterAnimalId}
              onChange={(e) => handleFilter(e, 'animalId')}
            >
              <option value="">Todos</option>
              {!!ong &&
                !!ong.animals &&
                ong.animals.length > 0 &&
                ong.animals.map((animal) => {
                  return (
                    <option key={animal._id} value={animal._id}>
                      {animal.name}
                    </option>
                  );
                })}
            </FormSelect>
          </FilterGroup>
          <FilterGroup>
            <FormLabel htmlFor="animalType">Tipo de peludo:</FormLabel>
            <FormSelect
              name="animalType"
              id="animalType"
              value={filterAnimalType}
              onChange={(e) => handleFilter(e, 'animalType')}
            >
              <option value="">Todos</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </FormSelect>
          </FilterGroup>
          <FilterGroup>
            <FormLabel htmlFor="status">Estado:</FormLabel>
            <FormSelect
              name="status"
              id="status"
              value={filterStatus}
              onChange={(e) => handleFilter(e, 'status')}
            >
              <option value="">Todos</option>
              <option value="Nueva">Nueva</option>
              <option value="En revisi??n">En revisi??n</option>
              <option value="Entrevista agendada">Entrevista agendada</option>
              <option value="Evaluaci??n final">Evaluaci??n final</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
              <option value="Retirada">Retirada</option>
            </FormSelect>
          </FilterGroup>
        </FiltersSection>
        <RequestsSection>
          {!!error && <p>Error al cargar las solicitudes.</p>}
          {!!requests && requests.length > 0 ? (
            requests.map((request) => {
              return <OngRequest key={request._id} request={request} />;
            })
          ) : (
            <p>A??n no hay solicitudes con estas caracter??sticas.</p>
          )}
        </RequestsSection>
      </OngRequestsMain>
    </>
  );
}
