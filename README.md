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

## How to Use

Make sure to import package styles file which includes css styles and fonts assets

```tsx
// main.tsx;

import 'misraj-mushaf-renderer/dist/styles';
```

The core of the library is the `MushafReaderProvider` and the `Mushaf` component.

### 1. `MushafReaderProvider`

The `MushafReaderProvider` is a React context provider that fetches and manages the state for a specific Mushaf page. You need to wrap any component that will render Mushaf text with it.

**Props:**

- `dataId` (string): A unique identifier for the Mushaf narration you want to render (e.g., `quran-hafs`, `quran-qaloon`).
- `pageNumber` (number): The page number of the Mushaf you wish to display.
- `children`: The child components that will consume the provider's context.
- `initialFontScale` (number, optional): The initial font scale. Defaults to `3`.
- `hasBorder` (boolean, optional): Whether to display the page border. Defaults to `true`.
- `initialIsTwoPagesView` (boolean, optional): The initial state for two-page view. Defaults to `false`.
- `themeProps` (object, optional): An object to override default theme styles. See the "Styling and Customization" section.
- `styleOverride` (object, optional): An object to provide custom CSS classes to components. See the "Styling and Customization" section.

### 2. `useMushafContext` Hook

This hook provides access to the state and actions of the `MushafReaderProvider`. It should be used by components that are children of `MushafReaderProvider`.

**State:**

- `fontScale` (number): The current font scale.
- `selectedVerse` (Ayah | null): The currently selected verse.
- `ayat` (MushafPageDataType | null): The raw data for the current page.
- `nextPageAyat` (MushafPageDataType | null): The data for the next page, used in two-page view.
- `error` (Error | null): Any error that occurred while fetching data.
- `pageNumber` (number): The current page number.
- `dataId` (DataId): The current narration identifier.
- `isTwoPagesView` (boolean): Whether the two-page view is currently active.

**Actions:**

- `increaseFontScale()`: Increases the font scale.
- `decreaseFontScale()`: Decreases the font scale.
- `setSelectedVerse(verse: Ayah | null)`: Sets the selected verse.

**Example:**

```tsx
import { MushafReaderProvider, useMushafContext, Mushaf } from 'misraj-mushaf-renderer';

function App() {
  return (
    <MushafReaderProvider dataId="quran-hafs" pageNumber={1} initialIsTwoPagesView={true}>
      <MushafReader />
    </MushafReaderProvider>
  );
}

function MushafReader() {
  const { pageNumber, fontScale, increaseFontScale, decreaseFontScale, setSelectedVerse } =
    useMushafContext();

  const handleWordClick = (word) => {
    // select the verse the word belongs to
    setSelectedVerse(word.verse);
  };

  const handleWordHover = (word) => {
    console.log('Word hovered:', word);
  };

  return (
    <div>
      <header>
        <h1>Page {pageNumber}</h1>
        <div>
          <button onClick={decreaseFontScale}>A-</button>
          <span>Font size: {fontScale}</span>
          <button onClick={increaseFontScale}>A+</button>
        </div>
      </header>
      <Mushaf onWordClick={handleWordClick} onWordHover={handleWordHover} />
    </div>
  );
}
```

### 3. `Mushaf` Component

This component consumes the data fetched by `MushafReaderProvider` and renders the actual Mushaf page(s).

It accepts several optional props to handle user interactions.

**Props:**

- `onWordClick(word: Word)`: A callback function that triggers when a user clicks on a specific word. The `word` object contains detailed information about the word, including its location, text, and verse key.
- `onWordHover(word: Word)`: A callback function that triggers when a user hovers over a word.

## How It Works: The Rendering Process

Rendering a Mushaf page is a complex process that this library simplifies into a hierarchy of components.

1.  **`Line.tsx`** (`@src/components/MushafReader/ReadingView/Line.tsx`): The Mushaf page is broken down into lines. This component is responsible for rendering a single line of text, including chapter headers where necessary.

2.  **`VerseText.tsx`** (`@src/components/Verse/VerseText.tsx`): Each line contains words from one or more verses. `VerseText` takes an array of word objects and maps over them to render the verse. It handles text alignment and applies the correct font class based on the selected narration and font scale.

3.  **`MushafWord.tsx`** (`@src/components/dls/MushafWord/MushafWord.tsx`): This is the most granular component, responsible for rendering a single Mushaf word. It attaches the `onClick` and `onMouseEnter` event listeners and applies the specific font-family for the current narration via CSS classes defined in `MushafWord.module.scss`.

## Styling and Customization

The library's styling is managed through SCSS, offering a high degree of customization.

- **Component Styles**: Each component has its own scoped styles using SCSS modules (e.g., `MushafWord.module.scss`).
- **Global Styles** (`@src/styles/`): This directory contains the global styling configuration.
  - **Fonts**: The `@font-face` declarations for all supported narrations are located in `@src/styles/fonts.scss`.
  - **Responsiveness**: Breakpoints for various screen sizes are defined in `@src/styles/_breakpoints.scss` to ensure the layout is responsive.

The library offers two primary ways to customize the appearance of the Mushaf renderer: `themeProps` for global theme adjustments and `styleOverride` for fine-grained component-level style changes. Both are passed as props to the `MushafReaderProvider`.

### 1. Theming with `themeProps`

The `themeProps` object allows you to easily change the overall theme by setting global CSS variables at runtime.

**Available Options:**

- `borderColor` ('blue' | 'green' | 'sepia'): Sets the color for the page borders and the default word highlight color.
- `wordHighlightColor` (string): Overrides the default highlight color for words when they are hovered or selected. Accepts any valid CSS color value.
- `chapterHeaderFontSize` (string): The font size for the chapter headers (surah names). Accepts any valid CSS font-size value.
- `primaryFontColor` (string): The primary color of the Quranic text.

**Example:**

```tsx
const themeProps = {
  borderColor: 'sepia',
  wordHighlightColor: '#D4AF37', // Gold highlight
  chapterHeaderFontSize: '2.5rem',
  primaryFontColor: '#333333', // Dark gray text
};

<MushafReaderProvider dataId="quran-hafs" pageNumber={1} themeProps={themeProps}>
  <Mushaf />
</MushafReaderProvider>;
```

### 2. Component-level styling with `styleOverride`

For more specific, dynamic, or one-off styling changes, the `styleOverride` prop allows you to apply a `React.CSSProperties` object directly to the library's internal components.

The `styleOverride` object follows this structure:

```ts
{
  [ComponentName]?: {
    [StyleKey]?: React.CSSProperties; // A CSS style object
  }
}
```

-   `ComponentName` corresponds to the components you want to style (e.g., `Page`, `MushafWord`, `MushafReader`).
-   `StyleKey` corresponds to a stylable element within that component (e.g., `container`, `highlighted`, `twoPagesRow`).

You can find all available `ComponentName` and `StyleKey` values in the exported `classnames` object.

**Example:**

Let's say you want to remove the gap between the two pages in the two-page view. You can do this by passing a style object to the `twoPagesRow` style key of the `MushafReader` component.

```tsx
import { Mushaf, MushafReaderProvider } from 'misraj-mushaf-renderer';

const styleOverride = {
  MushafReader: {
    twoPagesRow: {
      gap: 0,
    },
  },
};

function App() {
  return (
    <MushafReaderProvider
      dataId="quran-hafs"
      pageNumber={1}
      styleOverride={styleOverride}
      initialIsTwoPagesView={true}
    >
      <Mushaf />
    </MushafReaderProvider>
  );
}
```
