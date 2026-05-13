import React from 'react';

import { DataId, MushafReader } from './index';
import { narrationIdentifierFromReciterId } from './utils/narration-name';
import { Ayah } from './types/verses';

const App: React.FC = () => {
  const DATA_ID: DataId = 'quran-hafs';
  const [selected, setSelected] = React.useState<Ayah>();

  return (
    <div style={{ padding: 24 }}>
      <MushafReader
        dataId={DATA_ID}
        pageNumber={598}
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
        onWordClick={(word) => {
          setSelected(word.verse);
        }}
        selectedVerse={selected}
        styles={{
          twoPageLayout: {
            gap: 0,
          },
        }}
        fontScale={5}
      />
    </div>
  );
};

export default App;
