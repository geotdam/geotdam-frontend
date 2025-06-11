import styles from './SharePopup.module.css';

const SharePopup = ({ shareUrl, onClose }) => {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      alert("복사 실패. 수동으로 복사해주세요.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3 className={styles.title}>이 루트를 공유해보세요!</h3>
        <input className={styles.input} value={shareUrl} readOnly />

        <div className={styles.buttons}>
          <button
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                "_blank"
              )
            }
          >
            페이스북 공유
          </button>
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
                "_blank"
              )
            }
          >
            트위터 공유
          </button>
          <button onClick={copyLink}>링크 복사</button>
        </div>

        <button className={styles.close} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
