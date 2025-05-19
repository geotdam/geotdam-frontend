import styles from './HottestRoute.module.css';

import Title from '../common/Title/Title'; 
import thumb from '../../assets/mock/thumb.jpg';

const HotRouteAround = ({ onMoreClick, onRouteSelect }) => {
  const hottestRoutes = [
    { id: 1, title: 'Namsan LOHAS 😎', author: '치돌이', thumbnail: thumb },
    { id: 2, title: '긴 제목 테스트 어쩌고 저쩌고', author: '치돌이', thumbnail: thumb },
    { id: 3, title: '짙은 제목', author: '치돌이', thumbnail: thumb },
    { id: 4, title: '짙은 제목', author: '치돌이', thumbnail: thumb },
    // ... 총 10개까지
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Hottest Route" />
        <div className={styles.moreText} onClick={onMoreClick}>
          More
        </div>
      </div>

      <div className={styles.routeList}>
        {hottestRoutes.map((route, idx) => (
          <div
            key={route.id}
            className={styles.routeItem}
            onClick={() => onRouteSelect(route)}
          >
            <div
              className={
                idx < 3 ? styles.rankBadgePink : styles.rankBadgeGray
              }
            >
              <div className={styles.rankText}>{idx + 1}</div>
            </div>
            <div className={styles.routeInfo}>
              <div className={styles.routeTitle}>{route.title}</div>
              <div className={styles.routeAuthor}>{route.author}</div>
            </div>
            <img
              className={styles.thumbnail}
              src={route.thumbnail}
              alt="thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotRouteAround;
