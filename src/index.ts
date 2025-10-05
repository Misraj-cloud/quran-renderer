import './styles/fonts.scss';

export { default as Mushaf } from './components/MushafReader/index';
export {
  MushafPageProvider,
  useMushafContext,
} from './components/MushafReader/contexts/MushafPage/MushafPageProvider';
export { default as classnames } from './classnames';
export {
  type DataId,
  type MushafPageProps,
} from './components/MushafReader/contexts/MushafPage/MushafPage.types';
