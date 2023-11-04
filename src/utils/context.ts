/**
 * AppContext
 * 
 * sobird<i@sobird.me> at 2023/10/06 15:17:11 created.
 */

import { createContext } from 'react';

const defaultValue: any = {};
export const MyAppContext = createContext(defaultValue);
export const AppProvider = MyAppContext.Provider;
