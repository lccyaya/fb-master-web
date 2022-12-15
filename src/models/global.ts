import type { Reducer, Effect } from 'umi';

import type { NoticeIconData } from '@/components/NoticeIcon';
import type { ConnectState } from './connect.d';

export type NoticeItem = {
  id: string;
  type: string;
  status: string;
} & NoticeIconData;

export type GlobalModelState = {
  collapsed: boolean;
  notices: NoticeItem[];
  homeactivekey: string;
};

export type GlobalModelType = {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
    setHomeActiveKey: Reducer<GlobalModelState>;
  };
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    homeactivekey: 'information',
  },

  effects: {
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: ConnectState) =>
        state.global.notices.map((item) => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state = { notices: [], collapsed: true, homeactivekey: 'information' }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state: any, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state: any, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter((item: any): boolean => item.type !== payload),
      };
    },
    setHomeActiveKey(state: any, action) {
      return {
        ...state,
        homeactivekey: action.payload,
      };
    }
  },
};

export default GlobalModel;
