/**
 * Reducers
 *
 * sobird<i@sobird.me> at 2023/05/08 23:19:26 created.
 */

import app, { IAppState } from './app';

export interface IStoreState {
  app: IAppState;
}

export default {
  app,
};
