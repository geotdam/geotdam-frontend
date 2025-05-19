import styles from './reportIssue.module.css';

import issueIcon from '../../assets/icons/issueIcon.svg';

const ReportIssueButton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.buttonContent}>
                <div className={styles.iconWrapper}>
                    <img className={styles.icon} alt="이슈 아이콘" src={issueIcon} />
                </div>
                <div className={styles.label}>Report an issue</div>
            </div>
        </div>
    );
};

export default ReportIssueButton;
