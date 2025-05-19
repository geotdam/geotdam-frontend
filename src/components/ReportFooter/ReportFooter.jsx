// ReportFooter.jsx
import styles from './ReportFooter.module.css';
import ReportIssue from '../Button/ReportIssue';

const ReportFooter = () => {
  return (
    <div className={styles.footerContainer}>
      <ReportIssue />
      <div className={styles.terms}>
        <div className={styles.termsConditions}>Terms & Conditions</div>
      </div>
    </div>
  );
};

export default ReportFooter;
