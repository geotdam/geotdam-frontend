import styles from './MapButton.module.css';
import { useLocation } from '../../apis/LocationApi';

const MapButton = () => {
	const { getCurrentLocation, isLoading, error } = useLocation();

	const handleLocationClick = () => {
		getCurrentLocation();
	};

	return (
		<div className={styles.mapbutton}>
			<button 
				className={`${styles.mylocationbutton} ${isLoading ? styles.loading : ''}`}
				onClick={handleLocationClick}
				disabled={isLoading}
			>
				<img 
					className={styles.mylocationbuttonIcon} 
					alt="내 위치" 
					src="src\assets\icons\myLocation.svg" 
				/>
			</button>
			<img className={styles.lampbuttonIcon} alt="" src="src\assets\icons\lamp.svg" />
			<div className={styles.zoombutton}>
				<img className={styles.zoominbuttonIcon} alt="" src="src\assets\icons\zoomIn.svg" />
				<img className={styles.zoominbuttonIcon} alt="" src="src\assets\icons\zoomOut.svg" />
			</div>
		</div>
	);
};

export default MapButton;