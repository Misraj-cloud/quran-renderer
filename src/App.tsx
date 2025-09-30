import React from 'react';
import { QuranPage, QuranPageProvider } from './index';

const App: React.FC = () => {
  return (
    <QuranPageProvider pageNumber={10} dataId="ar.abdulsamad.hafs">
      <QuranPageConsumer />
    </QuranPageProvider>
  );
};

const QuranPageConsumer: React.FC = () => <QuranPage />;

export default App;
