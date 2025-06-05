import styles from './MapButton.module.css';
import { useLocation } from '../../apis/LocationApi';
import myLocationIcon from '../../assets/icons/myLocation.svg';
import lampIcon from '../../assets/icons/lamp.svg';
import zoomInIcon from '../../assets/icons/zoomIn.svg';
import zoomOutIcon from '../../assets/icons/zoomOut.svg';

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
					src={myLocationIcon}
				/>
			</button>
			<img className={styles.lampbuttonIcon} alt="" src={lampIcon} />
		</div>
	);
};

export default MapButton;