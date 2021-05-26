import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import MainTable from './mainTable';
import moment from 'moment';
import OfferTransactionRecord from './offerTransactionRecord';


class OfferHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.props.dispatch({type: 'loginModel/getLoginStatus'});
    await this.props.dispatch({type: 'commonModel/getUserBalance'});
    await this.props.dispatch({type: 'offerSideModel/getOfferTransactionTypeNumber'});
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {
    return (
      <div>
        <PageHeader title="商家信息"
                    subTitle="商家可管理自己的信息"
        />

        <Divider orientation='left' style={{fontWeight: 'bold'}}>尊敬的{this.props.username}用户，您的商家信息如下：</Divider>
        <div className={style.row_flex}>
          <Statistic className={style.statistic_board} title="我的财富：" value={Number(this.props.userBalance)} precision={2} prefix={'￥'} valueStyle={{color: 'green', fontWeight: 'bold'}} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="未处理订单数：" value={Number(this.props.offerTransactionTypeNumber?.unHandleCount)} precision={0} suffix={'笔'} valueStyle={{color: 'blue'}} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="正配送订单数：" value={Number(this.props.offerTransactionTypeNumber?.dispatchingCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="已完成订单数：" value={Number(this.props.offerTransactionTypeNumber?.finishedCount)} precision={0} suffix={'笔'} valueStyle={{color: 'green'}} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="已取消订单数：" value={Number(this.props.offerTransactionTypeNumber?.canceledCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="上次登陆时间：" value={moment(this.props.last_login).format('YYYY-MM-DD HH:mm:ss')} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="密码强度：" value='安全' />
        </div>

        <Divider orientation='left' style={{fontWeight: 'bold'}}>我收到的订单信息</Divider>
        <OfferTransactionRecord dataSource={this.props.offerTransactionRecord}
                                offerTransactionTypeNumber={this.props.offerTransactionTypeNumber}
                                dispatch={this.props.dispatch}
        />

        <Divider orientation='left' style={{fontWeight: 'bold'}}>我发布的农机出租信息</Divider>
        <MainTable dataSource={this.props.myProductList}
                   dispatch={this.props.dispatch}
        />

      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel, offerSideModel }) {
  const { isLogin, username, user_role, last_login } = loginModel;
  const { myDemand, userBalance } = commonModel;
  const { myProductList, offerTransactionTypeNumber, offerTransactionRecord } = offerSideModel;
  return { isLogin, username, user_role, last_login, myDemand, userBalance, myProductList, offerTransactionTypeNumber, offerTransactionRecord };
}

export default connect(mapStateToProps)(OfferHome);
