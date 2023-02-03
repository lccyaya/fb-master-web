
import Shizi from "@/assets/match/state/shizi_state.png"
import Redp from "@/assets/match/state/redp_state.png"
import Daid from "@/assets/match/state/daid_state.png"



// 球员位置 1受伤 2 停赛 0其他
export function injuredValue(type: number) {
    if (type == 1) {
        return Shizi
    } else if (type == 2) {
        return Redp
    } else {
        return Daid
    }
}



