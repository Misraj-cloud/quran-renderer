import React from 'react';

import classNames from 'classnames';

import styles from './ChapterIconContainer.module.scss';

import ChapterIcon from '@/components/chapters/ChapterIcon';
import { useMushafContext } from 'src/components/MushafReader/contexts/MushafPage/MushafPageProvider';
import { useThemeContext } from 'src/components/MushafReader/contexts/Theme/ThemeProvider';

// TODO: maybe replace `hasSurahPrefix` with `variant` and use it to show v1 or v2 surah name font
interface Props {
  chapterId: string;
  hasSurahPrefix?: boolean;
}

const IconContainer: React.FC<Props> = ({ chapterId, hasSurahPrefix = true }) => {
  const { hasBorder } = useMushafContext();
  const { themeProps, styleOverride } = useThemeContext();
  const { borderColor } = themeProps;

  return (
    <span
      className={classNames(styles.iconContainer, styles.iconContainerLarge, {
        [styles.border]: hasBorder,
        [styles.blueBorder]: hasBorder && borderColor === 'blue',
        [styles.sepiaBorder]: hasBorder && borderColor === 'sepia',
      })}
      style={{ ...styleOverride?.ChapterIconContainer?.iconContainer }} // to inherit the text color from the parent element
    >
      <ChapterIcon id={chapterId} />
      {hasSurahPrefix && <ChapterIcon id="surah" />}
    </span>
  );
};

export default IconContainer;
