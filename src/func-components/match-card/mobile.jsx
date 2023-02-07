import React, { useEffect, useState, memo } from 'react';
import { Text } from '@/base-components/mobile';
import moment from 'moment';
import Iconfont from '@/base-components/iconfont';
import { useIntl, history } from 'umi';
import { message } from 'antd';
import { getMatchStatus, MatchStatus, getScore, getMatchStatusDes } from '@/utils/match';
import Notification from '@/components/Notification';
import * as homeService from '@/services/home';
import { toShortLangCode } from '@/utils/utils';
import Tag from '@/base-components/tag/mobile';
import { locale } from '@/app';
import { normalizeFloat } from '@/utils/tools';
import EmptyLogo from '@/assets/emptyLogo.png';
import cls from 'classnames';
import { handleReport } from '@/utils/report';
import styles from './mobile.module.less';

const FontSize10 = ({ text, position = 'left' }) => {
  return (
    <div className={styles.font_size_10} style={{ transformOrigin: position }}>
      {text}
    </div>
  );
};

const SocreMaps = ({ home_incidents = [], away_incidents = [], matchStatusText, children }) => {
  if (
    !children &&
    !home_incidents?.length &&
    !away_incidents?.length &&
    matchStatusText.text !== '完场'
  ) {
    return null;
  }
  return (
    <div className={styles.score_map}>
      {away_incidents?.length || home_incidents?.length ? (
        <div className={styles.score_map_left}>
          {home_incidents.map((item, index) => {
            return (
              <div className={styles.score_map_item} key={index}>
                <div className={styles.score_map_item_before} />
                <div className={styles.score_map_left_name}>
                  <FontSize10 text={item.player_name + ' ' + item.time + '′'} />
                </div>
                <img src={item.event_pic_url} className={styles.score_map_left_logo} />
              </div>
            );
          })}
        </div>
      ) : null}
      <div className={styles.score_map_tags}>
        {/* {matchStatusText.text === '完场' && !children ? (
          <div className={styles.match_card_ft_tag}>
            <FontSize10 text={matchStatusText.text} position="center" />
          </div>
        ) : null} */}

        {children}
      </div>
      {away_incidents?.length || home_incidents?.length ? (
        <div className={styles.score_map_right}>
          {away_incidents.map((item, index) => {
            return (
              <div className={styles.score_map_item} key={index}>
                <div className={styles.score_map_item_before} />
                <img src={item.event_pic_url} className={styles.score_map_right_logo} />
                <div className={styles.score_map_right_name}>
                  <FontSize10 text={item.time + '′ ' + item.player_name} />
                </div>
              </div>
            );
          })}
        </div>

      ) : null}
    </div>
  );
};

// type 支持 score【比分模式】和 index[指数模式]
const Mobile = ({ jskey, data, type = 'score' }) => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    setSubscribed(data?.subscribed);
  }, [data]);
  let status = getMatchStatus(data.status);
  let statusDes = getMatchStatusDes(data.status);
  let matchStatusText = {
    text: '',
    color: '#999',
    headerColor: '#999',
  };
  if (status === MatchStatus.Complete) {
    // matchStatusText.text = 'FT';
    matchStatusText.text = statusDes;
    matchStatusText.color = '#999';
    matchStatusText.headerColor = '#999';
  } else if (status === MatchStatus.TBD) {
    matchStatusText.text = statusDes;
    matchStatusText.color = '#999';
    matchStatusText.headerColor = '#999';
  } else if ([MatchStatus.Before].includes(status)) {
    matchStatusText.text = intl.formatMessage({ id: 'key_to_play' });
    matchStatusText.color = '#999';
    matchStatusText.headerColor = '#999';
  } else if (status === MatchStatus.Going) {
    matchStatusText.text = data.minutes;
    matchStatusText.color = '#FA5900';
    matchStatusText.headerColor = '#FA5900';
  }
  const { asia, bs, eu } = data.odds;
  const isShowVS = status === MatchStatus.Before || status === MatchStatus.TBD;
  const isShowScore = status === MatchStatus.Going || status === MatchStatus.Complete;
  const homeScore = data.home_score[0]
  const awayScore = data.away_score[1]
  // 是否有集锦
  const hasHighlight = status === MatchStatus.Complete && data.has_highlight;
  // 是否有回放
  const hasPlayBack = status === MatchStatus.Complete && data?.playback_link;
  // 是否有方案
  const hasScheme = status === MatchStatus.Before && data?.schemes;
  // 是否有直播
  const hasLive = status === MatchStatus.Before && data?.has_live;
  // 直播正在进行中
  const hasDoingLive = status === MatchStatus.Going && data?.has_live;
  const final = data.final_scores;

  const handleSubscribe = async (data) => {
    setSubscribed(!subscribed);
    if (subscribed) {
      const result = await homeService.cancelSubscribe(data.match_id);
      if (result.success) {
        message.success(intl.formatMessage({ id: 'key_unsubscribed' }));
        setSubscribed(false);
      } else {
        setSubscribed(true);
      }
    } else {
      const result = await homeService.setSubscribe(data.match_id);

      if (result.success) {
        handleReport({ action: 'subscribe', tag: data.status + '' });
        setSubscribed(true);
        message.success(intl.formatMessage({ id: 'key_subscribed' }));
      } else {
        setSubscribed(false);
      }
    }
  };
  const AET_PEN_TEXT = [
    final.has_ot ? `加时: ${final.ot_home || 0}-${final.ot_away || 0}` : '',
    final.has_ot && final.has_penalty ? ' ' : '',
    final.has_penalty ? `点球: ${final.penalty_home || 0}-${final.penalty_away || 0}` : '',
  ].join('');
  if (type === 'score') {
    return (
      <div >
        <div
          className={styles.match_card_box}
          onClick={() => {
            const lang = toShortLangCode(locale.getLocale());
            handleReport({ action: 'match_enter', tag: data.status + '' });
            history.push(`/${lang}/details/${data.match_id}`);
          }}
        >

          <div className={styles.match_card_header}>
            <div className={styles.match_card_header_left}>
              <div style={{ display: "flex" }}>
                <Text
                  text={data.competition_name + ' ' + moment(data.match_time * 1000).format('HH:mm') +
                    " "
                  }
                  numbuerOfLines={1}
                  fontSize={12}
                  color={'#999999'}
                />
                <div style={{ width: 4 }}></div>
                {jskey == 2 && <Text
                  text={data.issue}
                  numbuerOfLines={1}
                  fontSize={12}
                  color={'#999999'}
                />}
                {jskey == 3 && <Text
                  text={data.issue2}

                  numbuerOfLines={1}
                  fontSize={12}
                  color={'#999999'}
                />}
              </div>

            </div>
            {/* {data.status !== 8 ? (
            <div className={styles.match_card_header_status}>
              <Text
                fontSize={12}
                color={matchStatusText.headerColor}
                text={matchStatusText.text}
                width={'auto'}
              />
            </div>
          ) : null} */}
            <div className={styles.match_card_header_status}>
              <Text
                fontSize={12}
                color={matchStatusText.headerColor}
                text={matchStatusText.text}
                width={'auto'}
              />
            </div>
            <div className={styles.match_card_header_right}>
              <Text
                numberOfLines={1}
                fontSize={12}
                text={AET_PEN_TEXT}
                width="auto"
                color={'#999999'}
              />

              <div>
                {hasPlayBack || hasHighlight || hasScheme || hasLive || hasDoingLive ? (
                  <>
                    {hasPlayBack ? (
                      <Tag
                        // icon="icon-shipin"
                        color="#E9616B"
                        text={intl.formatMessage({ id: 'key_playback', defaultMessage: 'key_playback' })}
                      />
                    ) : null}
                    {hasHighlight ? (
                      <Tag
                        // icon="icon-jijin1"
                        color="#40A04E"
                        text={intl.formatMessage({
                          id: 'key_highlight',
                          defaultMessage: 'key_highlight',
                        })}
                      />
                    ) : null}
                    {hasScheme ? (
                      <Tag
                        // icon="icon-fangan"
                        color="#FA5900"
                        text={
                          intl.formatMessage({ id: 'key_scheme', defaultMessage: 'key_scheme' }) +
                          data?.schemes
                        }
                      />
                    ) : null}
                    {hasLive ? (
                      <Tag
                        // icon="icon-shipin"
                        color="#E9616B"
                        text={intl.formatMessage({
                          id: 'key_live_video',
                          defaultMessage: 'key_live_video',
                        })}
                      />
                    ) : null}
                    {hasDoingLive ? (
                      <Tag
                        // icon="icon-zhibo"
                        color="#DA000B"
                        text={intl.formatMessage({ id: 'key_living', defaultMessage: 'key_living' })}
                      />
                    ) : null}
                  </>
                ) : null}
              </div>
              <div
                className={styles.macth_subscribe}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubscribe(data);
                  if (!data.subscribed) {
                    setNotificationVisible(true);
                  }
                }}
              >
                <Iconfont
                  color={subscribed ? '#FA5900' : '#999999'}
                  size={16}
                  type={subscribed ? 'icon-guanzhu' : 'icon-guanzhubiankuang'}
                />
              </div>
            </div>
          </div>
          <div className={styles.match_card_mid}>
            <div className={styles.match_home}>
              {data?.final_scores?.home_red_card ? (
                <div className={styles.match_red_card}>{data.final_scores.home_red_card}</div>
              ) : null}

              <div className={styles.match_home_name}>
                <Text text={data.home_team_name} fontSize={13} color={'#333'} />
              </div>
              <img src={data.home_team_logo || EmptyLogo} className={styles.match_home_logo} alt="" />
            </div>
            <div className={styles.match_vs}>
              {isShowVS ? (
                <Text
                  text={'VS'}
                  fontSize={20}
                  color={MatchStatus.TBD === status ? '#FA5900' : '#FA5900'}
                  width={'auto'}
                />
              ) : null}
              {isShowScore ? (
                <Text
                  text={`${homeScore} - ${awayScore}`}
                  fontSize={20}
                  color="#FA5900"
                  width={'auto'}
                />
              ) : null}
            </div>
            <div className={styles.match_away}>
              <img src={data.away_team_logo || EmptyLogo} className={styles.match_away_logo} alt="" />
              <div className={styles.match_away_name}>
                <Text text={data.away_team_name} fontSize={13} color={'#333'} />
              </div>
              {data?.final_scores?.away_red_card ? (
                <div className={styles.match_red_card}>{data.final_scores.away_red_card}</div>
              ) : null}
            </div>
          </div>
          {/* 攻略 */}
          <SocreMaps
            home_incidents={data.home_incidents}
            away_incidents={data.away_incidents}
            matchStatusText={matchStatusText}
          >

          </SocreMaps>
        </div>
      </div>
    );
  } else if (type === 'index') {
    return (
      <div
        className={styles.match_index_box}
        onClick={() => {
          const lang = toShortLangCode(locale.getLocale());
          handleReport({ action: 'match_enter', tag: data.status });
          history.push(`/${lang}/details/${data.match_id}`);
        }}
      >
        <div className={styles.match_index_header}>
          <div className={styles.match_index_header_left}>
            <div style={{ paddingLeft: 12 }}>
              <div style={{ display: "flex" }}>
                <Text
                  text={data.competition_name + ' ' + moment(data.match_time * 1000).format('HH:mm') +
                    " "
                  }
                  numbuerOfLines={1}
                  fontSize={12}
                  color={'#999999'}
                />
                {jskey == 2 && <Text
                  text={data.issue}
                  numbuerOfLines={1}
                  fontSize={12}
                  color={'#999999'}
                />}
                {jskey == 3 && <Text
                  text={data.issue2}

                  numbuerOfLines={1}
                  fontSize={12}
                  color={'#999999'}
                />}
              </div>
            </div>
          </div>
          <div className={styles.match_index_header_status}>
            <Text
              fontSize={12}
              color={matchStatusText.color}
              text={matchStatusText.text}
              width={'auto'}
            />
          </div>
          <div className={styles.match_index_header_right}>

            <div className={styles.match_index_header_tags}>
              {hasPlayBack ? (
                <Tag
                  type="index"
                  color="#E9616B"
                  text={intl.formatMessage({ id: 'key_playback', defaultMessage: 'key_playback' })}
                />
              ) : null}
              {hasHighlight ? (
                <Tag
                  type="index"
                  color="#40A04E"
                  text={intl.formatMessage({
                    id: 'key_highlight',
                    defaultMessage: 'key_highlight',
                  })}
                />
              ) : null}
              {hasScheme ? (
                <Tag
                  type="index"
                  color="#FA5900"
                  text={
                    intl.formatMessage({ id: 'key_scheme', defaultMessage: 'key_scheme' }) +
                    data?.schemes
                  }
                />
              ) : null}
              {hasLive ? (
                <Tag
                  type="index"
                  color="#E9616B"
                  text={intl.formatMessage({
                    id: 'key_live_video',
                    defaultMessage: 'key_live_video',
                  })}
                />
              ) : null}
              {hasDoingLive ? (
                <Tag
                  type="index"
                  icon="icon-zhibo"
                  color="#DA000B"
                  text={intl.formatMessage({ id: 'key_living', defaultMessage: 'key_living' })}
                />
              ) : null}
            </div>
            <div
              className={styles.match_index_subscribe}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubscribe(data);
                if (!data.subscribed) {
                  setNotificationVisible(true);
                }
              }}
            >
              <Iconfont
                color={subscribed ? '#FA5900' : '#999999'}
                size={16}
                type={subscribed ? 'icon-guanzhu' : 'icon-guanzhubiankuang'}
              />
            </div>
          </div>
        </div>
        <div className={styles.match_index_body}>
          <div className={styles.match_index_body_left}>
            <div className={styles.match_index_team}>
              <img
                className={styles.match_index_team_logo}
                src={data.home_team_logo || EmptyLogo}
              />
              <div className={styles.match_index_team_name}>
                <Text text={data.home_team_name} fontSize={13} color={'#333'} />
              </div>
              <div className={styles.match_index_team_score}>
                <Text
                  text={
                    [MatchStatus.Going, MatchStatus.Complete].includes(status) ? `${homeScore}` : ''
                  }
                  fontSize={20}
                  color="#FA5900"
                  width={'auto'}
                />
              </div>
            </div>
            <div className={styles.match_index_team}>
              <img
                className={styles.match_index_team_logo}
                src={data.away_team_logo || EmptyLogo}
              />
              <div className={styles.match_index_team_name}>
                <Text text={data.away_team_name} fontSize={13} color={'#333'} />
              </div>
              <div className={styles.match_index_team_score}>
                <Text
                  text={
                    [MatchStatus.Going, MatchStatus.Complete].includes(status) ? `${awayScore}` : ''
                  }
                  fontSize={20}
                  color="#FA5900"
                  width={'auto'}
                />
              </div>
            </div>
          </div>
          <div className={styles.match_index_body_right}>
            <div className={styles.match_index_row}>
              <div className={styles.match_index_col}>
                <div style={{ color: '#FA5900', width: 40, textAlign: "left" }}>
                  {eu ? `主 ${normalizeFloat(eu.home)}` : <div style={{ color: '#c9c6c9' }}>-</div>}
                </div>
              </div>
              <div className={styles.match_index_col}>
                <div style={{ color: '#FA5900' }}>
                  {asia ? (
                    `主 ${normalizeFloat(asia.home)}`
                  ) : (
                    <div style={{ color: '#c9c6c9' }}>-</div>
                  )}
                </div>
              </div>
              <div className={styles.match_index_col}>
                <div style={{ color: '#848494' }}>
                  {bs ? `主 ${normalizeFloat(bs.home)}` : <div style={{ color: '#c9c6c9' }}>-</div>}
                </div>
              </div>
            </div>
            <div className={styles.match_index_row}>
              <div className={styles.match_index_col}>
                <div style={{ color: '#848494', width: 40, textAlign: "left" }}>
                  {eu ? `平 ${normalizeFloat(eu.draw)}` : <div style={{ color: '#c9c6c9' }}>-</div>}
                </div>
              </div>
              <div className={styles.match_index_col}>
                <div style={{ color: '#AFAFC0' }}>
                  {asia?.draw ? (
                    asia.draw > 0 ? (
                      `+ ${normalizeFloat(asia.draw)}`
                    ) : (
                      `- ${normalizeFloat(Math.abs(asia.draw))}`
                    )
                  ) : (
                    <div style={{ color: '#c9c6c9' }}>-</div>
                  )}
                </div>
              </div>
              <div className={styles.match_index_col}>
                <div style={{ color: '#AFAFC0' }}>
                  {bs ? normalizeFloat(bs.draw) : <div style={{ color: '#c9c6c9' }}>-</div>}
                </div>
              </div>
            </div>
            <div className={styles.match_index_row}>
              <div className={styles.match_index_col}>
                <div style={{ color: '#39906A', width: 40, textAlign: "left" }}>
                  {eu ? `客 ${normalizeFloat(eu.away)}` : <div style={{ color: '#c9c6c9' }}>-</div>}
                </div>
              </div>
              <div className={styles.match_index_col}>
                <div style={{ color: '#39906A' }}>
                  {asia ? (
                    `客 ${normalizeFloat(asia.away)}`
                  ) : (
                    <div style={{ color: '#c9c6c9' }}>-</div>
                  )}
                </div>
              </div>
              <div className={styles.match_index_col}>
                <div style={{ color: '#848494' }}>
                  {bs ? `L ${normalizeFloat(bs.away)}` : <div style={{ color: '#c9c6c9' }}>-</div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Notification
          visible={notificationVisible}
          onCancel={() => setNotificationVisible(false)}
          onOk={() => setNotificationVisible(false)}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Mobile;
