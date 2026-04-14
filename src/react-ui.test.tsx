import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { MushafReader } from '@/react-ui';
import { sampleNarrationDifferences, samplePageData } from '@/test/fixtures';

describe('MushafReader', () => {
  it('renders from host-controlled page data without a provider wrapper', () => {
    const html = renderToStaticMarkup(
      <MushafReader dataId="quran-hafs" pageData={samplePageData} pageNumber={1} />,
    );

    expect(html).toContain('misraj-mushaf-root');
    expect(html).toContain('page-1');
  });

  it('scopes theme styles per rendered reader instance', () => {
    const html = renderToStaticMarkup(
      <>
        <MushafReader
          dataId="quran-hafs"
          pageData={samplePageData}
          pageNumber={1}
          theme={{ wordHighlightColor: '#111111' }}
        />
        <MushafReader
          dataId="quran-hafs"
          pageData={samplePageData}
          pageNumber={1}
          narrationDifferences={sampleNarrationDifferences}
          theme={{ wordHighlightColor: '#222222' }}
        />
      </>,
    );

    expect(html).toContain('--word-highlight-color:#111111');
    expect(html).toContain('--word-highlight-color:#222222');
  });
});
