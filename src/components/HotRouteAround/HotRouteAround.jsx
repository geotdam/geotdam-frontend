import { useCallback } from 'react';
import styles from './HotRouteAround.module.css';

import Title from '../common/Title/Title';
import homeIcon from '../../assets/mock/thumb.jpg';

const HotRouteAround = ({ onMoreClick }) => {
  const handleClickMore = useCallback(() => {
    onMoreClick()
  }, [onMoreClick])

    const hotRoutes = [
        '긴제목도 확인Seoul Station',
        '긴제목도 확인Seoul Station',
        '긴제목도 확인Seoul Station'
    ];

    return (
        <div className={styles.hotRouteContainer}>
            <div className={styles.header}>
                <Title text="Hot Route" />
                <div className={styles.moreText} onClick={handleClickMore}>More</div>
            </div>
            <div className={styles.routeList}>
                {hotRoutes.map((name, index) => (
                    <div className={styles.routeItem} key={index}>
                        <img className={styles.routeIcon} src={homeIcon} alt="경로 아이콘" />
                        <div className={styles.routeName}>{name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotRouteAround;