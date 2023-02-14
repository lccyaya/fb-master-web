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
// import Substitution from '@/assets/icon/status_substitution.svg';
import Lhdown from '@/assets/match/state/lh_down_state.png';
import Substitution from '@/assets/match/state/lh_up_state.png';
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

import Winimg from "@/assets/match/state/win_state.png"
import Point from "@/assets/match/state/point_state.png"
import PK from "@/assets/match/state/pk_state.png"
import Pointwj from "@/assets/match/state/pointwj_state.png"
import Wl from "@/assets/match/state/wl_state.png"
import Zg from "@/assets/match/state/zg_state.png"
import Dz from "@/assets/match/state/dz_state.png"
import Hr from "@/assets/match/state/hr_state.png"

import Redp from "@/assets/match/state/redp_state.png"
import Yellowp from "@/assets/match/state/yellowp_state.png"

import Hhp from "@/assets/match/state/hhp_state.png"
import Qczj from "@/assets/match/state/qczj_state.png"
import Var from "@/assets/match/state/var_state.png"
import { login } from '@/services/certification';



export const state = [{
    id: 1,
    text: "进球",
    img: Winimg
},
{
    id: 8,
    text: "点球",
    img: Point
},
// {
//     id: 3,
//     text: "点球大战",
//     img: PK
// },
{
    id: 16,
    text: "点球未进",
    img: Pointwj
},
{
    id: 17,
    text: "乌龙球 ",
    img: Wl
},


{
    id: 18,
    text: "助攻",
    img: Zg
},
{
    id: 7,
    text: "队长",
    img: Dz
},
{
    id: 9,
    text: "换人",
    img: Hr
},
{
    id: 3,
    text: "黄牌",
    img: Yellowp
},
{
    id: 4,
    text: "红牌",
    img: Redp
},
{
    id: 15,
    text: "两黄一红",
    img: Hhp
},
{
    id: 5,
    text: "全场最佳",
    img: Qczj
},
{
    id: 28,
    text: "VAR",
    img: Var
},
]

// 状态
export function State(type: number, isUp?: number) {
    const data = state.filter((item) => {
        if (type == item.id) {
            return item
        }
    })
    return isUp == 1 ? Substitution : isUp == 2 ? Lhdown : data[0]?.img
}

