export enum OddTags {
  Home = 'home',
  Draw = 'draw',
  away = 'away',
}

export namespace OddTags {
  export function title(tag: string) {
    switch (tag) {
      case OddTags.Home:
        return '主胜';
      case OddTags.Draw:
        return '平局';
      default:
        return '客胜';
    }
  }
}
