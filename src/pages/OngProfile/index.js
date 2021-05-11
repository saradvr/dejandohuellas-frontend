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
  Banner,
  Description,
  DescriptionContainer,
  InfoONG,
  LogoContainer,
  Message,
  NombreONG,
  PrincipalSection,
  StyledLogo,
} from './styles';
import bannerImage from './Perfil-fundación.png';
import { ModalMessage } from '../../components/ModalMessage';

export function OngProfile({ isPublic }) {
  const dispatch = useDispatch();
  const { ongId } = useParams();
  const [donationProcess, setDonationProcess] = useState(false);
  const [showModalDonation, setModalDonation] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

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

      response: `${process.env.REACT_APP_BASE_URL}/transaction-result`,

      type_doc_billing: 'CC',

      methodsDisable: ['CASH', 'SP', 'PSE', 'DP'],
    };
    handler.open(data);

    setTimeout(() => {
      setDonationProcess(false);
    }, 4000);
  }

  if (!!error) return <Message>Algo salió mal, intenta nuevamente</Message>;

  return (
    <>
      <Header />
      <StyledMain height={'auto'}>
        {!!loading && <p>Cargando información...</p>}
        <PrincipalSection>
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
                ullamcorper nec lacus quis, pulvinar efficitur augue.
                Pellentesque iaculis dui est, non aliquet nibh condimentum
                consequat. Etiam porttitor venenatis sem consectetur pharetra.
                Suspendisse pretium finibus pulvinar. Aliquam erat volutpat. Ut
                placerat at diam id feugiat. Sed augue velit, iaculis eget
                pulvinar varius, gravida vitae felis. Vivamus venenatis
                malesuada nunc, in eleifend risus semper eget. Pellentesque eu
                nibh id lectus tristique elementum.
              </Description>
              {!!isPublic && (
                <Button type="button" onClick={(e) => setModalDonation(true)}>
                  Hacer donación
                </Button>
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
            <Modal.Body>
              <form>
                <FormLabel htmlFor="donationAmount">
                  ¿Cuánto deseas donar?
                </FormLabel>
                <Input
                  type="number"
                  id="donationAmount"
                  name="donationAmount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(e) => setModalDonation(false)}>Cancelar</Button>
              <Button onClick={donation} disabled={donationProcess}>
                Pagar
              </Button>
            </Modal.Footer>
          </ModalMessage>
          <section>
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
          </section>
          {!isPublic && (
            <section>
              <Button
                type="button"
                onClick={(e) => dispatch({ type: SHOW_MODAL })}
              >
                Agregar peludo
              </Button>
            </section>
          )}
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
        </PrincipalSection>
      </StyledMain>
    </>
  );
}
