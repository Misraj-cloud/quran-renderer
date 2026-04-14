import React, { createContext, useContext } from 'react';

import { createQuranhubDataSource } from '@/adapters/quranhub';
import {
  type MushafReaderValue,
  useMushafController,
} from '@/core';

export type MushafPageProviderProps = React.PropsWithChildren<
  Parameters<typeof useMushafController>[0] & {
    value?: MushafReaderValue;
  }
>;

const MushafPageContext = createContext<MushafReaderValue | undefined>(undefined);

export const MushafPageProvider = ({
  children,
  value,
  dataSource,
  ...controllerOptions
}: MushafPageProviderProps) => {
  const resolvedValue =
    value ??
    useMushafController({
      ...controllerOptions,
      dataSource:
        dataSource ??
        (controllerOptions.pageData === undefined
          ? createQuranhubDataSource({ environment: 'production' })
          : undefined),
    });

  return <MushafPageContext.Provider value={resolvedValue}>{children}</MushafPageContext.Provider>;
};

export const useMushafContext = (): MushafReaderValue => {
  const context = useContext(MushafPageContext);
  if (!context) {
    throw new Error('useMushafContext must be used within a MushafPageProvider');
  }

  return context;
};

export type MushafContextStateTypes = MushafReaderValue;
