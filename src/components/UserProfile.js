import { useHistory } from 'react-router';
import { OngProfile } from '../pages/OngProfile';

export function UserProfile() {
  const history = useHistory();
  const userType = localStorage.getItem('userType');
  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/entrar');
  }
  return (
    <>{!!userType && userType === 'ONG' && <OngProfile isPublic={false} />}</>
  );
}
