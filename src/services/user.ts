import request from '@/utils/request';
import { normalizeResponse } from '@/utils/tools';

type SocialItem = {
  name: string;
  bound: boolean;
}

export type UserInfoType = {
  email: string;
  nickname: string;
  avatar: string;
  google: SocialItem;
  line: SocialItem;
  facebook: SocialItem;
}

export async function queryCurrent() {
  const result = await request('/api/user-info');
  return normalizeResponse<UserInfoType>(result);
}
