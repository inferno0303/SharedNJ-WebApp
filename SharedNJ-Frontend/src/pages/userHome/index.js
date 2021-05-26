import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import MainTable from './mainTable';
import moment from 'moment';
import MyTransactionRecord from './myTransactionRecord';


class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  // handle
  debug = () => {
    console.log("this.props", this.props);
  };

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.props.dispatch({type: 'loginModel/getLoginStatus'});
    await this.props.dispatch({type: 'commonModel/getUserBalance'});
    await this.props.dispatch({type: 'commonModel/getTransactionRecordTypeNumber'});
    await this.setState({loading: false});
    await console.log(this.props.myTransactionRecord)
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {
    return (
      <div>
        <PageHeader title="用户中心"
                    subTitle="用户可管理自己的信息"
        />
        <Divider orientation='left' style={{fontWeight: 'bold'}}>我的信息</Divider>
        <div className={style.row_flex}>
          <Statistic className={style.statistic_board} title="当前余额：" value={Number(this.props.userBalance)} precision={2} prefix={'￥'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="全部订单数：" value={Number(this.props.myTransactionTypeNumber?.totalCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="待配送订单数：" value={Number(this.props.myTransactionTypeNumber?.unHandleCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="正配送订单数：" value={Number(this.props.myTransactionTypeNumber?.dispatchingCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="已完成订单数：" value={Number(this.props.myTransactionTypeNumber?.finishedCount)} precision={0} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="上次登陆时间：" value={moment(this.props.last_login).format('YYYY-MM-DD HH:mm:ss')} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="我发布的求租信息：" value={Number(this.props.myDemand?.length)} precision={0} suffix={'个'} />
        </div>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>我的订单：{this.props.myTransactionTypeNumber?.totalCount}笔</Divider>
        <MyTransactionRecord dataSource={this.props.myTransactionRecord}
                             myTransactionTypeNumber={this.props.myTransactionTypeNumber}
                             dispatch={this.props.dispatch}
        />
        <Divider orientation='left' style={{fontWeight: 'bold'}}>我发布的求租信息：{this.props.myDemand?.length}个</Divider>
        <MainTable dataSource={this.props.myDemand}
                   dispatch={this.props.dispatch}
        />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel }) {
  const { isLogin, username, user_role, last_login } = loginModel;
  const { myDemand, userBalance, myTransactionTypeNumber, myTransactionRecord } = commonModel;
  return { isLogin, username, user_role, last_login, myDemand, userBalance, myTransactionTypeNumber, myTransactionRecord };
}

export default connect(mapStateToProps)(UserHome);
