import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';


// export async function getMajorData() {
//   const result = await request('/api/match/major', {
//     method: 'GET',
//   });
//   return normalizeResponse<majorMatch>(result);
// }

export type News = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    source: number;
    source_id: string;
    source_published_at: string;
    source_lang: string;
    title: string;
    description: string;
    cover_img_url: string;
    content: string;
    is_deleted: boolean;
    source_link: string;
    support: number;
    un_support: number;
    is_top: boolean;
    visit: number;
    is_favorite: boolean;
    detail_url: string;
    comment_count: number;
}

export type AnalysisListParams = {
    page: number;
    size: number;
    worldcup: boolean;
    type: number
}

export type FreeSchemeListData = {
    // title: string;
    // avatar: string;
    // nickname: string;
    // published_at: string;
    // content: string | any
}
export type WorldCapSchemeListData = {
    // title: string;
    // avatar: string;
    // nickname: string;
    // published_at: string;
    // content: string | any
}
export type listprops = {
    MatchId: number
    MatchTime: number
    StatusID: number
    AwayScores: any
    HomeScores: any
    HomeTeam: {
        name: string
        logo: string
    }
    AwayTeam: {
        name: string
        logo: string
    }
}
export type GroupListParams = {
    competition_id: number
    season_id: number
}
export type GroupListres = {
    groupName: string;
    match: listprops[],
    // list: any
}
// 积分榜
export type scoresListprops = {
    team_id: number
    all: []
    groups: number
}
export type ScoresListParams = {
    competition_id: number
    season_id: number
}
export type BracketListParams = {
    // competition_id: number
    season_id: number
}
export type PlayerGoalListParams = {
    // competition_id: number
    season_id: number

    competition_id: number
}

export type Datares = {

    data?: any
    success: boolean
}


// 聚焦
// export async function AnalysisList(params: AnalysisListParams) {
//     const result = await request('/api/news', { params });
//     return normalizeResponse<{ news: News[]; total: number; }>(result);
// }

// 聚焦 分析
export async function AnalysisList(params: AnalysisListParams) {
    const result = await request('/api/news', { params });
    return normalizeResponse<{ news: News[]; total: number; }>(result);
}


// 世界杯免费攻略
export async function FreeSchemeList(params: AnalysisListParams) {
    const result = await request('/api/v5/expert/free-list', { params });
    return normalizeResponse<FreeSchemeListData>(result);
}

// 世界杯攻略
export async function HitSchemeList(params: AnalysisListParams) {
    const result = await request('/api/v5/expert/scheme-list', { params });
    return normalizeResponse<WorldCapSchemeListData>(result);
}
// 小组赛
export async function GroupList(params: GroupListParams) {
    const result = await request('/api/v5/match/steams', { params });
    return normalizeResponse<Datares>(result);
}
// 积分榜
export async function ScoresList(params: ScoresListParams) {
    const result = await request('/api/v5/match/scores', { params });
    return normalizeResponse<Datares>(result);
}
// 淘汰赛
export async function BracketList(params: BracketListParams) {
    const result = await request('/api/v5/matchbracket', { params });
    return normalizeResponse<Datares>(result);
}
// 排行榜进球
export async function PlayerGoalList(params: PlayerGoalListParams) {
    const result = await request('/api/competition/player-goal', { params });
    return normalizeResponse<Datares>(result);
}

// export async function informationDetail(id: number) {
//     const result = await request(`/api/news/detail?id=${id}`);
//     return normalizeResponse<InformationDetailData>(result);
// }