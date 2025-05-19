import styles from './MapButton.module.css';

const MapButton = () => {
	return (
		<div className={styles.mapbutton}>
			<img className={styles.mylocationbuttonIcon} alt="" src="src\assets\icons\myLocation.svg" />
			<img className={styles.lampbuttonIcon} alt="" src="src\assets\icons\lamp.svg" />
			<div className={styles.zoombutton}>
				<img className={styles.zoominbuttonIcon} alt="" src="src\assets\icons\zoomIn.svg" />
				<img className={styles.zoominbuttonIcon} alt="" src="src\assets\icons\zoomOut.svg" />
			</div>
		</div>
	);
};

export default MapButton;