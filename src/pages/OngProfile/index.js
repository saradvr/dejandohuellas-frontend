import { useEffect } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { AnimalForm } from '../../components/AnimalForm';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_MODAL, HIDE_MODAL } from '../../store/animalReducer';
import { getOng } from '../../store/ongReducer';
import { AnimalCard } from '../../components/AnimalCard';

export function OngProfile({ isPublic }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOng());
  }, [dispatch]);

  const { showModal, ong } = useSelector(({ animalReducer, ongReducer }) => ({
    showModal: animalReducer.showModal,
    ong: ongReducer.ong,
  }));

  return (
    <>
      <Header />
      <h1>FUNDACIÓN DEJANDO HUELLAS</h1>
      <section>
        <img
          src="https://image.shutterstock.com/image-vector/flat-design-paw-print-icon-260nw-461822491.jpg"
          alt="logo huellas"
          width="20%"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel
          lectus ac risus egestas faucibus. Nulla pharetra efficitur dui,
          lacinia ultrices felis iaculis vel. Aliquam ligula nisl, ullamcorper
          nec lacus quis, pulvinar efficitur augue. Pellentesque iaculis dui
          est, non aliquet nibh condimentum consequat. Etiam porttitor venenatis
          sem consectetur pharetra. Suspendisse pretium finibus pulvinar.
          Aliquam erat volutpat. Ut placerat at diam id feugiat. Sed augue
          velit, iaculis eget pulvinar varius, gravida vitae felis. Vivamus
          venenatis malesuada nunc, in eleifend risus semper eget. Pellentesque
          eu nibh id lectus tristique elementum.
        </p>
      </section>
      <section>
        {!!ong && !!ong.animals && ong.animals.length > 0 ? (
          ong.animals.map((e) => {
            return <AnimalCard key={e._id} animal={e} />;
          })
        ) : (
          <p>Aún no se ha agregado ningún peludo</p>
        )}
      </section>
      {!isPublic && (
        <section>
          <Button type="button" onClick={(e) => dispatch({ type: SHOW_MODAL })}>
            Agregar peludo
          </Button>
        </section>
      )}
      <Modal
        show={showModal}
        onHide={(e) => dispatch({ type: HIDE_MODAL })}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Agregar un nuevo peludo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnimalForm update={false} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => dispatch({ type: HIDE_MODAL })} type="button">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
