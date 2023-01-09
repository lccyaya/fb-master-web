import { FinalScore } from '@/services/match';
import * as matchService from '@/services/matchPage';
import { matchType } from '@/services/matchPage';

export enum MatchStatus {
  Before = 'Before',
  Going = 'Going',
  Complete = 'Complete',
  TBD = 'TBD',
}

/**
 * 0 比赛异常，说明：暂未判断具体原因的异常比赛，可能但不限于：腰斩、取消等等，建议隐藏处理
1 未开赛
2 上半场
3 中场
4 下半场
5 加时赛
6 加时赛(弃用)
7 点球决战
8 完场
9 推迟
10 中断
11 腰斩
12 取消
13 待定
 */
export const getMatchStatus = (code: number): MatchStatus => {
  if (code === 1) {
    return MatchStatus.Before;
  } else if (code > 1 && code <= 7) {
    return MatchStatus.Going;
  } else if (code === 8) {
    return MatchStatus.Complete;
  } else {
    return MatchStatus.TBD;
  }
};

export const getMatchStatusDes = (code: number): String => {
  if (code === 0) {
    return "异常";
  } else if (code === 1) {
    return "未开赛";
  } else if (code === 2) {
    return "上半场";
  } else if (code === 3) {
    return "中场";
  } else if (code === 4) {
    return "下半场";
  } else if (code === 5) {
    return "加时赛";
  } else if (code === 7) {
    return "点球决战";
  } else if (code === 8) {
    return "完场";
  } else if (code === 9) {
    return "推迟";
  } else if (code === 10) {
    return "中断";
  } else if (code === 11) {
    return "腰斩";
  } else if (code === 12) {
    return "取消";
  } else if (code === 13) {
    return "待定";
  } else {
    return "异常";
  }
}

// 分析天气
export function Weather(state: number): { text: string, img: string } {
  switch (state) {
    case 1:
      return { text: '有云', img: "cloud" }
    case 2:
    case 10:
      return { text: '多云', img: "cloud" }
    case 3:
    case 12:
      return { text: '有云/雨', img: "rain" }
    case 4:
      return { text: '雪', img: "snow" }
    case 5:
      return { text: '晴', img: "shine" }
    case 6:
    case 9:
      return { text: '阴有雨', img: "rain" }
    case 7:
      return { text: '阴', img: "overcast" }
    case 8:
      return { text: '薄雾', img: "fog" }
    case 11:
      return { text: '云有雨', img: "rain" }
    default:
      return { text: '雾', img: "fog" }

  }
}

// 联赛排名
export function MatchRanking(state: string): string {
  switch (state) {
    case "all":
      return "全部"
    case "home":
      return "主场"
    case "away":
      return "客场"
    default:
      return "近期"

  }
}

export const getScore = (scores: number[]) => {
  if (scores && scores.length >= 7) {
    // 0:"比分(常规时间) - int" 1:"半场比分 - int" 2:"红牌 - int" 3:"黄牌 - int" 4:"角球，-1表示没有角球数据 - int" 5:"加时比分(120分钟，即包括常规时间比分)，加时赛才有 - int" 6:"点球大战比分(不包含常规时间及加时赛比分)，点球大战才有 - int"
    // 5 加时比分(120分钟，即包括常规时间比分)，加时赛才有. 小于等于0的时候取 比分(常规时间)
    if (scores[5] > 0) {
      return scores[5]
    } else {
      return scores[0]
    }

  } else {
    return 0;
  }
};

// 最终比分：常规赛 + 加时赛 + 点球大战
export const getFinalScore = (score: FinalScore) => {
  let { home, away } = score;
  if (score.has_ot) {
    home += score.ot_home || 0;
    away += score.ot_away || 0;
  }
  if (score.has_penalty) {
    home += score.penalty_home || 0;
    away += score.penalty_away || 0;
  }
  return { home, away };
};

// 获取给定日期至少前后3天的比赛，可能包含这3天以后的数据
export const getAtLeastThreeDayMatch = async (params: {
  secondDayTimestamp: number;
  zone: number;
  tab_type: 1 | 2 | 3;
  tab_competition_ids?: number[];
}) => {
  const { secondDayTimestamp, zone, tab_competition_ids, tab_type } = params;
  const secondDayTimestampSeconds = secondDayTimestamp / 1000;
  const firstDayTimestampSeconds = secondDayTimestampSeconds - 86400;
  const thirdDayTimestampSeconds = secondDayTimestampSeconds + 86400;

  const data: matchType[] = [];
  let timestamp = firstDayTimestampSeconds;
  while (timestamp <= thirdDayTimestampSeconds) {
    // 查询传入日期昨天和当天的比赛，当第一天的比赛大于50场的时候，不会返回第二天的比赛
    // eslint-disable-next-line no-await-in-loop
    const res = await matchService.newFetchMatchList({
      timestamp,
      zone,
      init: 0,
      is_pre: false,
      keywords: '',
      tab_type,
      tab_competition_ids,
    });
    if (res.success) {
      data.push(...res.data.matches);
      timestamp = Number(res.data.next_time);

      if (!res.data.has_next) {
        break;
      }
    } else {
      break;
    }
  }

  return data;
};


// 获取tab列表
export const getMatchesTabs = async () => {
  const res = await matchService.getMatchesTabs();
  return res.data;
};

// 获取比赛列表
export const getMatchListV3 = async (params: {
  page: number;
  size: number;
  zone: number;
  tab_type: number;
  competition_ids?: number[];
}) => {
  const res = await matchService.MatchListV3(params);
  return res.data;
};
export enum NumColor {
  win = 'win',
  winname = "赢",
  goname = "走",
  lostname = "输",
  big = "大",
  small = "小",
  draw = 'draw',
  lost = 'lost',
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Color {
  export function numColor(type: string) {
    switch (type) {

      case NumColor.winname:
      case NumColor.win:
      case NumColor.big:
        return '#FA5900';
      case NumColor.goname:
      case NumColor.draw:
        return '#4064B2';
      case NumColor.lost:
      case NumColor.lostname:
      case NumColor.small:
        return '#39906A';
      default:
        return '#848494';
    }
  }
}
// 弹窗值筛选
export const getAccordWithLabel = (array, value) => {

  let newArray;
  array.map(data => {
    const list = data.filter(item => {
      return item.value === value;
    });
    if (list.length) {
      newArray = list[0]
    }
  });
  return newArray?.label;


};

// 资料库导航
export function getnavList(arr: any, name: string) {
  let list: any = null
  arr.map((item) => {

    if (item.name == name) {
      list = item.competitions

    }
  })
  return list
}

// 资料库赛程积分弹框列表
export function getPickerList(arr: any) {

  const list = arr.map((item) => {
    const children = []
    for (let i = 1; i <= item.round_count; i++) {
      children.push({ value: i, label: `第${i}轮`, })
    }
    return { value: item.stage, label: item.stage_name, children, }
  })
  return list
}

// 资料库赛程下一轮筛选
export function getNextList(arr: any, arr_value: any) {
  let res;
  let ind;

  const a = arr.filter((item, index) => {
    if (item.value === arr_value[0]) {
      ind = index;
    }
    return item.value === arr_value[0];
  });
  if (a[0].children.length) {
    if (a[0].children.length === arr_value[1]) {
      if (arr[ind + 1]) {
        // 到底了
        if (arr[ind + 1].children.length) {
          // 子的第一个
          res = [arr[ind + 1].value, arr[ind + 1].children[0].value];
        } else {
          // 父级
          res = [arr[ind + 1].value, null];
        }
      } else {
        res = arr_value;
      }
    } else {
      // 当前的下一个
      res = [arr_value[0], arr_value[1] + 1];
    }
  } else {
    if (arr[ind + 1]) {
      if (arr[ind + 1].children.length) {
        // 子的第一个
        res = [arr[ind + 1].value, arr[ind + 1].children[0].value];
      } else {
        // 父级
        res = [arr[ind + 1].value, null];
      }
    } else {
      res = arr_value;
    }
  }
  return res;
}
// 资料库赛程上一轮筛选
export function getUpList(arr: any, arr_value: any) {
  let res;
  let ind;
  const a = arr.filter((item, index) => {
    if (item.value === arr_value[0]) {
      ind = index;
    }
    return item.value === arr_value[0];
  });
  if (a[0].children.length) {
    if (arr_value[1] == 1) {
      if (arr[ind - 1]) {
        // 到底了
        if (arr[ind - 1].children.length) {
          // 子的第一个
          res = [arr[ind - 1].value, arr[ind - 1].children[arr[ind - 1].children.length - 1].value];
        } else {
          // 父级
          res = [arr[ind - 1].value, null];
        }
      } else {
        res = arr_value;
      }
    } else {
      // 当前的下一个
      res = [arr_value[0], arr_value[1] - 1];
    }
  } else {
    if (arr[ind - 1]) {
      if (arr[ind - 1].children.length) {
        // 子的第一个
        res = [arr[ind - 1].value, arr[ind - 1].children[arr[ind - 1].children.length - 1].value];
      } else {
        // 父级
        res = [arr[ind - 1].value, null];
      }
    } else {
      res = arr_value;
    }
  }
  return res;
}
// 是否为最后一轮
export const getLast = (arr, res) => {

  let boolen;
  const lastarr = arr[arr.length - 1];

  if (lastarr.children.length) {

    boolen = lastarr.children[lastarr.children.length - 1].value === res[1];
  } else {
    boolen = lastarr.value === res[0];
  }
  return boolen;
};
// 是否为第一轮
export const getFirst = (arr, res) => {

  let boolen;
  const firstarr = arr[0];
  if (firstarr.children.length) {
    boolen = firstarr.children[0].value === res[1];
  } else {

    boolen = firstarr.value === res[0];
  }
  return boolen;
};

// 赛程筛选label的值
export const getlabel = (arr, res) => {

  let data = arr.filter((item) => {
    return res?.includes(item.value)
  })
  let num = null
  if (data[0]?.children.length) {
    data[0].children.map((items) => {
      if (items.value == res[1]) {
        num = items?.label
      }
    })
  } else {
    num = ""
  }
  return data[0]?.label + num
};


// 赛程筛选最后一场比赛的位置
export const geMatchLastList = (arr) => {
  for (let index = 0; index < arr.length; index++) {
    for (let j = 0; j < arr[index].rounds.length; j++) {
      const str = arr[index].rounds[j]?.match_list.findIndex((b) => {
        return b.StatusID < 2
      })
      if (str !== -1) {
        return arr[index].rounds[j]?.match_list[str]?.MatchId

      }
    }
  }
  const last = arr[arr.length - 1].rounds
  const last_match = last[last.length - 1]?.match_list
  return last_match[last_match.length - 1]?.MatchId

};










