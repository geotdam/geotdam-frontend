import styles from './TopNavigation.module.css';

const TopNavigation = () => {
  return (
    <div className={styles.topNav}>
      <div className={styles.navItem}>MyRoute</div>
      <div className={styles.separator}>|</div>
      <b className={styles.activeItem}>RouteMark</b>
      <div className={styles.separator}>|</div>
      <div className={styles.navItem}>PlaceMark</div>
    </div>
  );
};

export default TopNavigation;
