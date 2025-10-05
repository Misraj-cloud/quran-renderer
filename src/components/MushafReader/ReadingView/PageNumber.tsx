import styles from './Page.module.scss';
import pageNumberBorder from 'src/assets/images/page-number-border.png';

type Props = { value: number };

const PageNumber = ({ value }: Props) => {
  return (
    <div className={styles.pageNumberContainer}>
      <img src={pageNumberBorder} />
      <p className={styles.pageNumber}>{value}</p>
    </div>
  );
};

export default PageNumber;
