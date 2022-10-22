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



export async function AnalysisList(params: AnalysisListParams) {
    const result = await request('/api/news', { params });
    return normalizeResponse<{ news: News[]; total: number; }>(result);
}


// export async function informationDetail(id: number) {
//     const result = await request(`/api/news/detail?id=${id}`);
//     return normalizeResponse<InformationDetailData>(result);
// }