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
- **Dynamic and Interactive**: Provides handlers for word-level interactions.
- **Easy Integration**: Simple to integrate into any React project with a straightforward provider-consumer pattern.
- **Customizable Styling**: Uses a flexible SCSS structure for easy theming and customization.

## How to Use

Make sure to import package styles file which includes css styles and fonts assets

```tsx
// main.tsx;

import 'misraj-mushaf-renderer/styles';
```

The core of the library is the `MushafPageProvider` and the `MushafPage` component.

### 1. `MushafPageProvider`

The `MushafPageProvider` is a React context provider that fetches and manages the state for a specific Mushaf page. You need to wrap any component that will render Mushaf text with it.

`@src/components/MushafReader/contexts/MushafPage/MushafPageProvider.tsx`

**Props:**

- `dataId` (string): A unique identifier for the Mushaf narration you want to render (e.g., `quran-hafs`, `quran-qaloon`).
- `pageNumber` (number): The page number of the Mushaf you wish to display.
- `children`: The child components that will consume the provider's context.

### 2. `useMushafPage` Hook

This hook provides access to the state and actions of the `MushafPageProvider`. It should be used by components that are children of `MushafPageProvider`.

`@src/components/MushafReader/contexts/MushafPage/MushafPageProvider.tsx`

**State:**

- `fontScale` (number): The current font scale.
- `selectedVerse` (Ayah | null): The currently selected verse.
- `currentSurah` (Surah | null): The current surah being displayed.
- `data` (MushafPageDataType | null): The raw data for the current page.
- `error` (Error | null): Any error that occurred while fetching data.
- `loading` (boolean): A boolean indicating if the page data is loading.
- `pageNumber` (number): The current page number.
- `dataId` (DataId): The current narration identifier.

**Actions:**

- `increaseFontScale()`: Increases the font scale.
- `decreaseFontScale()`: Decreases the font scale.
- `setSelectedVerse(verse: Ayah | null)`: Sets the selected verse.
- `setCurrentSurah(surah: Surah | null)`: Sets the current surah.
- `refresh()`: Refreshes the data for the current page.

**Example:**

```tsx
import {
  MushafPageProvider,
  useMushafPage,
} from '@src/components/MushafReader/contexts/MushafPage/MushafPageProvider';
import MushafPage from '@src/components/MushafReader/contexts/MushafPage';

function App() {
  return (
    <MushafPageProvider dataId="quran-hafs" pageNumber={1}>
      <MushafReader />
    </MushafPageProvider>
  );
}

function MushafReader() {
  const {
    pageNumber,
    currentSurah,
    fontScale,
    increaseFontScale,
    decreaseFontScale,
    setSelectedVerse,
  } = useMushafPage();

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
        <h1>
          Page {pageNumber} - Surah {currentSurah?.name}
        </h1>
        <div>
          <button onClick={decreaseFontScale}>A-</button>
          <span>Font size: {fontScale}</span>
          <button onClick={increaseFontScale}>A+</button>
        </div>
      </header>
      <MushafPage onWordClick={handleWordClick} onWordHover={handleWordHover} />
    </div>
  );
}
```

### 3. `MushafPage` Component

This component consumes the data fetched by `MushafPageProvider` and renders the actual Mushaf page.

`@src/components/MushafReader/contexts/MushafPage/index.tsx`

It accepts several optional props to handle user interactions, making the rendered text dynamic.

**Handlers:**

- `onWordClick(word: Word)`: A callback function that triggers when a user clicks on a specific word. The `word` object contains detailed information about the word, including its location, text, and verse key.
- `onWordHover(word: Word)`: A callback function that triggers when a user hovers over a word.
- `onPageLoad(pageNumber: number)`: A callback that triggers when the page data has been successfully loaded.

These handlers provide the flexibility to build rich, interactive experiences, such as displaying translations, playing audio, or highlighting tajweed rules for a specific word.

## How It Works: The Rendering Process

Rendering a Mushaf page is a complex process that this library simplifies into a hierarchy of components.

1.  **`Line.tsx`** (`@src/components/MushafReader/ReadingView/Line.tsx`): The Mushaf page is broken down into lines. This component is responsible for rendering a single line of text, including chapter headers where necessary.

2.  **`VerseText.tsx`** (`@src/components/Verse/VerseText.tsx`): Each line contains words from one or more verses. `VerseText` takes an array of word objects and maps over them to render the verse. It handles text alignment and applies the correct font class based on the selected narration and font scale.

3.  **`MushafWord.tsx`** (`@src/components/dls/MushafWord/MushafWord.tsx`): This is the most granular component, responsible for rendering a single Mushaf word. It attaches the `onClick` and `onMouseEnter` event listeners and applies the specific font-family for the current narration via CSS classes defined in `MushafWord.module.scss`.

## Styling

The library's styling is managed through SCSS, offering a high degree of customization.

- **Component Styles**: Each component has its own scoped styles using SCSS modules (e.g., `QuranWord.module.scss`).
- **Global Styles** (`@src/styles/`): This directory contains the global styling configuration.
  - **Fonts**: The `@font-face` declarations for all supported narrations are located in `@src/styles/fonts.scss`.
  - **Responsiveness**: Breakpoints for various screen sizes are defined in `@src/styles/_breakpoints.scss` to ensure the layout is responsive.

## Overriding Styles

This library exports a `classnames` object that allows you to override the default styles of the components. Each key in the `classnames` object corresponds to a component, and the value is an object containing the CSS class names for that component.

You can use these class names to apply your own styles. For example, to change the background color of the `MushafReader` component, you can do the following:

**Example:**

```tsx
import { MushafPageProvider, useMushafPage, classnames } from 'misraj-mushaf-renderer';
import { MushafPage } from 'misraj-mushaf-renderer';
import 'misraj-mushaf-renderer/styles';

function App() {
  return (
    <MushafPageProvider dataId="quran-hafs" pageNumber={1}>
      <MushafReader />
    </MushafPageProvider>
  );
}

function MushafReader() {
  const {
    pageNumber,
    currentSurah,
    fontScale,
    increaseFontScale,
    decreaseFontScale,
    setSelectedVerse,
  } = useMushafContext();

  const handleWordClick = (word) => {
    // select the verse the word belongs to
    setSelectedVerse(word.verse);
  };

  const handleWordHover = (word) => {
    console.log('Word hovered:', word);
  };

  return (
    <div className={classnames.MushafReader.container}>
      <header>
        <h1>
          Page {pageNumber} - Surah {currentSurah?.name}
        </h1>
        <div>
          <button onClick={decreaseFontScale}>A-</button>
          <span>Font size: {fontScale}</span>
          <button onClick={increaseFontScale}>A+</button>
        </div>
      </header>
      <MushafPage onWordClick={handleWordClick} onWordHover={handleWordHover} />
    </div>
  );
}
```

Then, in your CSS file, you can define your custom styles:

```css
.MushafReader-container {
  background-color: #f0f0f0 !important;
}
```
