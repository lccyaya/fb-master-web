import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';

export async function mySchemeList(params: any) {
  const result = await request('/api/scheme/list', { params });
  return normalizeResponse<{}>(result);
}