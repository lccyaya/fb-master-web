import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';


// export async function getMajorData() {
//   const result = await request('/api/match/major', {
//     method: 'GET',
//   });
//   return normalizeResponse<majorMatch>(result);
// }

export type newsbanner = {
  id: number;
  img: string;
  landing_page: string;


}
export type InformationBanner = {
  list: newsbanner[];
}

export type InformationDetailData = {
  title: string;
  avatar: string;
  nickname: string;
  published_at: string;
  content: string | any
}

export async function getBanner() {
  const result = await request('/api/banners?position=news1');
  return normalizeResponse<InformationBanner>(result);
}


export async function informationDetail(id: number) {
  const result = await request(`/api/news/detail?id=${id}`);
  return normalizeResponse<InformationDetailData>(result);
}


