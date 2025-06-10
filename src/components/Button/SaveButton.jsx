import styles from '../../features/LeftBar/MakeRoute/MakeRoutePopup.module.css';

const SaveButton = ({ onClick }) => (
  <button  className={styles.saveButton} onClick={onClick}>
    <b className={styles.routeTitle}>Save</b>
  </button >
);

export default SaveButton;
