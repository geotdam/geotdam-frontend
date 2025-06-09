
import NickName from '../../../components/common/NickName';
import Title from '../../../components/common/Title/Title';
import Profile from '../../../components/common/profile'
import styles from './ReviewPopup.module.css'; 
import StarRating from '../../../components/Rating/StarRating';

const ReviewPopup = () => {
  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <div className={styles.div}>
          <Title text="!! 장소 이름 또는 루트 이름 !! 연동 필요" />
        </div>
        <div className={styles.div4}>
          <Title text="Rates" />
          <div className={styles.div5}>
            <div className={styles.div6}>
              <div className={styles.div7}>
                <Profile />
                <NickName />
              </div>
              <div className={styles.stars}>
                <StarRating />
              </div>
              <div className={styles.api}>{`api 연동 필요.`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
