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
  // return '//api.football-master.net';
  return '//api.34.com';
}

export function getFeedbackAPIHost() {
  // return '//feedback.football-master.net';
  return '//feedback.34.com';
}

export function getLangAPIHost() {
  // return '//language.football-master.net';
  return '//language.34.com';
}

export function getExternalAPIHost() {
  return '//api.football-master.net';
  // return '//language.34.com';
}

