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
  return '//api.34.com';
}

export function getFeedbackAPIHost() {
  return '//feedback.34.com';
}

export function getLangAPIHost() {
  return '//language.34.com';
}

