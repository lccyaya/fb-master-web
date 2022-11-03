import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';


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

export type WordCapParams = {
    page: number;
    size: number;
    worldcup?: boolean;
    type?: number;
    play?: number;
    tab?: number;
    world_cup?: number
}




export type eliminateList = {
    id: number
    home_score: number
    away_score: number
    winner_team_id: number
    home_country_logo: string
    away_country_logo: string
    state_id: number
    home_name: number
    away_name: number
    away_team_id: number
    home_team_id: number
    match_ids: any
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
    season_id: number

    competition_id: number
}

export type Datares = {

    // data?: any
    success: boolean
}



// 聚焦 分析
export async function AnalysisList(params: WordCapParams) {
    const result = await request('/api/news', { params });
    return normalizeResponse<{ news: News[]; total: number; }>(result);
}


// 世界杯免费攻略
export async function FreeSchemeList(params: WordCapParams) {
    const result = await request('/api/v5/expert/free-list', { params });
    return normalizeResponse<Datares>(result);
}

// 世界杯攻略
export async function HitSchemeList(params: WordCapParams) {
    const result = await request('/api/v5/expert/scheme-list', { params });
    return normalizeResponse<Datares>(result);
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
    const result = await request('/api/v5/match/bracket', { params });
    return normalizeResponse<Datares>(result);
}
// 排行榜进球
export async function PlayerGoalList(params: PlayerGoalListParams) {
    const result = await request('/api/competition/player-goal', { params });
    return normalizeResponse<Datares>(result);
}

// 竞猜