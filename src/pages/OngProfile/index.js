import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { AnimalForm } from '../../components/AnimalForm';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_MODAL, HIDE_MODAL } from '../../store/animalReducer';
import { getOng, getPublicOng } from '../../store/ongReducer';
import { AnimalCard } from '../../components/AnimalCard';
import { StyledMain } from '../../components/Main';
import { StyledModal } from '../../components/ModalAnimalInfo';
import { useParams } from 'react-router';
import { Input } from '../../components/Input';
import { FormLabel } from '../../components/FormLabel';
import {
  AnimalsSection,
  Banner,
  Description,
  DescriptionContainer,
  InfoONG,
  LogoContainer,
  Message,
  NombreONG,
  StyledLogo,
  ButtonsDiv,
} from './styles';
import bannerImage from './Perfil-fundación.png';
import { ModalMessage } from '../../components/ModalMessage';
import { LinkButton } from '../../components/LinkButton';
import { LoadingPawPrints } from '../../components/LoadingPawPrints';

export function OngProfile({ isPublic }) {
  const dispatch = useDispatch();
  const { ongId } = useParams();
  const [donationProcess, setDonationProcess] = useState(false);
  const [showModalDonation, setModalDonation] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationEmail, setDonationEmail] = useState('');
  const [errorValidation, setErrorValidation] = useState('');

  useEffect(() => {
    !!isPublic ? dispatch(getPublicOng(ongId)) : dispatch(getOng());
  }, [dispatch, isPublic, ongId]);

  const { showModal, ong, loading, error } = useSelector(
    ({ animalReducer, ongReducer }) => ({
      showModal: animalReducer.showModal,
      ong: ongReducer.ong,
      loading: ongReducer.loading,
      error: ongReducer.error,
    })
  );

  function donation(e) {
    e.preventDefault();
    setErrorValidation('');
    if (donationAmount < 5000) {
      setErrorValidation('La cantidad debe ser mayor a 5000 COP');
      return;
    }

    setDonationProcess(true);

    const handler = window.ePayco.checkout.configure({
      key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
      test: true,
    });

    const data = {
      external: 'false',
      autoclick: 'false',

      amount: donationAmount,
      name: `Donación ${ong.user.name}`,
      description: `Donación ${ong.user.name}`,
      currency: 'cop',

      country: 'CO',
      lang: 'es',
      tax: '0',
      tax_base: '0',

      invoice: '1234123',
      extra1: ong._id,
      extra2: donationEmail,

      response: `${process.env.REACT_APP_BASE_URL}/transaction-result`,

      email_billing: donationEmail,
      type_doc_billing: 'CC',

      methodsDisable: ['CASH', 'SP', 'PSE', 'DP'],
    };
    handler.open(data);

    setTimeout(() => {
      setDonationProcess(false);
    }, 5000);
  }

  return (
    <>
      <Header />
      <StyledMain height={'auto'}>
        {!!loading && <LoadingPawPrints show={loading} />}
        {!!error && <Message>Error al cargar, intenta nuevamente.</Message>}
        <Banner src={bannerImage} alt="Banner adopta huellas" />
        <InfoONG>
          <LogoContainer>
            <StyledLogo
              src="https://image.shutterstock.com/image-vector/flat-design-paw-print-icon-260nw-461822491.jpg"
              alt="logo huellas"
            />
          </LogoContainer>
          <DescriptionContainer>
            <NombreONG>FUNDACIÓN DEJANDO HUELLAS</NombreONG>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              vel lectus ac risus egestas faucibus. Nulla pharetra efficitur
              dui, lacinia ultrices felis iaculis vel. Aliquam ligula nisl,
              ullamcorper nec lacus quis, pulvinar efficitur augue. Pellentesque
              iaculis dui est, non aliquet nibh condimentum consequat. Etiam
              porttitor venenatis sem consectetur pharetra. Suspendisse pretium
              finibus pulvinar. Aliquam erat volutpat. Ut placerat at diam id
              feugiat. Sed augue velit, iaculis eget pulvinar varius, gravida
              vitae felis. Vivamus venenatis malesuada nunc, in eleifend risus
              semper eget. Pellentesque eu nibh id lectus tristique elementum.
            </Description>
            {!!isPublic ? (
              <Button type="button" onClick={(e) => setModalDonation(true)}>
                Hacer donación
              </Button>
            ) : (
              <ButtonsDiv>
                <Button
                  type="button"
                  onClick={(e) => dispatch({ type: SHOW_MODAL })}
                >
                  Agregar peludo
                </Button>
                <LinkButton to={'/transactions'}>Ver transacciones</LinkButton>
                <LinkButton to={'/requests'}>Revisar Solicitudes</LinkButton>
              </ButtonsDiv>
            )}
          </DescriptionContainer>
        </InfoONG>
        <ModalMessage
          show={showModalDonation}
          onHide={(e) => setModalDonation(false)}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>¡Gracias por tu ayuda!</Modal.Title>
          </Modal.Header>
          <form onSubmit={donation}>
            <Modal.Body>
              <FormLabel htmlFor="donationEmail">Escribe tu correo</FormLabel>
              <Input
                type="text"
                id="donationEmail"
                name="donationEmail"
                value={donationEmail}
                required
                onChange={(e) => setDonationEmail(e.target.value)}
              />
              <FormLabel htmlFor="donationAmount">
                ¿Cuánto deseas donar?
              </FormLabel>
              <Input
                type="number"
                id="donationAmount"
                name="donationAmount"
                value={donationAmount}
                min="1"
                required
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              {!!errorValidation && <p>{errorValidation}</p>}
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                onClick={(e) => setModalDonation(false)}
                disabled={donationProcess}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={donationProcess}>
                Donar
              </Button>
            </Modal.Footer>
          </form>
        </ModalMessage>
        <AnimalsSection>
          {!!ong &&
          !!ong.animals &&
          ong.animals.length > 0 &&
          !!ong.animals[0] ? (
              ong.animals.map((e) => {
                return (
                  <AnimalCard
                    key={e._id}
                    animal={e}
                    edit={!!isPublic ? false : true}
                  />
                );
              })
            ) : (
              <Message>Aún no se ha agregado ningún peludo</Message>
            )}
        </AnimalsSection>
        <StyledModal
          show={showModal}
          onHide={(e) => dispatch({ type: HIDE_MODAL })}
          backdrop="static"
          keyboard={true}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar un nuevo peludo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AnimalForm update={false} />
          </Modal.Body>
        </StyledModal>
      </StyledMain>
    </>
  );
}
