// RouteHeader.jsx
import { useRef } from 'react';
import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';

const RouteHeader = ({ imageUrl, onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
  console.log('[RouteHeader] 썸네일 클릭됨');
  if (fileInputRef.current) {
    fileInputRef.current.value = ''; // 👈 선택값 초기화
    fileInputRef.current.click();    // 👈 파일 선택창 열기
  }
};

 const handleChange = (e) => {
  console.log('[RouteHeader] 파일 선택 변경 감지');

  const fileList = e.target.files;
  console.log('[RouteHeader] 선택된 파일들:', fileList);

  const file = fileList?.[0];
  if (!file) {
    console.warn('[RouteHeader] 파일이 없습니다.');
    return;
  }

  console.log('[RouteHeader] 전달할 파일:', file);

  if (onImageUpload) {
    onImageUpload(file);
  }
};

  return (
    <div className={styles.routeHeader}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <img
        className={styles.thumbnail}
        src={imageUrl}
        alt="썸네일"
        onClick={handleClick} //썸네일 클릭 가능
        onError={(e) => {
          e.target.onerror = null;
         // e.target.src = 'src/assets/mock/thumb.jpg';
        }}
      />
      <b className={styles.routeTitle}>Name of Route</b>
      <div className={styles.routeSubtext}>
        with Friend 장문 테스트 장문 테스트 장문 테스트 ...
      </div>
    </div>
  );
};

export default RouteHeader;
