import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';
import thumbnailRoute from '../../assets/images/thumbnail.png'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const RouteHeader = ({ routeName, description, imageUrl }) => {
  return (
    <div className={styles.routeHeader}>
      <img
        className={styles.thumbnail}
        src={imageUrl || thumbnailRoute}
        alt="루트 썸네일"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = thumbnailRoute;
        }}
      />
      { /* 루트 이름 */}
      <b className={styles.routeTitle}>{routeName || '루트'}</b>
      { /* 루트 설명 */}
      <div className={styles.routeSubtext}>{description || '함께 걸어요'}</div>
    </div>
  );
};

export default RouteHeader;
