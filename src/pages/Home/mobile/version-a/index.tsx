import TopRecommend from './top-recommend';
import MajorMatch from './major-match';
import DownloadTip from '@/pages/Home/mobile/components/download-tip';
import Highlight from './highlight';
import Ad from '../components/ad';
import HotNews from '@/pages/Home/mobile/version-a/hot-news';
import LeagueNews from '@/pages/Home/mobile/version-a/league-news';
import HotSchemes from './hot-schemes';

export default function MobileHomeA() {
  return (
    <div>
      <Ad />
      {/* <TopRecommend /> */}
      <MajorMatch />
      {/* <DownloadTip /> */}
      {/* <Highlight /> */}
      
      {/* <HotNews /> */}
      {/* <LeagueNews /> */}
      <HotSchemes />
    </div>
  );
}
