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
};

export type WordCapParams = {
  page: number;
  size: number;
  worldcup?: boolean;
  type?: number;
  play?: number;
  tab?: number;
  world_cup?: number;
};

export type eliminateList = {
  id: number;
  home_score: number;
  away_score: number;
  winner_team_id: number;
  home_country_logo: string;
  away_country_logo: string;
  state_id: number;
  home_name: number;
  away_name: number;
  away_team_id: number;
  home_team_id: number;
  match_ids: any;
};
export type listprops = {
  MatchId: number;
  MatchTime: number;
  StatusID: number;
  AwayScores: any;
  HomeScores: any;
  HomeTeam: {
    name: string;
    logo: string;
  };
  AwayTeam: {
    name: string;
    logo: string;
  };
};
export type GroupListParams = {
  competition_id: number;
  season_id: number;
};
export type GroupListres = {
  groupName: string;
  match: listprops[];
  // list: any
};
// 积分榜
export type scoresListprops = {
  team_id: number;
  all: [];
  groups: number;
};
export type ScoresListParams = {
  competition_id: number;
  season_id: number;
};
export type BracketListParams = {
  // competition_id: number
  season_id: number;
};
export type PlayerGoalListParams = {
  season_id: number;

  competition_id: number;
};

export type Datares = {
  // data?: any
  success: boolean;
};

// 聚焦 分析
export async function AnalysisList(params: WordCapParams) {
  const result = await request('/api/news', { params });
  return normalizeResponse<{ news: News[]; total: number }>(result);
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

// 竞猜入口
export type GuessEntryParams = {
  id: number;
};
export type guessEntryList = {
  page: number;
  size: number;
  worldcup?: boolean;
  type?: number;
  play?: number;
  tab?: number;
  world_cup?: number;
};
export type GuessEntryRes = {
  data?: { list: guessEntryList };
  success: boolean;
};

// 竞猜排行
export type GuessRankingParams = {
  tab: number;
  page: number;
  size: number;
};
export type guessRankingList = {
  page: number;
  size: number;
  worldcup?: boolean;
  type?: number;
  play?: number;
  tab?: number;
  world_cup?: number;
};
export type GuessRankingRes = {
  data?: { list: guessUserDetailList };
  success: boolean;
};
// 竞猜用户详情
export type GuessUserDetailParams = {
  authtoken: string;
};
export type guessUserDetailList = {
  reward_rank: number;
  avatar: string;
  energy_num: number;
  energy_rank: number;
  nickname: string;
  numbers: number;
  reward_rate: string;
  cumulative: number;
};
export type GuessUserDetailRes = {
  data?: guessUserDetailList | any;
  success: boolean;
};

export type GuessSchemParams = {
  page: number;
  size: number;
};
export type guessSchemList = {
  id: number;
  published_at: number;
  home_team_name: string;
  away_team_name: string;
  award: number;
  energy_coin: number;
  goal: string | number;
  odd: string | number;
  result: string;
  recommend: string;
  status_id: number;
};
export type GuessSchemRes = {
  data?: { list: guessSchemList };
  success: boolean;
};

// 竞猜竞猜列表
export type GuessMatchListParams = {
  page: number;
  size: number;
};

export type guessMatch = {
  competition_id: number;
  competition_name: string;
  match_id: number;
  match_time: number;
  home_team_id: number;
  home_team_name: string;
  away_team_id: number;
  away_team_name: string;
  issue: string;
  energy_coin: number;
  tag: string;
  odd_scheme_id: string;
  odd: number;
  scheme_title: string;
  selected: boolean;
  title: string;
};
export type guessOddChind = {
  title: string;
  tag: string;
  odd: string;
  selected: string;
};
export type guessOdd = {
  odd_scheme_id: number;
  scheme_title: string;
  odds: guessOddChind[];
};
export type guessMatchList = {
  match: guessMatch[];
  match_time: string;
};
export type GuessMatchListRes = {
  data?: { list: guessMatchList[] } | any;

  success: boolean;
};
// 创建竞猜
export type AddGuessParams = {
  tag: string;
  odd_scheme_id: number;
  match_id: number;
  energy_coin: number;
  odd: string;
  published_at: number;
};

export type AddGuessRes = {
  data?: any;

  success: boolean;
};

// 是否显示精彩入口
export async function GuessEntry() {
  const result = await request('/api/v5/guess/task');
  return normalizeResponse<GuessEntryRes>(result);
}
// export async function GuessEntry(params: GuessEntryParams) {
//     const result = await request('/api/competition/player-goal', { params });
//     return normalizeResponse<GuessEntryRes>(result);
// }

// 用户详情
export async function GuessUserDetail() {
  // console.log(params);

  const result = await request('/api/v5/guess/detail', {
    // header: params,
  });
  return normalizeResponse<GuessUserDetailRes>(result);
}

// 我的竞猜
export async function MyGuess(params: GuessSchemParams) {
  const result = await request('/api/v5/guess/scheme-list', { params });
  return normalizeResponse<GuessSchemRes>(result);
}

// 竞猜中心列表
export async function GuessMatchList(params: GuessMatchListParams) {
  const result = await request('/api/v5/guess/match-list', { params });
  return normalizeResponse<GuessMatchListRes>(result);
}

// 竞猜排行榜
export async function GuessRank(params: GuessRankingParams) {
  const result = await request('/api/v5/guess/ranking-list', { params });
  return normalizeResponse<GuessRankingRes>(result);
}

// 创建竞猜列表
export async function AddGuess(data: AddGuessParams) {
  const result = await request('/api/v5/guess/add', { method: 'POST', data });
  return normalizeResponse<AddGuessRes>(result);
}
