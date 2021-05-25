import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { PersonRequest } from '../../components/PersonRequest';
import { getPerson } from '../../store/personReducer';
import { Banner, MainPersonRequests, RequestsSection } from './styles';
import bannerImg from './SOLICITUD.png';

export function PersonRequests() {
  const [numberRequests, setNumberRequests] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPerson());
  }, [dispatch]);

  const { person } = useSelector(({ personReducer }) => ({
    person: personReducer.person,
  }));

  useEffect(() => {
    if (!!person && !!person.requests) {
      setNumberRequests(person.requests.length);
    }
  }, [person]);

  return (
    <>
      <Header />
      <MainPersonRequests numberRequests={numberRequests}>
        <Banner src={bannerImg} alt="Banner solicitudes adopción" />
        <RequestsSection>
          {!!person &&
            !!person.requests &&
            (person.requests.length > 0 ? (
              person.requests.map((request) => {
                return <PersonRequest key={request._id} request={request} />;
              })
            ) : (
              <p>Aún no tienes solicitudes de adopción.</p>
            ))}
        </RequestsSection>
      </MainPersonRequests>
    </>
  );
}
