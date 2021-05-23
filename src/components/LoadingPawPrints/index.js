import { LoadingModal } from './styles';
import loadingGif from '../Images/loading.gif';

export function LoadingPawPrints({ show }) {
  return (
    <LoadingModal show={show} backdrop="static" keyboard={false} centered>
      <img src={loadingGif} alt="Cargando" />
    </LoadingModal>
  );
}
