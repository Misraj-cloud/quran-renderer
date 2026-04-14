import './styles/fonts.scss';

export { default as classnames, mushafSlots } from './classnames';
export { default as MushafReader, Mushaf, MushafReaderProvider, useMushafContext } from './react-ui';
export type { MushafPageProps } from './components/MushafReader/contexts/MushafPage/MushafPage.types';
export * from './core';
export { createQuranhubDataSource } from './adapters/quranhub';
