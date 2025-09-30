# Misraj Quran Renderer

This library is a powerful and flexible React-based component for rendering Quran pages directly in your web application. It is designed to handle the complexities of Quranic text rendering, including multiple narrations, dynamic text sizing, and interactive features.

This project is an open-source initiative built upon the excellent foundation of the [quran.com-frontend-next](https://github.com/quran/quran.com-frontend-next) project. While the original project focused solely on the Hafs narration, this library extends its capabilities to include a wider range of Quranic narrations.

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
main.tsx;

import 'misraj-quran-renderer/styles';
```

The core of the library is the `QuranPageProvider` and the `QuranPage` component.

### 1. `QuranPageProvider`

The `QuranPageProvider` is a React context provider that fetches and manages the state for a specific Quran page. You need to wrap any component that will render Quranic text with it.

`@src/components/QuranReader/contexts/QuranPage/QuranPageProvider.tsx`

**Props:**

- `dataId` (string): A unique identifier for the Quran narration you want to render (e.g., `quran-hafs`, `quran-qaloon`).
- `pageNumber` (number): The page number of the Quran you wish to display.
- `children`: The child components that will consume the provider's context.

### 2. `useQuranPage` Hook

This hook provides access to the state and actions of the `QuranPageProvider`. It should be used by components that are children of `QuranPageProvider`.

`@src/components/QuranReader/contexts/QuranPage/QuranPageProvider.tsx`

**State:**

- `fontScale` (number): The current font scale.
- `selectedVerse` (Ayah | null): The currently selected verse.
- `currentSurah` (Surah | null): The current surah being displayed.
- `data` (QuranPageDataType | null): The raw data for the current page.
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
  QuranPageProvider,
  useQuranPage,
} from '@src/components/QuranReader/contexts/QuranPage/QuranPageProvider';
import QuranPage from '@src/components/QuranReader/contexts/QuranPage';

function App() {
  return (
    <QuranPageProvider dataId="quran-hafs" pageNumber={1}>
      <QuranReader />
    </QuranPageProvider>
  );
}

function QuranReader() {
  const {
    pageNumber,
    currentSurah,
    fontScale,
    increaseFontScale,
    decreaseFontScale,
    setSelectedVerse,
  } = useQuranPage();

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
      <QuranPage onWordClick={handleWordClick} onWordHover={handleWordHover} />
    </div>
  );
}
```

### 3. `QuranPage` Component

This component consumes the data fetched by `QuranPageProvider` and renders the actual Quran page.

`@src/components/QuranReader/contexts/QuranPage/index.tsx`

It accepts several optional props to handle user interactions, making the rendered text dynamic.

**Handlers:**

- `onWordClick(word: Word)`: A callback function that triggers when a user clicks on a specific word. The `word` object contains detailed information about the word, including its location, text, and verse key.
- `onWordHover(word: Word)`: A callback function that triggers when a user hovers over a word.
- `onPageLoad(pageNumber: number)`: A callback that triggers when the page data has been successfully loaded.

These handlers provide the flexibility to build rich, interactive experiences, such as displaying translations, playing audio, or highlighting tajweed rules for a specific word.

## How It Works: The Rendering Process

Rendering a Quran page is a complex process that this library simplifies into a hierarchy of components.

1.  **`Line.tsx`** (`@src/components/QuranReader/ReadingView/Line.tsx`): The Quran page is broken down into lines. This component is responsible for rendering a single line of text, including chapter headers where necessary.

2.  **`VerseText.tsx`** (`@src/components/Verse/VerseText.tsx`): Each line contains words from one or more verses. `VerseText` takes an array of word objects and maps over them to render the verse. It handles text alignment and applies the correct font class based on the selected narration and font scale.

3.  **`QuranWord.tsx`** (`@src/components/dls/QuranWord/QuranWord.tsx`): This is the most granular component, responsible for rendering a single Quranic word. It attaches the `onClick` and `onMouseEnter` event listeners and applies the specific font-family for the current narration via CSS classes defined in `QuranWord.module.scss`.

## Styling

The library's styling is managed through SCSS, offering a high degree of customization.

- **Component Styles**: Each component has its own scoped styles using SCSS modules (e.g., `QuranWord.module.scss`).
- **Global Styles** (`@src/styles/`): This directory contains the global styling configuration.
  - **Fonts**: The `@font-face` declarations for all supported narrations are located in `@src/styles/fonts.scss`.
  - **Responsiveness**: Breakpoints for various screen sizes are defined in `@src/styles/_breakpoints.scss` to ensure the layout is responsive.
