import React from 'react';
import { MushafPage, MushafPageProvider } from './index';

const MushafPageConsumer: React.FC = () => <MushafPage />;

const App: React.FC = () => (
  <MushafPageProvider initialIsTwoPagesView hasBorder pageNumber={594} dataId="quran-hafs">
    <MushafPageConsumer />
  </MushafPageProvider>
);

export default App;
