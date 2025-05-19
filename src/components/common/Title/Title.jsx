import styles from './Title.module.css';

const Title = ({ text }) => {
  return <div className={styles.Title}>{text}</div>;
};

export default Title;
