import React from 'react';
import { MushafPageProvider, Mushaf } from './index';

const MushafPageConsumer: React.FC = () => <Mushaf styleOverride={{ borderColor: 'blue' }} />;

const App: React.FC = () => (
  <MushafPageProvider initialIsTwoPagesView hasBorder pageNumber={1} dataId="quran-hafs">
    <MushafPageConsumer />
  </MushafPageProvider>
);

export default App;
