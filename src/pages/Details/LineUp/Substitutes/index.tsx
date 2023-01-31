import React from 'react';
import { Grid } from 'antd-mobile';
import styles from './index.less';
type Props = {
    match: any
    data: any
};

const Substitutes = (props: Props) => {
    const { data, match } = props
    console.log(data, ";s;s;s;s;s;s;");

    return (
        <div className={styles.substitutes}>
            <div className={styles.substitutes_bench}>
                <Grid columns={2}>
                    <Grid.Item>
                        <div className={styles.first_left_grid}>
                            <div>
                                <img className={styles.home_coach_img} src={match.home_team_logo} alt="" />
                            </div>
                            {data.home_name}</div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles.first_right_grid}>
                            <div>
                                <img className={styles.away_coach_img} src={match.away_team_logo} alt="" />
                            </div>
                            {data.away_name}</div>
                    </Grid.Item>
                </Grid>
                <Grid columns={2}>
                    <Grid.Item>
                        <div className={styles.left_grid}>
                            <div>
                                <img className={styles.coach_img} src={data.home_coach?.logo} alt="" />
                            </div>
                            <div>

                                <div className={styles.name}>{data.home_coach?.name}</div>

                                <div className={styles.teacher}>教练</div>
                            </div>
                        </div>
                        <Grid columns={1}>
                            {data.home.map((item) => {
                                // eslint-disable-next-line react/jsx-key
                                return <div key={item.id}>
                                    {item.first == 0 ?
                                        <div >   <Grid.Item>
                                            <div className={styles.left_grid}>
                                                <div className={styles.logo}>
                                                    <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                                                </div>
                                                <div className={styles.text}>
                                                    <div className={styles.name}>{item?.name}</div>
                                                    <div className={styles.teacher}>教练</div>
                                                </div>
                                            </div>
                                        </Grid.Item></div>
                                        : null}
                                </div>


                            })}

                        </Grid>
                    </Grid.Item>

                    <Grid.Item>
                        <div className={styles.right_grid}>
                            <div>
                                <img className={styles.coach_img} src={data.away_coach?.logo} alt="" />
                            </div>
                            <div className={styles.text}>
                                <div className={styles.name}> {data.away_coach?.name}</div>

                                <div className={styles.teacher}>教练</div>
                            </div>
                        </div>
                        <Grid columns={1}>
                            {data.away.map((item) => {
                                // eslint-disable-next-line react/jsx-key
                                return <div key={item.id}>
                                    {item.first == 0 ?
                                        <div>   <Grid.Item>
                                            <div className={styles.left_grid}>
                                                <div className={styles.right_logo}>
                                                    <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                                                </div>
                                                <div className={styles.text}>
                                                    <div className={styles.name}>{item?.name}</div>
                                                    <div className={styles.teacher}>教练</div>
                                                </div>
                                            </div>
                                        </Grid.Item></div>
                                        : null}
                                </div>
                            })}

                        </Grid>
                    </Grid.Item>
                </Grid>
            </div>
            伤停
            <div className={styles.substitutes_bench}>
                <Grid columns={2}>
                    <Grid.Item>
                        <div className={styles.first_left_grid}>
                            <div>
                                <img className={styles.home_coach_img} src={match.home_team_logo} alt="" />
                            </div>
                            {data.home_name}</div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles.first_right_grid}>
                            <div>
                                <img className={styles.away_coach_img} src={match.away_team_logo} alt="" />
                            </div>
                            {data.away_name}</div>
                    </Grid.Item>
                </Grid>
                <Grid columns={2}>
                    <Grid.Item>

                        <Grid columns={1}>
                            {data.home_absence.map((item) => {
                                // eslint-disable-next-line react/jsx-key
                                return <div key={item.id}>
                                    <Grid.Item>
                                        <div className={styles.left_grid}>
                                            <div className={styles.logo}>
                                                <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                                            </div>
                                            <div className={styles.text}>
                                                <div className={styles.name}>{item?.name}</div>
                                                <div className={styles.teacher}>教练｜{item?.reason}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid.Item>

                                </div>


                            })}

                        </Grid>
                    </Grid.Item>

                    <Grid.Item>

                        <Grid columns={1}>
                            {data.away_absence.map((item) => {
                                // eslint-disable-next-line react/jsx-key
                                return <div key={item.id}>

                                    <div>   <Grid.Item>
                                        <div className={styles.left_grid}>
                                            <div className={styles.right_logo}>
                                                <div style={{ marginTop: 5 }}>{item.shirt_number}</div>
                                            </div>
                                            <div className={styles.text}>
                                                <div className={styles.name}>{item?.name}</div>
                                                <div className={styles.teacher}>教练｜{item?.reason}

                                                </div>
                                            </div>
                                        </div>
                                    </Grid.Item></div>

                                </div>
                            })}

                        </Grid>
                    </Grid.Item>
                </Grid>

            </div>
        </div>
    );
};

export default Substitutes;
