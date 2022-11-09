import moment from 'moment';
type DatafilterParmas = {
  odd_scheme_id: number | null
  onClickbtn: string | null
  tag: string
}
// 处理竞猜选中
export const guessSelect = (arr: any, data: DatafilterParmas) => {
  let { odd_scheme_id, tag } = data

  arr.map((item: any) => {
    item.match.map((item_match: any) => {
      item_match.odds.map((item_odds: any) => {
        if (item_odds.odd_scheme_id == odd_scheme_id) {
          item_odds.odds.map((items_tag: any) => {
            if (items_tag.tag == tag) {
              items_tag.selected = true
            } else {
              items_tag.selected = false
            }
          })
        } else {
          item_odds.odds.map((items_tag: any) => {
            items_tag.selected = false
          })
        }

      })
    })
  })

  return arr
}




// 时间分组
type timeParmas = {
  match: {
    match_time: number
    week: string
  }

}
export const guessTimeMatch = (data: any) => {
  const time_Array: any = [];
  const end_Array: any = [];
  data.forEach((item: timeParmas) => {
    if (item.match.match_time) {
      item.match.week = guessTime(item.match.match_time)
      time_Array.push(guessTime(item.match.match_time));
    }
  });
  const newArr = [...new Set(time_Array)];
  newArr.forEach(item => {
    const time_data = data.filter((res: timeParmas) => res.match.week === item);
    const obj = {
      match_time: item,
      match: time_data,
    };
    end_Array.push(obj);
  });
  return end_Array;
};

// 竞猜时间转
export const guessTime = (time: any) => {
  let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  let guess_time = moment(new Date(Number(time) * 1000)).format(
    'YYYY.MM.DD' + week[moment(new Date(Number(time) * 1000)).format('d')],
  )
  return guess_time
}


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

export namespace GoalTags {
  export function goaltitle(tag: string) {
    switch (tag) {
      case OddTags.Home:
        return '让胜';
      case OddTags.Draw:
        return '让平';
      default:
        return '让负';
    }
  }
}

