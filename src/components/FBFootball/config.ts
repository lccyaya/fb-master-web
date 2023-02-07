import { STATS_CODE } from '@/constants';
// 红牌
// import RedCard from '@/assets/icon/status_red.svg';
// 新icon的红牌
import RedCard from '@/assets/match/state/redp_state.png';

// 进球
// import Goal from '@/assets/icon/status_goal.svg';
// 新icon的进球
import Goal from '@/assets/match/state/win_state.png';

// 换人
import Substitution from '@/assets/icon/status_substitution.svg';
// 点球
// import PenaltyKick from '@/assets/icon/status_spot.svg';
// 新icon的点球
import PenaltyKick from '@/assets/match/state/pk_state.png';

// 乌龙
// import OwnGoal from '@/assets/icon/status_own.svg';
// 新icon的乌龙
import OwnGoal from '@/assets/match/state/wl_state.png';

// 黄牌
// import YellowCard from '@/assets/icon/status_yellow.svg';
// 新icon的黄牌
import YellowCard from '@/assets/match/state/yellowp_state.png';

// import Out from '@/assets/icon/status_out.svg';
// import StatusIcon from '../../StatusIcon';

// 球员位置 1受伤 2 停赛 0其他
export function State(type: number) {
    switch (type) {
        case STATS_CODE.RedCard:
            return RedCard
        case STATS_CODE.YellowCard:
            return YellowCard
        case STATS_CODE.Goal:
            return Goal
        case STATS_CODE.Substitution:
            return Substitution
        case STATS_CODE.PenaltyKick:
            return PenaltyKick
        case STATS_CODE.OwnGoal:
            return OwnGoal
        default:
            return null;
    }
}

