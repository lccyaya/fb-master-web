import type { Effect, Reducer } from 'umi';
import { GuessUserDetail, guessUserDetailList } from '@/services/worldcup';

export type GuessUserState = {
    guessUserState: guessUserDetailList | undefined;
};

export type ABTestModelType = {
    namespace: 'guessUser';
    state: GuessUserState;
    effects: {
        guessUser: Effect;
    };
    reducers: {
        setGuessUser: Reducer<GuessUserState>;
    };
};

const GuessUserModel: ABTestModelType = {
    namespace: 'guessUser',
    state: {
        guessUserState: undefined,
    },
    effects: {
        * guessUser({ payload }, { call, put }) {
            console.log("ssssssss");

            const res = yield call(GuessUserDetail);
            yield put({
                type: 'setGuessUser',
                payload: res.success ? res.data : null,
            });
        }
    },
    reducers: {
        setGuessUser(state, action) {
            return {
                ...state,
                guessUserState: action.payload,
            };
        }
    },
};

export default GuessUserModel;
