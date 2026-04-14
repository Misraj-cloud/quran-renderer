import React from 'react';

import classNames from 'classnames';

import styles from './ChapterIconContainer.module.scss';

import ChapterIcon from '@/components/chapters/ChapterIcon';
import { useThemeContext } from 'src/components/MushafReader/contexts/Theme/ThemeProvider';

// TODO: maybe replace `hasSurahPrefix` with `variant` and use it to show v1 or v2 surah name font
interface Props {
  chapterId: string;
  hasSurahPrefix?: boolean;
}

const IconContainer: React.FC<Props> = ({ chapterId, hasSurahPrefix = true }) => {
  const { theme, styles: slotStyles, classNames: slotClassNames } = useThemeContext();
  const { borderColor } = theme;

  return (
    <span
      className={classNames(
        styles.iconContainer,
        styles.iconContainerLarge,
        styles.border,
        slotClassNames.chapterIcon,
        {
          [styles.blueBorder]: borderColor === 'blue',
          [styles.sepiaBorder]: borderColor === 'sepia',
        },
      )}
      style={{
        ...slotStyles.chapterIcon,
      }}
    >
      <ChapterIcon id={chapterId} />
      {hasSurahPrefix && <ChapterIcon id="surah" />}
    </span>
  );
};

export default IconContainer;
