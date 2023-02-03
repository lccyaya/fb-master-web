import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';
// import type { ReactNode } from 'react';

export type FutureListParams = {
    match_id: number;
};
export type futurematchType = {
    away_team_id: number
    away_team_name:
    string
    competition_id: number
    competition_name: string
    home_team_id: number
    home_team_name: string
    interval: number
    match_id: number
    match_time: number
};
export type FutureListRes = {
    name: string
    match: futurematchType[]
};

export type AnalysisListParams = {
    match_id: number
    tab: number,
    event: number | string | number,
    size: number,
    sameCompetition: number
};
export type matchType = {

    team_id: number
    home: string
    score: null
    team_name: string
};
export type analysisType = {
    // away_team_id: number
    // away_team_name: string
    // competition_id: number
    // competition_name: string
    // home_team_id: number
    // home_team_name: string
    // interval: number
    // match_id: number
    // match_time: number
    HomeScores?: any
    final_scores: any
    match_time: number
    team_name: string
    home: matchType
    away: matchType
    asia: {
        name: string
    }
};
export type spType = {
    drawn: number
    lost: number
    played: number
    recent: string
    won: number
    team_logo: string
    team_name: string
};


export type AnalysisListRes = {
    list: analysisType[]
    sp: spType

};

export type cupmatchListType = {
    label: string;
    against: number; // 丢球？？？
    position: number; // 排名位置
    pts: number; // 积分
    played: number; // 已完成场次
    won: number; // 胜场
    drawn: number; // 平
    lost: number; // 败场
    goals: number; // 进球
    away_goals: number; // 丢球
    match_state: number; // 未知
    diff: number; // 未知
    team_id: number; // 球队 ID
    team_name: string; // 球队名
    team_logo?: string; // 球队 log
};
export type cupmatchTypeList = {
    home: cupmatchListType[]
    away: cupmatchListType[]
};

export type CupmatchListRes = {
    list: cupmatchTypeList
    cup: cupmatchListType[]

};

export type GoalDistributionParams = {
    match_id: number
    tab: number
};
export type goalDistributionList = {
    dis: any
    lower: number
    name: string
    total: number
    up: number

};
export type GoalDistributionListRes = {
    home: goalDistributionList
    away: goalDistributionList
};

export type InjuryParams = {
    match_id: number
};
export type injuryArr = {
    id: number,
    name: string,
    position: string,
    logo: string,
    reason: string,
    missed_matches: number,
    start_time: number,
    end_time: number,
    type: number,
    market_value: number
};
export type injuryList = {
    team_name: string
    injury: injuryArr
};

export type InjuryListRes = {
    home: injuryList
    away: injuryList

};

export type OddsDetailsParams = {
    match_id: number


};
export type initList = {
    away: number
    closed: number
    draw: number
    home: number
    match_offset: string
    score: string
    state: number
    updated_at: number


};
export type oddsDetailsList = {
    hot: boolean
    id: number
    init: initList
    name: string
    spot: initList

};
export type OddsDetailsRes = {
    asia: oddsDetailsList[]
    bs: oddsDetailsList[]
    eu: oddsDetailsList[]
};
export type StatsDetailsParams = {
    match_id: number
    tab: number
    num: number

};
export type guardaList = {
    attack: string
    ballControlRate: string
    cornerBall: string
    dangerouAttack: string
    goalpPerGame: string
    orthophoto: string
    projectivdeviation: string
    ryCard: string
};
export type attackList = {
    coverBallControlRate: string
    coverGoalpPerGame: string
    coverOrthophoto: string
    coverProjectivdeviation: string

};
export type StatsDetailsRes = {
    attacka: attackList
    attackh: attackList
    guarda: guardaList
    guardh: guardaList

};


// 未来三场比赛
export async function futureList(params: FutureListParams) {
    const result = await request('/api/matches/future', { params });
    return normalizeResponse<FutureListRes[]>(result);
}


//近期交锋/历史对战
export async function analysisList(params: AnalysisListParams) {
    const result = await request('/api/matches/analysis', { params });
    return normalizeResponse<AnalysisListRes>(result);
}

//杯赛
export async function cupmatchList(params: AnalysisListParams) {
    const result = await request('/api/scores/list', { params });
    return normalizeResponse<CupmatchListRes>(result);
}

//实力对比
export async function goalDistribution(params: GoalDistributionParams) {
    const result = await request('/api/team/stats/goal_distribution', { params });
    return normalizeResponse<GoalDistributionListRes>(result);
}

//伤停对比
export async function injury(params: InjuryParams) {
    const result = await request('/api/team/stats/injury', { params });
    return normalizeResponse<InjuryListRes>(result);
}

//进球分布
export async function oddsDetails(params: OddsDetailsParams) {
    const result = await request('/api/match/odds/details', { params });
    return normalizeResponse<OddsDetailsRes>(result);
}

//攻防对比
export async function statsDetails(params: StatsDetailsParams) {
    const result = await request('/api/team/stats/details', { params });
    return normalizeResponse<StatsDetailsRes>(result);
}