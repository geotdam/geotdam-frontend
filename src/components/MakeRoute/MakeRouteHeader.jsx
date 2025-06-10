// RouteHeader.jsx
import axios from 'axios';
import { useRef, useState } from 'react';
import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';
import thumbnailRoute from '../../assets/images/thumbnail.png'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const RouteHeader = ({
  routeName,
  description,
  onChangeRouteName,
  onChangeDescription,
  onUploadComplete
}) => {
  const fileInputRef = useRef(null);
  const [localImageUrl, setLocalImageUrl] = useState(null); // 미리보기용

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 미리보기용 URL
    const preview = URL.createObjectURL(file);
    setLocalImageUrl(preview);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${VITE_BASE_URL}/api/upload/image`, formData);
      const uploadedUrl = res.data.url;
      console.log('[RouteHeader] 이미지 업로드 성공:', uploadedUrl);

      // 부모 컴포넌트에 알림
      if (onUploadComplete) {
        onUploadComplete(uploadedUrl);
      }
    } catch (err) {
      console.error('[RouteHeader] 이미지 업로드 실패:', err);
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
        src={localImageUrl || thumbnailRoute}
        alt="썸네일"
        onClick={handleClick}
        onError={(e) => {
          e.target.onerror = null;
          //e.target.src = 'src/assets/mock/thumb.jpg';
        }}
      />
      { /* 루트 이름 */}
      <input
        type="text"
        className={styles.routeTitleInput}
        value={routeName}
        onChange={(e) => onChangeRouteName?.(e.target.value)}
        placeholder="루트의 이름을 입력해주세요"
      />
      { /* 루트 설명 */}
      <textarea
        className={styles.routeDescriptionInput}
        value={description}
        onChange={(e) => onChangeDescription?.(e.target.value)}
        placeholder="당신이 걷고 싶은 루트를 설명해주세요"
      />
    </div>
  );
};

export default RouteHeader;
