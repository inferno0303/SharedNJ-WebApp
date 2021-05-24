import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card, Tag, Modal } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import moment from 'moment';
import { API } from '../../../config/requestConfig';
import UserTable from './userTable';


class adminHome extends React.Component {
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
    await this.props.dispatch({type: 'adminModel/getTransactionTotalCount'});
    await this.props.dispatch({type: 'adminModel/getProductTotalCount'});
    await this.props.dispatch({type: 'adminModel/getTransactionPriceSum'});
    await this.props.dispatch({type: 'adminModel/getUserCount'});
    await this.props.dispatch({type: 'adminModel/getOfferCount'});
    await this.props.dispatch({type: 'adminModel/getDeliverCount'});
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    return (
      <div>
        <PageHeader title="管理员中心"
                    subTitle="管理员可视化查看和管理平台信息"
        />
        <Divider orientation='left' style={{fontWeight: 'bold'}}>平台信息</Divider>
        <div className={style.row_flex}>
          <Statistic className={style.statistic_board} title="全部订单数：" value={Number(this.props.transactionTotalCount)} suffix={'笔'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="订单总额：" value={Number(this.props.transactionPriceSum)} precision={2} prefix={'￥'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="全部商品数：" value={Number(this.props.productTotalCount)} suffix={'个'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="用户数：" value={Number(this.props.userCount)} suffix={'个'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="商家数：" value={Number(this.props.offerCount)} suffix={'个'} />
          <Divider type="vertical" />
          <Statistic className={style.statistic_board} title="配送员数：" value={Number(this.props.deliverCount)} suffix={'个'} />
        </div>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>当前系统所有用户：{Number(this.props.userCount + this.props.offerCount + this.props.deliverCount)}个</Divider>
        <UserTable dataSource={this.props.userTable}
                   dispatch={this.props.dispatch}
        />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, adminModel  }) {
  const { isLogin, username, user_role, last_login } = loginModel;
  const { transactionTotalCount, productTotalCount, transactionPriceSum, userCount, offerCount, deliverCount, userTable } = adminModel;
  return { isLogin, username, user_role, last_login, transactionTotalCount, productTotalCount, transactionPriceSum, userCount, offerCount, deliverCount, userTable };
}

export default connect(mapStateToProps)(adminHome);
