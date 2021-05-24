import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card, Tag, Modal } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import moment from 'moment';
import { API } from '../../../config/requestConfig';


class DeliverHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  onFinishBtnClick = (item) => {
    Modal.confirm({
      centered: true,
      content: '确定更改为完成状态？',
      onOk: async () => {
        await this.props.dispatch({ type: 'deliverSideModel/setDeliverFinished', payload: {transaction_md5: item.transaction_md5 } });
        await this.props.dispatch({type: 'commonModel/getUserBalance'});
        await this.props.dispatch({type: 'deliverSideModel/getMyDeliverTaskNumber'});
        await this.props.dispatch({type: 'deliverSideModel/getMyDeliverTask'});
      },
    })
  };


  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.props.dispatch({type: 'loginModel/getLoginStatus'});
    await this.props.dispatch({type: 'commonModel/getUserBalance'});
    await this.props.dispatch({type: 'deliverSideModel/getMyDeliverTaskNumber'});
    await this.props.dispatch({type: 'deliverSideModel/getMyDeliverTask'});
    await this.props.dispatch({type: 'deliverSideModel/getMyAllDeliverTask'});
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    return (
      <div>
        <PageHeader title="配送员中心"
                    subTitle="配送员可管理自己的信息"
        />
        <Divider orientation='left' style={{fontWeight: 'bold'}}>我的信息</Divider>
        <div className={style.row_flex}>
          <Statistic className={style.statistic_board} title="当前余额：" value={Number(this.props.userBalance)} precision={2} prefix={'￥'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="全部任务数：" value={Number(this.props.myDeliverTaskNumber?.totalCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="待配送任务数：" value={Number(this.props.myDeliverTaskNumber?.dispatchingCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="已配送任务数：" value={Number(this.props.myDeliverTaskNumber?.finishedCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="上次登陆时间：" value={moment(this.props.last_login).format('YYYY-MM-DD HH:mm:ss')} />
        </div>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>当前任务：{Number(this.props.myDeliverTaskNumber?.dispatchingCount)}个</Divider>
        <div className={style.good_card_row_flex}>
          {
            this.props.myCurrentDeliverTask.map((item, index) => {
              return <div className={style.good_card}>
                <Card style={{ width: 300 }}
                      key={index}
                      title={`配送任务${index + 1}`}
                      extra={<Button onClick={this.onFinishBtnClick.bind(this, item)} type={'primary'}>完成配送</Button>}
                      cover={
                        <img
                          alt={item.machine_name}
                          src={`${API}/static/nongji_${item.machine_id}.png`}
                          className={style.good_img}
                        />
                      }
                >
                  <Card.Meta
                    avatar={<Avatar size="large" className={style.avatar_wrapper}>{item.require_number}台</Avatar>}
                    title={<div className={style.price_text}>{item.offer_location} -> {item.user_location}<Tag className={style.tag_text}>配送中</Tag></div>}
                    description={<div>
                      <div>发货地：广西 {item.offer_location}</div>
                      <div>收货地：广西 {item.user_location}</div>
                      <div>配送数：{item.require_number}台</div>
                      <div>配送费：{item.dispatch_fee}元</div>
                    </div>}
                  />
                  <div className={style.good_name}>商品名：{item.machine_name}</div>
                </Card>
              </div>
            })
          }
        </div>
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel, deliverSideModel }) {
  const { isLogin, username, user_role, last_login } = loginModel;
  const { userBalance } = commonModel;
  const { myDeliverTaskNumber, myCurrentDeliverTask, myAllDeliverTask } = deliverSideModel;
  return { isLogin, username, user_role, last_login, userBalance, myDeliverTaskNumber, myCurrentDeliverTask, myAllDeliverTask };
}

export default connect(mapStateToProps)(DeliverHome);
