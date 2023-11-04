/**
 * 应用级Action
 * 
 * sobird<i@sobird.me> at 2023/05/08 22:54:36 created.
 */

import { IAppState } from "@/store/reducers/app"

export const UPDATE_USER  = 'UPDATE_USER';
export const TOGGLE_ASIDE = 'TOGGLE_ASIDE';
export const UPDATE_MICRO = 'UPDATE_MICRO';

export function updateUser(payload: IAppState['userProfile']) {
  return {
    type: UPDATE_USER,
    payload,
  }
}
