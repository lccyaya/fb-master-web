import Logo from '@/assets/logo/logo.png';
import LogoDark from '@/assets/logo/logo_dark.png';
import ChinaLogoDark from '@/assets/logo/logo_34_dark.png';
import LogoMin from '@/assets/logo/logo_min.png';
import ChinaLogo from '@/assets/logo/logo_34.png';
import ChinaLogoMin from '@/assets/logo/logo_min_34.png';
import { isForChina } from '@/utils/utils';
import Ico from '/public/favicon.ico';
import ChinaIco from '/public/favicon_34.ico';

export default isForChina()
  ? {
      logo: ChinaLogo,
      min_logo: ChinaLogoMin,
      logo_dark: ChinaLogoDark,
      title: '34 体育',
      keywords: '34 体育',
      desc: '34 体育',
      ico: ChinaIco,
      download_text: '34 体育',
    }
  : {
      logo: Logo,
      logo_dark: LogoDark,
      min_logo: LogoMin,
      title: '007 体育',
      keywords: '007 体育',
      desc: '007 体育',
      ico: Ico,
      download_text: '007sport',
    };
