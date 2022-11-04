export const isServer = typeof window === 'undefined';

export function isPro() {
  const host = (window.location.host).toLowerCase();
  const domains = ['007sport.app', '007sports.app', 'k3.com', 'livesoccertv.app', '007.soccer', '007live.co', '007.football'];
  return domains.some((d) => host.endsWith(d));
}

export function isTest() {
  return !isPro();
}

export function getAPIHost() {
  // return '//10.149.62.60:8080';
  // return 'http://47.93.46.29:8080'; // 测试地址
  // return 'http://47.94.89.58:8080'; // 正式地址
  return 'https://api.34sport.cn'; // 正式地址
  // return '//api.34.com';
}

export function getFeedbackAPIHost() {
  return 'https://feedback.34sport.cn';
}

export function getLangAPIHost() {
  return '//language.34.com';
}

