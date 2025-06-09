import styles from './PlaceInfoSimple.module.css';

const PlaceInfoSimple = ({ place, label, onClick }) => {
  return (
    <div className={styles.placeInfoSimple} onClick={onClick}>
      <div className={styles.numbering}>{label}</div>
      <div className={styles.info}>
        <div className={styles.name}>{place.place_name}</div>
        <div className={styles.address}>{place.roadAddress || '주소 없음'}</div>
      </div>
    </div>
  );
};


export default PlaceInfoSimple;
