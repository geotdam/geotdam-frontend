import styles from './PlaceInfoSimple.module.css';

const PlaceInfoSimple = ({ place, label }) => {
	return (
		<div className={styles.placeInfoSimple}>
			<div className={styles.numbering}>{label}</div>
			<div className={styles.info}>
				<div className={styles.name}>{place.place_name}</div>
				<div className={styles.address}>{place.roadAddress || place.address || '주소 정보 없음'}</div>
			</div>
		</div>
	);
};

export default PlaceInfoSimple;
