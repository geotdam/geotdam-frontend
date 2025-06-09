import styles from './Contents.module.css';

const Contents = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.contentRow}>
          <div className={styles.textGroup}>
            <div className={styles.title}>Namsan LOHAS 😎</div>
            <div className={styles.subtitle}>치돌이</div>
          </div>
          <img className={styles.thumbnail} alt="home" src="Home.png" />
        </div>
      </div>
    </div>
  );
};

export default Contents;
