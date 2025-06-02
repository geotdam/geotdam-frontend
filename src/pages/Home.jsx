import { useState } from 'react';
import styles from '../assets/css/pages/home.module.css';

import Leftbar from '../features/LeftBar/LeftBar';
import MakeRoutePopup from '../features/LeftBar/MakeRoute/MakeRoutePopup';
import SearchingRoutePopup from '../features/LeftBar/SearchingRoute/SearchingRoutePopup';
import Map from '../features/Map';
import MapButton from '../components/MapButton/MapButton';

const Home = () => {
  const [leftBarView, setLeftBarView] = useState('home');
  const [popupView,  setPopupView]    = useState(null);

  const handleLeftbarAction = (action) => {
    switch (action) {
      case 'NEW_ROUTE':
        setLeftBarView('makeRoute');
        setPopupView('makeRoute');
        break;
      case 'MORE_ROUTES':
        setLeftBarView('searchingRoute');
        setPopupView('searchingRoute');
        break;
      case 'BACK':
        setLeftBarView('home');
        setPopupView(null);
        break;
      default: 
        setLeftBarView('home');
        setPopupView(null);
    }
  };

  return (
    <div className={styles.home}>
      <Map />
      {/* 가로등 */}
      {/* 경사도 */}

      <Leftbar
        view={leftBarView}
        onAction={handleLeftbarAction}
      />

      {popupView === 'makeRoute' && (
        <MakeRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      {popupView === 'searchingRoute' && (
        <SearchingRoutePopup onBack={() => handleLeftbarAction('BACK')} />
      )}

      <MapButton />
    </div>
  );
};

export default Home;
