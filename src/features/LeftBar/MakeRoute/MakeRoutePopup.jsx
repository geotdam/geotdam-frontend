import styles from './MakeRoutePopup.module.css';

import RouteHeader from '../../../components/MakeRoute/RouteHeader';
import RouteStepCard from '../../../components/MakeRoute/RouteStepCard';
import AddPlaceCard from '../../../components/MakeRoute/AddPlaceCard';
import SaveButton from '../../../components/Button/SaveButton';

const routeSteps = [
  {
    step: 1,
    color: 'pink',
    name: 'byTOFU',
    time: '9:00 - 15:00', 
    address: '123 Hansik-ro, Eumsik-si, Seoul, 444555',
    phone: '+375 (17) 327-10-45',
  },
  {
    step: 2,
    color: 'gray',
    name: 'eeee',
    time: '10:00 - 14:00', 
    address: '456 Food Rd, Seoul',
    phone: '+82-10-1234-5678',
  },
];

const MakeRoutePopup = () => {
  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <RouteHeader />
        {routeSteps.map((stepData, idx) => (
          <RouteStepCard key={idx} {...stepData} />
        ))}
        <AddPlaceCard step="3" />
        <SaveButton />
      </div>
    </div>
  );
};

export default MakeRoutePopup;
