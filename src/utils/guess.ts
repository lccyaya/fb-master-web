import moment from 'moment';
type DatafilterParmas = {
  odd_scheme_id: number | null;
  onClickbtn: string | null;
  tag: string;
};
// 处理竞猜选中
export const guessSelect = (arr: any, data: DatafilterParmas) => {
  let { odd_scheme_id, tag } = data;

  arr.map((item: any) => {
    item.match.map((item_match: any) => {
      item_match.odds.map((item_odds: any) => {
        if (item_odds.odd_scheme_id == odd_scheme_id) {
          item_odds.odds.map((items_tag: any) => {
            if (items_tag.tag == tag) {
              items_tag.selected = true;
            } else {
              items_tag.selected = false;
            }
          });
        } else {
          item_odds.odds.map((items_tag: any) => {
            items_tag.selected = false;
          });
        }
      });
    });
  });

  return arr;
};

// 时间分组
type timeParmas = {
  match: {
    match_time: number;
    week: string;
  };
};
export const guessTimeMatch = (data: any) => {
  const time_Array: any = [];
  const end_Array: any = [];
  data.forEach((item: timeParmas) => {
    if (item.match.match_time) {
      item.match.week = guessTime(item.match.match_time);
      time_Array.push(guessTime(item.match.match_time));
    }
  });
  const newArr = [...new Set(time_Array)];
  newArr.forEach((item) => {
    const time_data = data.filter((res: timeParmas) => res.match.week === item);
    const obj = {
      match_time: item,
      match: time_data,
    };
    end_Array.push(obj);
  });
  end_Array.forEach((item) => {
    item.match.forEach((item_match) => {
      item_match.match.guessnum = Number(item_match.match.issue.slice(2));

      const first = item_match.odds.find((first) => {
        return first?.scheme_title == '0';
      });
      const two = item_match.odds.find((two) => {
        return two?.scheme_title !== '0';
      });

      if (first !== -1 && first !== undefined && two !== -1 && two !== undefined) {
        item_match.odds = [first, two];
      }
    });
    item.match.sort((a, b) => {
      return a.match.guessnum - b.match.guessnum;
    });
  });
  return end_Array;
};

// 竞猜时间转
export const guessTime = (time: any) => {
  let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  let guess_time = moment(new Date(Number(time) * 1000)).format(
    'YYYY.MM.DD' + week[moment(new Date(Number(time) * 1000)).format('d')],
  );
  return guess_time;
};

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

export namespace GoalTagsAll {
  export function goaltitleAll(tag: string) {
    switch (tag) {
      case OddTags.Home:
        return '让球主胜';
      case OddTags.Draw:
        return '让球平局';
      default:
        return '让球客胜';
    }
  }
}

export enum NumColor {
  Zero = '0',
  One = '1',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BgColor {
  export function numColor(type: string) {
    switch (type) {
      case NumColor.Zero:
        return '#F3F4F6';
      case NumColor.One:
        return '#F2E7EA';
      default:
        return '#E7F1ED';
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Color {
  export function numColor(type: string) {
    switch (type) {
      case NumColor.Zero:
        return '#45494C';
      case NumColor.One:
        return '#7E1132';
      default:
        return '#39906A';
    }
  }
}
