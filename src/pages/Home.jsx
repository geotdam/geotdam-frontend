import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/css/pages/home.module.css';

import Leftbar from '../features/LeftBar/LeftBar';
import MakeRoutePopup from '../features/LeftBar/MakeRoute/MakeRoutePopup';
import SearchingRoutePopup from '../features/LeftBar/SearchingRoute/SearchingRoutePopup';
import Map from '../features/Map';
import MapButton from '../components/MapButton/MapButton';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로
  const path = location.pathname;

  // 주소 기반으로 Leftbar 매칭
  const getLeftbarView = () => {
    if (path === '/makeRoute') return 'makeRoute';
    if (path === '/searchingRoute') return 'searchingRoute';
    return 'home';
  };

  const handleLeftbarAction = (action) => {
    switch (action) {
      case 'NEW_ROUTE':
        navigate('/makeRoute');
        break;
      case 'SEARCHING_ROUTES':
        navigate('/searchingRoute');
        break;
      case 'BACK':
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className={styles.home}>
      <Map />
      {/* 가로등 */}
      {/* 경사도 */}

      <Leftbar
        view={getLeftbarView()}
        onAction={handleLeftbarAction}
      />

      {path  === '/makeRoute' && (
        <MakeRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      {path  === '/searchingRoute' && (
        <SearchingRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      <MapButton />
    </div>
  );
};

export default Home;
