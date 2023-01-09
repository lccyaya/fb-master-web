import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';
import type { MatchRankingType } from '@/services/match';




export type CompetitionCategoryProps = {
  id: string;
  name: string
}
export type CompetitionsCategoryItemProps = {
  name: string;
  competitions: CompetitionCategoryProps[];
}

export type CompetitionsCategoryItemType = {

  categories: CompetitionsCategoryItemProps[]
}
export type CompetitionCategoryType = {
  categories: CompetitionCategoryProps[];
}
export type CategorysParams = {
  id: string
}

// export async function category() {
//   const result = await request('/api/competition/category');
//   return normalizeResponse<CompetitionCategoryType>(result);
// }
// 一级导航
export async function category() {
  const result = await request('/api/competition/category/list');
  return normalizeResponse<CompetitionCategoryType>(result);
}
// 二级导航/三级导航
export async function categorys(params: CategorysParams) {
  const result = await request('/api/competition/categorys', { params });
  return normalizeResponse<CompetitionsCategoryItemType>(result);
}

export type FetchRankingParams = {
  competition_id: number;
  season_id?: number
}
export async function ranking(params: FetchRankingParams) {
  const result = await request('/api/competition/table', { params });
  return normalizeResponse<MatchRankingType>(result);
}

export type ClassifiedCompetitionItem = {
  id: number;
  name: string;
  logo: string;
}

export type ClassifiedCompetition = {
  name: string;
  competitions: ClassifiedCompetitionItem[];
}

export type ClassifiedCompetitionRes = {
  categories: ClassifiedCompetition[];
}

export async function classify() {
  const result = await request('/api/competition/filter');
  return normalizeResponse<ClassifiedCompetitionRes>(result);
}

// v2 联赛分类列表
export type FetchFilterParams = {
  tab?: string
}
export async function competitionFilter(params: FetchFilterParams) {
  const result = await request('/api/v2/competition/filter', { params });
  return normalizeResponse<any>(result);
}

export async function save(competition_ids: number[]) {
  const result = await request('/api/competition/filter/save', {
    method: 'POST',
    data: { competition_ids, }
  });
  return normalizeResponse<{}>(result);
}
