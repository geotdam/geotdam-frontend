import styles from './TopNavigation.module.css';

const TopNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.topNav}>
      <div
        className={activeTab === 'myroute' ? styles.activeItem : styles.navItem}
        onClick={() => onTabChange('myroute')}
      >
        MyRoute
      </div>
      <div className={styles.separator}>|</div>
      <div
        className={activeTab === 'routemark' ? styles.activeItem : styles.navItem}
        onClick={() => onTabChange('routemark')}
      >
        RouteMark
      </div>
      <div className={styles.separator}>|</div>
      <div
        className={activeTab === 'placemark' ? styles.activeItem : styles.navItem}
        onClick={() => onTabChange('placemark')}
      >
        PlaceMark
      </div>
    </div>
  );
};

export default TopNavigation;
