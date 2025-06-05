import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/css/pages/home.module.css';

import Leftbar from '../features/LeftBar/LeftBar';
import MakeRoutePopup from '../features/LeftBar/MakeRoute/MakeRoutePopup';
import SearchingRoutePopup from '../features/LeftBar/SearchingRoute/SearchingRoutePopup';
import Map from '../features/Map';
import MapButton from '../components/MapButton/MapButton';

const Home = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); 

  // 주소와 leftBar 매핑
  const viewMap = {
    '/makeRoute': 'makeRoute',
    '/searchingRoute': 'searchingRoute',
    '/searchingPlace': 'searchingPlace',
    '/': 'home'
  };

  const getLeftbarView = viewMap[pathname] || 'home';

  const handleLeftbarAction = (action) => {
    const actionMap = {
      NEW_ROUTE: '/makeRoute',
      SEARCHING_ROUTES: '/searchingRoute',
      SEARCHING_PLACE: '/searchingPlace',
      MORE_ROUTES: '/searchingRoute',
      BACK: '/',
    };
    navigate(actionMap[action] || '/');
  };

  return (
    <div className={styles.home}>
      <Map />
      {/* 가로등 */}
      {/* 경사도 */}

      <Leftbar view={getLeftbarView} onAction={handleLeftbarAction} />

      {getLeftbarView  === 'makeRoute' && (
        <MakeRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      {getLeftbarView  === 'searchingRoute' && (
        <SearchingRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      {getLeftbarView  === 'searchingPlace' && (
        <MakeRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      <MapButton />
    </div>
  );
};

export default Home;
