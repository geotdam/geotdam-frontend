import styles from './Icon.module.css';

const Icon = ({ src, alt, className = '', backgroundColor = '#eee', onClick }) => {
  return (
    <div
      className={styles.iconWrapper}
      style={{ backgroundColor, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <img src={src} alt={alt} className={`${styles.iconImage} ${className}`} />
    </div>
  );
};

export default Icon;