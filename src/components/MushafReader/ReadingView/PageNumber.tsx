import { BorderColor } from 'src/types/border-color';
import styles from './Page.module.scss';
import greenPageNumberBorder from 'src/assets/images/borders/green/page-number-border.svg';
import bluePageNumberBorder from 'src/assets/images/borders/blue/page-number-border.svg';
import sepiaPageNumberBorder from 'src/assets/images/borders/sepia/page-number-border.svg';

const pageNumberBorder = {
  green: greenPageNumberBorder,
  blue: bluePageNumberBorder,
  sepia: sepiaPageNumberBorder,
};

type Props = { value: number; borderColor?: BorderColor };

const PageNumber = ({ value, borderColor }: Props) => {
  return (
    <div className={styles.pageNumberContainer}>
      <img src={pageNumberBorder[borderColor || 'green']} />
      <p className={styles.pageNumber}>{pageNumberToPersian(`${value}`)}</p>
    </div>
  );
};

export default PageNumber;

const pageNumberToPersian = (pageNumber: string) => {
  const pageNumbersArr = pageNumber.split('');
  return pageNumbersArr
    .map((number) => englishToPersian[number as keyof typeof englishToPersian])
    .join('');
};

const englishToPersian = {
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '۷',
  '8': '۸',
  '9': '۹',
};
