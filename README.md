# Misraj Mushaf Renderer

This library is a powerful and flexible React-based component for rendering Mushaf pages directly in your web application. It is designed to handle the complexities of Quranic text rendering, including multiple narrations, dynamic text sizing, and interactive features.

This project is an open-source initiative built upon the excellent foundation of the [quran.com-frontend-next](https://github.com/quran/quran.com-frontend-next) project. While the original project focused solely on the Hafs narration, this library extends its capabilities to include a wider range of Quranic narrations.

The project is also built on top of [Quran Hub API](https://api-staging.quranhub.com/docs#/) which is one of [MISRAJ](https://misraj.sa/) company non-commercial projects

## License and Acknowledgement

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Public License. See the `LICENSE` file for details.

A significant portion of this codebase is derived from the [quran.com-frontend-next](https://github.com/quran/quran.com-frontend-next) project. We are immensely grateful to the quran.com team for their pioneering work and for making their project open source.

## Key Features

- **Multi-Narration Support**: Unlike the original Hafs-only implementation, this library supports multiple Quranic narrations:
  - Hafs
  - Qaloon
  - Qunbul
  - Shoba
  - Warsh
  - Bazzi
  - Douri
  - Sousi
- **Two-page view**: Supports a side-by-side two-page view on larger screens for a more authentic reading experience.
- **Dynamic and Interactive**: Provides handlers for word-level interactions.
- **Easy Integration**: Simple to integrate into any React project with a straightforward provider-consumer pattern.
- **Customizable Styling**: Uses a flexible SCSS structure for easy theming and customization.

## Package Structure

- `misraj-mushaf-renderer`: full package, including the default React UI, core helpers, and the Quranhub adapter
- `misraj-mushaf-renderer/core`: headless controller hook, public types, and shaping utilities
- `misraj-mushaf-renderer/react-ui`: the default React reader, provider, and context hook
- `misraj-mushaf-renderer/adapters/quranhub`: optional data-source adapter for Quranhub

## How to Use

Import the packaged styles once:

```tsx
import 'misraj-mushaf-renderer/dist/styles';
```

### 1. Drop-in Reader

Use `MushafReader` when you want a single self-contained component:

```tsx
import { MushafReader } from 'misraj-mushaf-renderer';

function App() {
  return (
    <MushafReader
      dataId="quran-hafs"
      pageNumber={1}
      defaultTwoPageView
      theme={{
        borderColor: 'sepia',
        wordHighlightColor: '#D4AF37',
      }}
    />
  );
}
```

### 2. Host-Controlled Data and State

Use the new core/controller API when the host app should own fetching, page state, or selected verse state:

```tsx
import { MushafReader, useMushafController } from 'misraj-mushaf-renderer';

function ControlledReader({ pageData }) {
  const controller = useMushafController({
    dataId: 'quran-hafs',
    pageNumber: 1,
    pageData,
    defaultTwoPageView: false,
  });

  return (
    <MushafReader
      dataId="quran-hafs"
      pageNumber={controller.pageNumber}
      pageData={pageData}
      selectedVerse={controller.selectedVerse}
      onSelectedVerseChange={controller.setSelectedVerse}
      fontScale={controller.fontScale}
      onFontScaleChange={controller.setFontScale}
    />
  );
}
```

### 3. Custom Data Source

Use `dataSource` for adapter mode without hardcoding Quranhub into your app shell:

```tsx
import { MushafReader } from 'misraj-mushaf-renderer';
import { createQuranhubDataSource } from 'misraj-mushaf-renderer/adapters/quranhub';

const dataSource = createQuranhubDataSource({ environment: 'production' });

function App() {
  return (
    <MushafReader
      dataId="quran-hafs"
      pageNumber={1}
      dataSource={dataSource}
      narrationDifferencesRequest={{
        sourceEditionIdentifier: 'quran-warsh',
        targetEditionIdentifier: 'quran-hafs',
      }}
    />
  );
}
```

## Styling and Customization

Theme variables are now scoped to each reader root instead of mutating `document.documentElement`, so multiple differently themed readers can coexist on the same page.

### `theme`

Use semantic theme tokens:

- `borderColor`
- `wordHighlightColor`
- `chapterHeaderFontSize`
- `primaryFontColor`
- `fontSize`
- `spacingMega`

### `classNames`, `styles`, and `slotProps`

Use stable slot names instead of internal SCSS module keys:

- `root`
- `twoPageLayout`
- `page`
- `pageBorder`
- `pageMeta`
- `pageNumber`
- `line`
- `verseText`
- `word`
- `wordHighlighted`
- `chapterHeader`
- `chapterIcon`

### Render Overrides

The default UI can be customized without forking internal components:

- `renderWord`
- `renderLine`
- `renderPageMeta`
- `renderChapterHeader`

Each renderer receives typed context plus `defaultNode`, so hosts can wrap or replace the default output.

## Compatibility

- `MushafReaderProvider` and `Mushaf` still exist for compatibility with the older provider-consumer pattern.
- The provider now uses the same explicit props as `MushafReader`, including `dataSource`, `defaultFontScale`, `defaultTwoPageView`, and `narrationDifferencesRequest`.

## Notes

- The default package still exports `useMushafContext` for apps that want access to the reader controller from inside the provider tree.
- The core layer is intentionally independent from any specific backend. Quranhub support now lives behind the shipped adapter.
```tsx
import { Mushaf, MushafReaderProvider } from 'misraj-mushaf-renderer';

function LegacyApp() {
  return (
    <MushafReaderProvider dataId="quran-hafs" pageNumber={1} defaultTwoPageView>
      <Mushaf />
    </MushafReaderProvider>
  );
}
```
