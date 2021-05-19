import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { StyledMain } from '../../components/Main';
import { PersonRequest } from '../../components/PersonRequest';
import { getPerson } from '../../store/personReducer';
import { RequestsSection } from './styles';

export function PersonRequests() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPerson());
  }, [dispatch]);

  const { person } = useSelector(({ personReducer }) => ({
    person: personReducer.person,
  }));

  return (
    <>
      <Header />
      <StyledMain>
        <RequestsSection>
          {!!person &&
            !!person.requests &&
            person.requests.length > 0 &&
            person.requests.map((request) => {
              return <PersonRequest key={request._id} request={request} />;
            })}
        </RequestsSection>
      </StyledMain>
    </>
  );
}
