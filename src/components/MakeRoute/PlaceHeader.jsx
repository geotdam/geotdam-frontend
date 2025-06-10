import styles from './PlaceHeader.module.css';
import Title from '../common/Title/Title';
import BookMark from '../Button/BookMark';

const PlaceHeader = ({ place }) => {
  //console.log('[PlaceHeader]', place.thumbnail_url);

  console.log('place.point', place.point); 
  
  return (
    <div className={styles.headerContainer}>
      <img
        className={styles.thumbnail}
          src={place.thumbnail_url || '/src/assets/mock/thumb.jpg'}
          alt="썸네일"
          loading="lazy"
          referrerPolicy="no-referrer" //	Google CDN이 Referrer 헤더를 검사해서 거부하는 경우 방지
          onError={(e) => {
              console.warn('[PlaceHeader] 이미지 로드 실패:', place?.thumbnail_url);
              e.target.onerror = null; // 무한루프 방지
              e.target.src = '/src/assets/mock/thumb.jpg'; // 실패 시 기본 이미지로 대체
            }} 
      />  
      
   
      <div className={styles.headerContent}>
        <div className={styles.titleBlock}>
          <Title text={place.place_name || '장소 이름 없음'} />
          <div className={styles.categoryRating}>
            {place.bizCategory || '카테고리 없음'} ★ {place.point || '0.0'} {/*장소 별점 연동  */}           </div>
        </div>
        <BookMark type="place" />
      </div>
    </div>
  );
};

export default PlaceHeader;
