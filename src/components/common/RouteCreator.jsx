import React from 'react';
import styles from './RouteCreator.module.css'; 
import profileImage from '../../assets/mock/profile.svg';

const RouteCreator = ({ profileUrl, nickname }) => {
  return (
    <>
      <img
        src={profileUrl || profileImage}
        alt={`${nickname || "작성자"} 프로필 이미지`}
        className={styles.profile} 
      />
      <div className={styles.div1}>
        {nickname || "알 수 없음"}
      </div>
    </>
  );
};

export default RouteCreator;