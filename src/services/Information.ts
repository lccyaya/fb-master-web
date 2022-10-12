import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';


// export async function getMajorData() {
//   const result = await request('/api/match/major', {
//     method: 'GET',
//   });
//   return normalizeResponse<majorMatch>(result);
// }

export type listData = {

}
export type information = {
  list: listData[];
}
export async function getBanner() {
  const result = await request('/api/banners?position=news');
  return normalizeResponse<information>(result);
}

