/**
 * 应用级Reducer
 * 
 * sobird<i@sobird.me> at 2023/05/08 20:52:39 created.
 */
import Cookies from 'js-cookie';
import { IAction } from '../actions';
import { UPDATE_USER, TOGGLE_ASIDE, UPDATE_MICRO } from '@/store/actions/app';
import { userAuth } from "@/middleware/withUserAuth";
export type UserProfile = Partial<Awaited<ReturnType<typeof userAuth>>>

export interface IAppState {
  userProfile: UserProfile,
}

// defaultState
const initialState = {
  userProfile: {},
};

export default function (state: IAppState = initialState, action: IAction) {
  switch (action.type) {
    case UPDATE_USER :
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
}