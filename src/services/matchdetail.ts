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
    return normalizeResponse<AnalysisListRes>(result);
}