import styles from './Contents.module.css';

const Contents = ({ data = [], tab }) => {
  return (
    <div className={styles.wrapper}>
      {data.map((item, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.row}>
            <div className={styles.textGroup}>
              <div className={styles.title}>{item.name}</div>
              {tab === 'myroute' || tab === 'routemark' ? (
                <div className={styles.subtitle}>{item.creator}</div>
              ) : (
                <div className={styles.subtitle}>{item.address}</div>
              )}
            </div>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={styles.thumbnail}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contents;