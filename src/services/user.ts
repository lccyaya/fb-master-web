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
  coin: number;
  coupon: number;
  favorite: number;
  subMatchNum: number;
  followExpertNum: number;
  phone: string;
  user_info: {
    is_real: string;
    name: string;
  }
  expert: {
    id: string;
    avatar: string;
    nickname: string;
    status: string;
  };
}

export async function queryCurrent() {
  const result = await request('/api/v5/user-infos');
  return normalizeResponse<UserInfoType>(result);
}

export async function uploadPic(key: string) {
  const result = await request('/api/v1/pre-sign-url', { params: { key } });
  return normalizeResponse<string>(result);
}

// 实名认证
export interface NameAuthProps {
  name: string;
  idCard: string;
}

export async function nameAuth(data: NameAuthProps) {
  const result = await request('/api/name-auth', {
    method: 'post',
    data
  });
  return normalizeResponse<any>(result);
}
