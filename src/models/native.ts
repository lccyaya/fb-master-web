import type { Effect, Reducer } from 'umi';

export type NativeModelState = {
  isNative: boolean;
};

export type NativeModelType = {
  namespace: 'native';
  state: NativeModelState;
  effects: {
    // fetchVersion: Effect;
  };
  reducers: {
    setNative: Reducer<NativeModelState>;
  };
};

const NativeModel: NativeModelType = {
  namespace: 'native',
  state: {
    isNative: false,
  },
  effects: {
    
  },
  reducers: {
    setNative(state, action) {
      return {
        ...state,
        isNative: action.payload,
      };
    }
  },
};

export default NativeModel;
