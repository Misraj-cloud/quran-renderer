import React from 'react';
import { QuranPage, QuranPageProvider } from './index';

const QuranPageConsumer: React.FC = () => <QuranPage />;

const App: React.FC = () => (
  <QuranPageProvider pageNumber={367} dataId="quran-qaloon">
    <QuranPageConsumer />
  </QuranPageProvider>
);

export default App;
