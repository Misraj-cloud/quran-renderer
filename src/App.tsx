import React from 'react';

import { DataId, MushafReader } from './index';
import { narrationIdentifierFromReciterId } from './utils/narration-name';

const App: React.FC = () => {
  const DATA_ID: DataId = 'quran-hafs';

  return (
    <div style={{ padding: 24 }}>
      <MushafReader
        dataId={DATA_ID}
        pageNumber={598}
        defaultTwoPageView
        theme={{
          borderColor: 'blue',
          wordHighlightColor: '#D0F7E9',
          fontSize: '14px',
        }}
        narrationDifferencesRequest={{
          sourceEditionIdentifier: narrationIdentifierFromReciterId(DATA_ID).replace(
            'mushaf',
            'quran',
          ),
          targetEditionIdentifier: 'quran-hafs',
        }}
        styles={{
          twoPageLayout: {
            gap: 0,
          },
        }}
      />
    </div>
  );
};

export default App;
