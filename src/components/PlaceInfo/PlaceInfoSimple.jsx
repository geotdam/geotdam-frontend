import styles from './PlaceInfoSimple.module.css';

const PlaceInfoSimple = () => {
	return (
		<div className={styles.placeInfoSimple}>
			<div className={styles.numbering}> A </div>
			<div className={styles.info}>
				<div className={styles.name}>Namsan LOHAS 😎</div>
				<div className={styles.address}>주소입니다. 주소입니다. 주소입니다. 주소입니다.</div>
			</div>
		</div>);
};

export default PlaceInfoSimple;
