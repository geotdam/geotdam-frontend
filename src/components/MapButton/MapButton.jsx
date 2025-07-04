import { useState, useEffect } from 'react';
import styles from './MapButton.module.css';
import { useLocation } from '../../apis/LocationApi';
import myLocationIcon from '../../assets/icons/myLocation.svg';
import lampIcon from '../../assets/icons/lamp.svg';
import Login from '../../features/Account/Login';

const MapButton = () => {
	const { getCurrentLocation, isLoading, needsLogin, setNeedsLogin } = useLocation();
	const [showLoginPopup, setShowLoginPopup] = useState(false);

	const handleLocationClick = () => {
		getCurrentLocation();
	};

	// needsLogin이 변경될 때마다 로그인 팝업 상태 업데이트
	useEffect(() => {
		setShowLoginPopup(needsLogin);
	}, [needsLogin]);

	// 로그인 팝업 닫기 핸들러
	const handleCloseLogin = () => {
		setShowLoginPopup(false);
		setNeedsLogin(false);
	};

	return (
		<>
			<div className={styles.mapbutton}>
				<button 
					className={`${styles.mylocationbutton} ${isLoading ? styles.loading : ''}`}
					onClick={handleLocationClick}
					disabled={isLoading}
				>
					<img alt="내 위치" src={myLocationIcon} />
				</button>
				<img className={styles.lampbuttonIcon} alt="램프 버튼" src={lampIcon} />
			</div>

			{/* 로그인 팝업 */}
			{showLoginPopup && (
				<div className={styles.loginPopupOverlay}>
						<Login onClose={handleCloseLogin} />
				</div>
			)}
		</>
	);
};

export default MapButton;