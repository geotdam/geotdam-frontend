import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';

const RouteHeader = () => (
  <div className={styles.routeHeader}>
    <img className={styles.thumbnail} src="src/assets/mock/thumb.jpg" alt="썸네일" />
    <b className={styles.routeTitle}>Name of Route</b>
    <div className={styles.routeSubtext}>with Friend
      장문 테스트 장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트장문 테스트
    </div>
  </div>
);

export default RouteHeader;
